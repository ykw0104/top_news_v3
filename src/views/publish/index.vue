<template>
  <div class="publish-container">
    <!--  -->
    <el-card class="box-card">
      <template #header>
        <!---------------------------- a. 面包屑路径导航 -------------------------------------------------------->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ $route.query.id ? "修改文章" : "发布文章" }}
          </el-breadcrumb-item>
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
import { useRoute } from "vue-router";

import {
  getArticlesChannels,
  addArticle,
  updateArticle,
  getArticle,
} from "../../api/article";

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

    const route = useRoute();
    // ---------------------------------------------------------------------------------------------------
    /* 加载文章频道 */
    const loadArticlesChannels = () => {
      getArticlesChannels().then((res) => {
        channels.value = res.data.data.channels;
      });
    };

    /* 1. 路由路径有id值, 修改文章  
       2. 路由路径没有id值, 添加文章  
    */
    const onPublish = (draft) => {
      if (route.query.id) {
        updateArticle(route.query.id, article, draft)
          .then((res) => {
            console.log(res);

            ElMessage.success({
              message: "修改成功",
              type: "success",
            });
          })
          .catch((err) => {
            ElMessage.error(`${err}`);
          });

        router.push("/article"); // 修改成功,跳转到内容管理页面
      } else {
        addArticle(article, draft)
          .then((res) => {
            ElMessage.success({
              message: "添加成功",
              type: "success",
            });

            router.push("/article"); // 添加成功,跳转到内容管理页面
          })
          .catch((err) => {
            ElMessage.error(`${err}`);
          });
      }
    };

    /* 加载文章 */
    const loadArticle = () => {
      getArticle(route.query.id).then((res) => {
        const {
          title,
          content,
          cover: { type, images },
          channel_id,
        } = res.data.data;
        article.title = title;
        article.content = content;
        article.cover.type = type;
        article.cover.images = images;
        article.channel_id = channel_id;
      });
    };
    // ---------------------------------------------------------------------------------------------------

    loadArticlesChannels(); // 初始化 文章频道

    /* 路由路径参数有id, 显示文章内容 */
    if (route.query.id) {
      loadArticle();
    }

    return {
      article,
      channels,

      onPublish,
    };
  },
});
</script>

<style lang="scss" scoped></style>
