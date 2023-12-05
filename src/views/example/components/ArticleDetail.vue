<script setup lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { searchUser } from "@/api/remote-search";
import { fetchArticle } from "@/api/article";
import Sticky from "@/components/Sticky/index.vue";
import MDinput from "@/components/MDinput/index.vue";
// import Tinymce from "@/components/Tinymce/index.vue";
// import tinymce from "tinymce/tinymce";
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown,
} from "./Dropdown";
import { useRoute } from "vue-router";

defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const postForm = reactive({
  status: "draft",
  author: "",
  content: "", // 文章内容
  content_short: "", // 文章摘要
  source_uri: "", // 文章外链
  image_uri: "", // 文章图片
  display_time: new Date(), // 前台展示时间,
  comment_disabled: false, // 是否禁止评论
  platforms: ["a-platform"], // 平台
  id: undefined,
  importance: 0,
  title: "",
});

const tinyKey = ref(0);

function fetchData() {
  fetchArticle(route.params.id).then((res) => {
    postForm.title = res.data.title;
    postForm.content = res.data.content;
    postForm.content_short = res.data.content_short;
    postForm.source_uri = res.data.source_uri;
    postForm.image_uri = res.data.image_uri;
    postForm.display_time = res.data.display_time;
    postForm.comment_disabled = res.data.comment_disabled;
    postForm.platforms = res.data.platforms;
    postForm.id = res.data.id;
    postForm.importance = res.data.importance;
    postForm.author = res.data.author;
  });
}
fetchData();

const userListOptions = ref<string[]>([]);

function getRemoteUserList(query: string) {
  searchUser(query).then((res) => {
    if (!res.data.items) return;
    userListOptions.value = res.data.items.map((item: any) => item.name);
  });
}

const displayTime = computed({
  get: () => {
    return new Date(postForm.display_time);
  },
  set: (val) => {
    postForm.display_time = new Date(val);
  },
});
</script>

<script lang="ts">
export default defineComponent({
  name: "Index",
});
</script>

<template>
  <div class="createPost-container">
    <el-form ref="postFormRef" :model="postForm">
      <Sticky :z-index="10" :sticky-top="90">
        <div class="sub-navbar flex items-center justify-end">
          <CommentDropdown
            v-model="postForm.comment_disabled"
          ></CommentDropdown>
          <PlatformDropdown v-model="postForm.platforms"></PlatformDropdown>
          <SourceUrlDropdown v-model="postForm.source_uri"></SourceUrlDropdown>
          <el-button style="margin-left: 10px" type="success" @click="">
            Publish
          </el-button>
          <el-button
            style="margin-left: 10px; margin-right: 20px"
            type="warning"
            @click=""
          >
            Draft
          </el-button>
        </div>
      </Sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                Title
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="Author:"
                    label-width="60px"
                    class="postInfo-container-item"
                  >
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteUserList"
                      remote
                      filterable
                      default-first-option
                      placeholder="Search user"
                    >
                      <el-option
                        v-for="(item, index) in userListOptions"
                        :key="item + index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label="Publish Time:"
                    label-width="120px"
                    class="postInfo-container-item"
                  >
                    <el-date-picker v-model="displayTime"></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="Importance:"
                    label-width="90px"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                    ></el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item
          style="margin-bottom: 40px"
          label-width="70px"
          label="Summary:"
        >
          <el-input
            v-model="postForm.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          ></el-input>
          <!-- <span v-show=""></span> -->
        </el-form-item>
      </div>
      <Tinymce
        v-model:content="postForm.content"
        v-model:tinyKey="tinyKey"
      ></Tinymce>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.sub-navbar {
  height: 50px;
  width: 100%;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(
    90deg,
    rgba(32, 182, 249, 1) 0%,
    rgba(32, 182, 249, 1) 0%,
    rgba(33, 120, 241, 1) 100%,
    rgba(33, 120, 241, 1) 100%
  );

  .subtitle {
    font-size: 20px;
    color: #fff;
  }

  &.draft {
    background: #d0d0d0;
  }

  &.deleted {
    background: #d0d0d0;
  }
}

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
}

.article-textarea {
  :deep(.el-textarea__inner) {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
    box-shadow: 0 0 0 0px !important;
  }
}
</style>
