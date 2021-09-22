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
        <el-table-column label="状态">
          <template #default="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
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

import { getArticles } from "../../api/article";

export default defineComponent({
  name: "CommentIndex",
  setup() {
    const tableData = ref([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
    ]);

    const articles = ref([]);
    // -------------------------------------------------------------------------
    const loadArticles = () => {
      getArticles({
        response_type: "comment",
      }).then((res) => {
        articles.value = res.data.data.results;
      });
    };

    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};
    // -------------------------------------------------------------------------
    loadArticles(); // 初始化加载评论
    return {
      tableData,
      articles,

      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>
