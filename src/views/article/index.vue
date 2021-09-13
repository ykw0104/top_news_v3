<template>
  <div class="article-container">
    <el-card class="filter-card">
      <template #header>
        <div>
          <!-- a. 面包屑路径导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <!-- b. 数据筛选表单-->
      <el-form
        ref="formRules"
        v-model="formData"
        label-width="70px"
        size="mini"
      >
        <!-- b1.根据状态查询 -->
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
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
          <el-select v-model="formData.channelId" placeholder="请选择频道">
            <!-- TODO 设置null会报warning -->
            <!-- <el-option label="全部" :value="null"></el-option> -->
            <el-option
              v-for="(channel, index) in channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            />
          </el-select>
        </el-form-item>
        <!-- b3.根据日期查询 -->
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="formData.rangeDate"
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
        <div>
          共筛选出 xxxx 条数据:
        </div>
      </template>
      <!-- c. 表格 -->
      <el-table
        class="list-table"
        :data="tableData"
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>

      <!-- d. 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        :background="true"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ArticleIndex",
  setup() {
    // 表单双向绑定的数据
    const formData = reactive({
      status: null,
      channelId: 0,
      rangeDate: "",
    });
    const channels = ref({});

    //表格数据
    const tableData = ref([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
    ]);

    const loadArticles = () => {};
    return {
      formData,
      channels,
      tableData,
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
</style>
