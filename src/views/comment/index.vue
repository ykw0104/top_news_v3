<template>
  <div class="comment-container">
    <el-card class="box-card">
      <template #header>
        <!---------------------------- a. 面包屑路径导航 ------------------------------------>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!---------------------------- b. 内容 ------------------------------------>
      <el-table class="table-list" :data="articles" style="width: 100%" stripe>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template #default="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- 双向绑定 comment_status -->
            <el-switch
              :disabled="scope.row.statusDisabled"
              v-model="scope.row.comment_status"
              @change="onStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>

      <!---------------------------- c. 分页------------------------------------>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:current-page="pageInfo.curPage"
        :page-sizes="[10, 20, 30, 50]"
        v-model:page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.totalCount"
        background
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import { getArticles, updateCommentStatus } from "../../api/article";

import { ElMessage } from "element-plus";

export default defineComponent({
  name: "CommentIndex",
  setup() {
    const articles = ref([]);
    // 分页相关
    const pageInfo = reactive({
      curPage: 1, // 当前页
      pageSize: 10, // 每页几条
      totalCount: 0, // 总数
    });
    // -------------------------------------------------------------------------
    /* 加载评论管理 */
    const loadArticles = (page = 1) => {
      pageInfo.curPage = page;

      getArticles({
        page,
        per_page: pageInfo.pageSize,
        response_type: "comment",
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((article) => {
          article.statusDisabled = false;
        });

        articles.value = results;
        pageInfo.totalCount = res.data.data.total_count;
      });
    };

    /* 更新评论状态 */
    const onStatusChange = (article) => {
      article.statusDisabled = true;
      // 请求更新评论状态
      updateCommentStatus(article.id.toString(), article.comment_status)
        .then((res) => {
          article.statusDisabled = false;
          ElMessage({
            message: "评论状态更新成功",
            type: "success",
          });
        })
        .catch((err) => {
          article.statusDisabled = false;
          article.comment_status = !article.comment_status;
          ElMessage.error(`评论状态更新失败 ${err}`);
        });
    };

    /* 每页显示条数改变 */
    const handleSizeChange = (curPageSize) => {
      loadArticles(1); // page-size改变后,重新加载评论
    };

    /* 当前页改变 */
    const handleCurrentChange = (curPage) => {
      loadArticles(curPage); // 加载指定页码的评论
    };
    // -------------------------------------------------------------------------
    loadArticles(1); // 初始化加载评论
    return {
      articles,
      pageInfo,

      handleSizeChange,
      handleCurrentChange,
      onStatusChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>
