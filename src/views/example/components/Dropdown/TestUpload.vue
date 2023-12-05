<script setup lang="ts">
import { defineComponent, ref } from "vue";
import instance from "@/utils/fileRequest";

const file = ref(null);

function fileChange(e: any) {
  file.value = e.target.files[0];
}
function fileUpload() {
  const formData = new FormData();
  formData.append("fileName", file.value.name);
  formData.append("file", file.value);

  instance({
    url: "/vue-admin-template/upload",
    method: "post",
    data: formData,
  }).then((res) => {
    console.log(res);
  });
}

function handlerDrop(e) {
  console.log(e.dataTransfer.files);
}
</script>

<script lang="ts">
export default defineComponent({
  name: "Index",
});
</script>

<template>
  <div class="">
    <input type="file" @change="fileChange" />
    <el-button @click="fileUpload">upLoad</el-button>
    <div
      class="w-[100px] h-[100px] bg-slate-600"
      @drop.prevent="handlerDrop"
      @dragover.prevent=""
    >
      TestUpload
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
