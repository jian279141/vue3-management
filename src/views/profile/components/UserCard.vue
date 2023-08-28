<script setup lang="ts">
import { defineComponent } from "vue"
import PanThumb from "@/components/PanThumb/index.vue"

defineProps({
  user: {
    type: Object,
    default: () => {
      return {
        name: '',
        email: '',
        avatar: '',
        role: ''
      }
    }
  }
})

</script>

<script lang="ts">
export default defineComponent({
  name: 'UserCard',
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>About me</span>
      </div>
    </template>

    <div class="user-profile">
      <div class="box-center">
        <PanThumb :image="user.avatar" height="100px" width=" 100px " :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </PanThumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="svg-education" />
          <span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="svg-skill" />
          <span>Skills</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="80" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>CSS</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>

  </el-card>
</template>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;

  .user-name {
    font-weight: bold;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.text-muted {
  color: #777;
}
</style>
