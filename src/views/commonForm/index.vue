<script setup lang="ts">
import { defineComponent, reactive } from "vue";
import CommonForm from "@/components/CommonForm/index.vue";
const formConfig = reactive([
  { type: "input", label: "姓名", key: "name" },
  {
    type: "radio",
    key: "sex",
    label: "性别",
    data: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
    ],
  },
  {
    type: "select",
    key: "hobbit",
    label: "爱好",
    data: [
      { label: "篮球", value: "1" },
      { label: "足球", value: "2" },
    ],
    attrs: {
      clearable: true,
    },
  },
]);
</script>

<script lang="ts">
export default defineComponent({
  name: "commonForm",
});
</script>

<template>
  <div class="">
    <CommonForm :formConfig="formConfig" />
  </div>
</template>

<style lang="scss" scoped></style>
