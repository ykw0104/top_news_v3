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
      <el-form
        ref="formRules"
        v-model="articlesQuery"
        label-width="70px"
        size="mini"
      >
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
            format="YYYY-MM-DD"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <!-- b4.执行查询 -->
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
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
      >
        <!-- 第一列 -->
        <el-table-column label="封面">
          <template #default="scope">
            <img
              v-if="scope.row.cover.images[0]"
              class="article-image"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-image" src="./no-cover.jpeg" alt="" />
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
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!----------------------------------------- d. 分页 ------------------------------------------>
      <el-pagination
        layout="prev, pager, next"
        :total="articlesData.totalCount"
        :page-size="articlesQuery.pageSize"
        :background="true"
        @current-change="onCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import { getArticles, getArticlesChannels } from "../../api/article";

export default defineComponent({
  name: "ArticleIndex",
  setup() {
    /********************************************************************************/
    // 请求文章的参数
    const articlesQuery = reactive({
      pageSize: 10, // 每页显示数量
      status: null, // 可选, 文章状态 null(全部),0, 1, 2, 3, 4
      channelId: 0, // 可选, 频道ID
      rangeDate: "", // 可选
    });

    // 保存请求获取的数据
    const articlesData = reactive({
      articles: [], // 获取文章对象的数组
      totalCount: 0, // 文章总数

      channels: [], // 文章频道
    });

    /********************************************************************************/
    /* 请求文章的方法 */
    const loadArticles = (page = 1) => {
      getArticles({
        page, // 当前第几页
        per_page: articlesQuery.pageSize, // 每页显示数量
        status: articlesQuery.status, // 文章状态
        channel_id:
          articlesQuery.channelId !== 0 ? articlesQuery.channelId : null, // 文章频道id
      }).then((res) => {
        const { results, total_count } = res.data.data;
        articlesData.articles = results; // 文章数据
        articlesData.totalCount = total_count; // 文章总数
      });
    };
    /* 请求文章频道的方法 */
    const loadChannels = () => {
      getArticlesChannels().then((res) => {
        articlesData.channels = res.data.data.channels;
      });
    };

    /* 初始化请求 */
    loadArticles(1); // 文章请求
    loadChannels(); // 文章频道请求

    // 分页组件相关
    const onCurrentChange = (page) => {
      loadArticles(page); // 文章请求 - 分页
    };

    return {
      articlesQuery,
      articlesData,

      loadArticles,
      onCurrentChange,
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

.article-image {
  width: 60px;
  height: 40px;
  background-size: cover;
}
</style>
