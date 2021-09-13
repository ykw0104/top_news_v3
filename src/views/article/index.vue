<template>
  <div class="article-container">
    <!-- a. 面包屑路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- b. 数据筛选表单-->
    <el-form ref="artRules" v-model="artData" label-width="70px" size="mini">
      <!-- 1.根据状态查询 -->
      <el-form-item label="状态">
        <el-radio-group v-model="artData.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 2.根据频道查询 -->
      <el-form-item label="频道">
        <el-select v-model="artData.channelId" placeholder="请选择频道">
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
      <!-- 3.根据日期查询 -->
      <el-form-item label="日期" required>
        <el-date-picker
          v-model="artData.rangeDate"
          format="YYYY-MM-DD"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!-- 4.执行查询 -->
      <el-form-item>
        <el-button type="primary" @click="loadArticles(1)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ArticleIndex",
  setup() {
    const artData = reactive({
      status: null,
      channelId: 0,
      rangeDate: "",
    });
    const channels = ref({});

    const loadArticles = () => {};
    return {
      artData,
      channels,
    };
  },
});
</script>

<style lang="scss" scoped></style>
