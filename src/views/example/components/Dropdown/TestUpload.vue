<script setup lang="ts">
import { defineComponent, ref } from "vue";
import instance from "@/utils/fileRequest";
// import createHash from "@/utils/createHash";
import { getQiniuToken } from "@/api/qiniu";
// import Worker from "@/utils/hashWorker?worker";
// import SparkMD5 from "spark-md5";

const file = ref<File | null>(null);

function fileChange(e: any) {
  file.value = e.target.files[0];
  console.log(file.value);
}
async function fileUpload() {
  if (!file.value) return;
  // 获取七牛云token
  const { data } = await getQiniuToken();
  console.log(data);

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("token", data.token);
  formData.append("key", "upload/" + file.value.name);

  instance({
    url: "https://up-as0.qiniup.com",
    method: "post",
    data: formData,
  }).then((res) => {
    console.log(res);
  });
}
// 分片上传
function fileUploadChunks() {
  if (!file.value) return;
  const chunkSize = 1024 * 1024 * 4; // 4M
  const chunkCount = Math.ceil(file.value.size / chunkSize);
  const chunks = [];
  for (let i = 0; i < chunkCount; i++) {
    chunks.push(file.value.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  //切片分别上传
  let requestList = chunks.map(async (chunk, index) => {
    // 获取切片的hash值
    // const chunkHash = await createHash(chunk);
    // 上传切片
    const formData = new FormData();
    formData.append("file", chunk as Blob);
    formData.append("fileName", file.value?.name as string);
    formData.append("chunkIndex", index.toString());
    // formData.append("chunkHash", chunkHash);
    formData.append("chunkCount", chunkCount.toString());
    return new Promise((resolve) => {
      instance({
        url: "upload/chunks",
        method: "post",
        data: formData,
      }).then((res) => {
        resolve(res);
      });
    });
  });
  // 切片上传
  Promise.allSettled(requestList).then((res) => {
    console.log(res);
  });
}
// 续点上传
function fileUploadContinue() {
  if (!file.value) return;
  const chunkSize = 1024 * 1024 * 4; // 4M
  const chunkCount = Math.ceil(file.value.size / chunkSize);
  const chunks = [];
  // 获取已经上传的切片

  for (let i = 0; i < chunkCount; i++) {
    chunks.push(file.value.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  //切片分别上传
  let requestList = chunks.map(async (chunk, index) => {
    // 获取切片的hash值
    // const chunkHash = await createHash(chunk);
    // 上传切片
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("fileName", file.value?.name || "");
    formData.append("chunkIndex", index.toString());
    // formData.append("chunkHash", chunkHash);
    formData.append("chunkCount", chunkCount.toString());
    return new Promise((resolve) => {
      instance({
        url: "upload/chunks",
        method: "post",
        data: formData,
      }).then((res) => {
        resolve(res);
      });
    });
  });
  // 切片上传
  Promise.allSettled(requestList).then((res) => {
    console.log(res);
  });
}
// const percentageRef = ref(0);
// const createHashWorker = async (file:Blob[]) => {
//   return new Promise((resolve) => {
//     const myWorker = new Worker(); // 创建worker
//     myWorker.postMessage({ file });
//     myWorker.onmessage = (e) => {
//       console.log(e.data);
//       const { percentage, hash } = e.data;
//       percentageRef.value = percentage;
//       if (percentage >= 100) {
//         resolve(hash);
//       }
//     }; // Greeting from Worker.js，worker线程发送的消息
//   });
// };

// 使用webworker计算hash
// async function fileUploadWebWorker() {
//   const chunkSize = 1024 * 1024 * 4; // 4M
//   const chunkCount = Math.ceil((file.value?.size as number) / chunkSize);
//   const chunks = [];
//   for (let i = 0; i < chunkCount; i++) {
//     chunks.push(file.value?.slice(i * chunkSize, (i + 1) * chunkSize));
//   }
//   const hash = await createHashWorker(chunks);
//   console.log(hash);
// }

function fileMerge() {
  const formData = new FormData();
  formData.append("fileName", file.value?.name as string);
  // 合并请求
  instance({
    url: "upload/merge",
    method: "post",
    data: formData,
  }).then((res) => {
    console.log(res);
  });
}

function handlerDrop(event: DragEvent) {
  console.log(event.dataTransfer?.files);
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
    <el-button @click="fileUploadChunks">upLoadChunks</el-button>
    <el-button @click="fileMerge">merge</el-button>
    <el-button @click="fileUploadContinue">continue</el-button>
    <!-- <el-button @click="fileUploadWebWorker">webWorker</el-button> -->
    <!--  -->
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
