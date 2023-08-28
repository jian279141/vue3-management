<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import UserCard from "./components/UserCard.vue"
import Activity from "./components/Activity.vue"
import TimeLine from "./components/TimeLine.vue";
import Account from "./components/Account.vue"
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore()

const user = ref({
  name: '',
  email: '',
  avatar: '',
  role: ''
})

onMounted(() => {
  getUser()
})

const getUser = () => {
  user.value.avatar = userStore.avatar
  user.value.name = userStore.name
  user.value.email = 'admin@test.com'
  user.value.role = userStore.roles.join('|')
}

const activeTab = ref('activity')
</script>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<template>
  <div class="w-[100%] profile-container">
    <el-row :gutter="20">

      <el-col :span="6" class="left-card">
        <UserCard :user="user"></UserCard>
      </el-col>

      <el-col :span="18" class="right-card">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Activity" name="activity">
              <activity />
            </el-tab-pane>
            <el-tab-pane label="Timeline" name="timeline">
              <TimeLine />
            </el-tab-pane>
            <el-tab-pane label="Account" name="account">
              <account :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

.left-card {
  padding: 0 10px;
}

.right-card {
  padding: 0 10px;
}
</style>
