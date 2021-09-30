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
      <el-form
        ref="articleRef"
        :model="article"
        :rules="articleRules"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 上传图片组件 -->
          <template v-if="article.cover.type > 0">
            <!-- <upload-cover
              v-for="(cover, index) in article.cover.type"
              :key="cover"
              :cover-image-prop="article.cover.images[index]"
              @update-cover="onUpdateCover(url, index)"
            /> -->
            <upload-cover
              v-for="(cover, index) in article.cover.type"
              :key="cover"
              v-model="article.cover.images[index]"
            />
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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

import UploadCover from "./components/upload-cover.vue";

export default defineComponent({
  name: "PublishIndex",
  components: { UploadCover },
  setup(props) {
    const articleRef = ref(null);

    const article = reactive({
      title: "", // 文章标题
      content: "", // 文章内容
      cover: {
        type: 0, // 文章封面类型 -1自动 0无图 1张 3张
        images: [], // 文章图片数组
      },
      channel_id: null,
    });

    const articleRules = reactive({
      title: [
        { required: true, message: "请输入文章标题", trigger: "change" },
        {
          min: 5,
          max: 30,
          message: "长度在 5 到 30 个字符",
          trigger: "change",
        },
      ],
      content: [
        { required: true, message: "请输入文章内容", trigger: "change" },
        {
          validator: (rule, value, callback) => {
            if (value === "<p></p>") {
              callback(new Error("请输入文章内容"));
            } else {
              callback();
            }
          },
          trigger: "change",
        },
      ],
      channel_id: [
        { required: true, message: "请选择文章频道", trigger: "change" },
      ],
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

    /* 1. 修改文章
       2. 路由路径没有id值, 添加文章
    */
    const onPublish = (draft) => {
      articleRef.value.validate((valid) => {
        if (valid) {
          // a. 表单验证通过
          if (route.query.id) {
            // a1. 修改文章
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
            // b. 添加文章
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
        } else {
          // b. 表达验证失败
          return false;
        }
      });
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

    /* 接受子组件传过来的图片url */
    const onUpdateCover = (url, index) => {
      article.cover.images[index] = url;
    };
    // ---------------------------------------------------------------------------------------------------

    loadArticlesChannels(); // 初始化 文章频道

    /* 路由路径参数有id, 显示文章内容 */
    if (route.query.id) {
      loadArticle();
    }

    return {
      articleRef,
      article,
      articleRules,
      channels,

      onPublish,
      onUpdateCover,
    };
  },
});
</script>

<style lang="scss" scoped></style>
