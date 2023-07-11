<script setup lang="ts">
import { defineComponent } from "vue"
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'


const logout = () => {
  console.log('logout')
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'NavBar'
})
</script>

<template>
  <div class="navbar">
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <HeaderSearch id="header-search" class="right-menu-item hover-effect" />
      <ScreenFull id="screen-full" class="right-menu-item hover-effect" />

      <el-tooltip effect="dark" content="Global Size" placement="bottom">
        <SizeSelect id="size-select" class="right-menu-item hover-effect" />
      </el-tooltip>

      <el-dropdown trigger="click" class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="@/assets/avatar.gif" class="user-avatar" alt="">
          <el-icon :size="12" class="el-icon-caret-bottom">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Dashboard</el-dropdown-item>
            <el-dropdown-item>Github</el-dropdown-item>
            <el-dropdown-item>Docs</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;



      &.hover-effect {
        cursor: pointer;
        transition: all .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    &:focus {
      outline: none;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
