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
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { getArticles, updateCommentStatus } from "../../api/article";

import { ElMessage } from "element-plus";

export default defineComponent({
  name: "CommentIndex",
  setup() {
    const articles = ref([]);
    // -------------------------------------------------------------------------
    /* 加载评论管理 */
    const loadArticles = () => {
      getArticles({
        response_type: "comment",
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((article) => {
          article.statusDisabled = false;
        });

        articles.value = results;
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

    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};
    // -------------------------------------------------------------------------
    loadArticles(); // 初始化加载评论
    return {
      articles,

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
