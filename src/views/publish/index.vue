<template>
  <div class="publish-container">
    <!--  -->
    <el-card class="box-card">
      <template #header>
        <!---------------------------- a. 面包屑路径导航 -------------------------------------------------------->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!--------------------------------b. 表单内容 ------------------------------------------------------------->
      <el-form :model="article" label-width="50px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(channel, index) in channels"
              :key="index"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { getArticlesChannels, addArticle } from "../../api/article";

import { ElMessage } from "element-plus";

export default defineComponent({
  name: "PublishIndex",
  setup() {
    const article = reactive({
      title: "", // 文章标题
      content: "", // 文章内容
      cover: {
        type: 0, // 文章封面类型 -1自动 0无图 1张 3张
        images: [], // 文章图片数组
      },
      channel_id: null,
    });
    const channels = ref([]); // 文章频道

    /* 加载文章频道 */
    const loadArticlesChannels = () => {
      getArticlesChannels().then((res) => {
        channels.value = res.data.data.channels;
      });
    };

    /* 发布文章 */
    const onPublish = (draft) => {
      addArticle(article, draft)
        .then((res) => {
          ElMessage.success({
            message: "发出成功",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage.error(`${err}`);
        });
    };

    loadArticlesChannels(); // 初始化 文章频道
    return {
      article,
      channels,

      onPublish,
    };
  },
});
</script>

<style lang="scss" scoped></style>
