<script setup lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import ArticleDetail from "./components/ArticleDetail.vue";
import TestUpload from "./components/Dropdown/TestUpload.vue";

const base64Url = ref("");
const imageRef = ref(null);

function fileChange(e: any) {
  const file = e.target.files[0];
  console.log(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async function () {
    base64Url.value = reader.result as string;
    await nextTick();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = imageRef.value;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    canvas.toBlob((blob) => {
      console.log(blob);
    });
  };
}

const inputRef = ref(null);
function clickFun() {
  inputRef.value.click();
}
</script>

<script lang="ts">
export default defineComponent({
  name: "Index",
});
</script>

<template>
  <ArticleDetail :is-edit="true"></ArticleDetail>
  <input ref="inputRef" type="file" @change="fileChange" />
  <img ref="imageRef" :src="base64Url" />
  <el-button @click="clickFun"></el-button>
  <TestUpload></TestUpload>
</template>

<style lang="scss" scoped></style>
