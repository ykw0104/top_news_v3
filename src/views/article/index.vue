<template>
  <div class="article-container">
    <el-card class="filter-card">
      <template #header>
        <div>
          <!---------------------------- a. 面包屑路径导航 ------------------------------------>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <!-------------------------------- b. 数据筛选表单 ---------------------------------------->
      <el-form v-model="articlesQuery" label-width="70px" size="mini">
        <!-- b1.根据状态查询 -->
        <el-form-item label="状态">
          <el-radio-group v-model="articlesQuery.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- b2.根据频道查询 -->
        <el-form-item label="频道">
          <el-select v-model="articlesQuery.channelId" placeholder="请选择频道">
            <!-- TODO 设置null会报warning -->
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(channel, index) in articlesData.channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            />
          </el-select>
        </el-form-item>
        <!-- b3.根据日期查询 -->
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="articlesQuery.rangeDate"
            type="datetimerange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <!-- b4.执行查询 -->
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div>共筛选出 {{ articlesData.totalCount }} 条数据:</div>
      </template>

      <!----------------------------------------- c. 表格 -------------------------------------------->
      <el-table
        class="list-table"
        :data="articlesData.articles"
        :stripe="true"
        style="width: 100%"
        size="mini"
        v-loading="loading"
      >
        <!-- 第一列 -->
        <el-table-column label="封面">
          <template #default="scope">
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-image"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-image" src="./no-cover.jpeg" alt="" /> -->
            <el-image
              style="width: 80px; height: 60px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            >
              <template #placeholder>
                <div class="image-slot image-loading">
                  加载中<span class="dot">...</span>
                </div>
              </template>
              <template #error>
                <div class="image-slot">
                  <img class="article-image" src="./no-cover.jpeg" alt="" />
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <!-- 第二列 -->
        <el-table-column prop="title" label="标题"></el-table-column>
        <!-- 第三列 -->
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="danger"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="warning"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <!-- 第四列 -->
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <!-- 第五例 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="
                $router.push({ path: '/publish', query: { id: scope.row.id } })
              "
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!----------------------------------------- d. 分页 ------------------------------------------>
      <el-pagination
        layout="prev, pager, next"
        :total="articlesData.totalCount"
        :page-size="articlesQuery.pageSize"
        v-model:current-page="currentPage"
        :background="true"
        :disabled="loading"
        @current-change="onCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { ElMessageBox, ElMessage } from "element-plus";

import {
  getArticles,
  getArticlesChannels,
  deleteArticle,
} from "../../api/article";

export default defineComponent({
  name: "ArticleIndex",
  setup() {
    /********************************************************************************/
    // 请求文章的参数
    const articlesQuery = reactive({
      pageSize: 10, // 每页显示数量
      // 可选的请求参数不传时值都是null
      status: null, // 可选, 文章状态 null(全部),0, 1, 2, 3, 4
      channelId: null, // 可选, 频道ID
      rangeDate: null, // 可选, [开始时间, 结束时间]
    });

    // 保存文章请求的数据
    const articlesData = reactive({
      articles: [], // 获取文章对象的数组
      totalCount: 0, // 文章总数

      channels: [], // 文章频道
    });

    const currentPage = ref(1); //当前页码

    const loading = ref(false);
    /********************************************************************************/
    /* 请求文章的方法 */

    const loadArticles = (page = 1) => {
      loading.value = true;
      getArticles({
        page, // 1. 当前第几页
        per_page: articlesQuery.pageSize, // 2. 每页显示数量
        status: articlesQuery.status, // 3. 文章状态 null(全部),0, 1, 2, 3, 4
        channel_id:
          articlesQuery.channelId !== 0 ? articlesQuery.channelId : null, // 4. 文章频道id
        begin_pubdate: articlesQuery.rangeDate
          ? articlesQuery.rangeDate[0]
          : null, // 5. 开始日期
        end_pubdate: articlesQuery.rangeDate
          ? articlesQuery.rangeDate[1]
          : null, // 6. 截止日期
      }).then((res) => {
        const { results, total_count } = res.data.data;
        articlesData.articles = results; // 文章数据
        articlesData.totalCount = total_count; // 文章总数

        loading.value = false;
      });
    };

    /* 请求文章频道的方法 */
    const loadChannels = () => {
      getArticlesChannels().then((res) => {
        articlesData.channels = res.data.data.channels;
      });
    };

    /* 分页中查询某页文章的方法 */
    const onCurrentChange = (page) => {
      loadArticles(page); // 分页 - 加载文章
    };

    /* 删除文章 */
    const onDeleteArticle = (articleId) => {
      ElMessageBox.confirm("将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除文章, JSONbig处理后, articleId需要toString()
          deleteArticle(articleId.toString()).then((res) => {
            loadArticles(currentPage.value); // 删除后 重新加载当前页文章
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    /* 初始化请求 */
    loadArticles(1); // 初始化 加载第一页
    loadChannels(); // 加载文章频道

    return {
      articlesQuery,
      articlesData,
      currentPage,
      loading,

      loadArticles,
      onCurrentChange,
      onDeleteArticle,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.image-loading {
  line-height: 60px;
  font-size: 16px;
  text-align: center;
  color: #999;
}

.article-image {
  width: 80px;
  height: 60px;
  background-size: cover;
}
</style>
