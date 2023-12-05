<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  onActivated,
  onDeactivated,
} from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  tinyKey: {
    type: Number,
    default: 0,
  },
});

// tinymce init config
const initObj = {
  selector: "#tinymce",
  language: "zh_CN",
  setup(editor) {
    editor.on("init", () => {
      editor.setContent(props.content);
    });
  },
};

const emit = defineEmits(["update:tinyKey"]);

const tinymceKey = ref(0);

onMounted(() => {
  tinymce.remove();
  tinymce.init(initObj);
});

function handleClick() {
  tinymce.activeEditor.setContent("hello world");
}
function handleClick1() {
  console.log(tinymce.activeEditor.getContent());
}
</script>

<script lang="ts">
export default defineComponent({
  name: "Tinymce",
});
</script>

<template>
  <div class="tinymce-container">
    <div id="tinymce" :key="tinyKey"></div>
    <el-button @click="handleClick"></el-button>
    <el-button @click="handleClick1">get</el-button>
  </div>
</template>

<style lang="scss" scoped>
.tinymce-container {
  width: 98%;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
