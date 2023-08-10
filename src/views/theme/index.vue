<script setup lang="ts">
import { ref, watch } from "vue"
const theme = ref(false)

watch(theme, () => {
  changeTheme(theme.value)
})



const changeTheme = (val: Boolean) => {
  const html = document.querySelector('html')

  if (html) {
    if (!theme.value) {
      html.classList.remove("dark");
      html.classList.add("light");
      document.body.classList.toggle("dark-mode");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      document.body.classList.toggle("dark-mode");

    }
  }
}

</script>

<template>
  <div :class="{ custom: theme }">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          Theme Documentation
        </div>
      </template>
      change theme:
      <el-switch v-model="theme" inline-prompt active-text="dark" inactive-text="none" />
      <aside style="margin-top:15px;">
        Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different
        application scenarios. Refer to the documentation for details.
      </aside>
    </el-card>
    <div class="block">
      <el-button type="primary" :class="{ customButton: theme }">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" >
.box-card {
  width: 30%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
