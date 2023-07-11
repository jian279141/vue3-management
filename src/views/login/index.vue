<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue"
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
const router = useRouter()

const loginFormData = reactive({
  username: 'admin',
  password: '111111'
})



const loginRules = reactive({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'blur' }
  ]
})

const loginFormRef = ref<FormInstance>()

const handlerLogin = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      const userStore = useUserStore()
      userStore.login(loginFormData).then(() => {
        router.push({ path: '/', params: {} })
      }).catch((err) => {
        console.log('err', err);
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}


</script>

<template>
  <div class="content">
    <div class="login-wrapper">
      <div class="left-img">
        <div class="glass">
          <div class="tips">
            <div class="title">
              THE SPACE NETWORK
            </div>
            <h1>Explore The Universe</h1>
            <span>5 Million+ people have joined our network.</span>
            <span>we invite you to join the tribe</span>
          </div>
        </div>
      </div>
      <div class="right-login-form">
        <el-form ref="loginFormRef" :model="loginFormData" :rule="loginRules" class="login-form">
          <div class="form-wrapper">
            <h1>Log in</h1>
            <div class="input-items">
              <span class="input-tips">
                User
              </span>
              <el-input v-model="loginFormData.username" placeholder="Enter your account" name="username" type="text" />
            </div>
            <div class="input-items">
              <span class="input-tips">
                Password
              </span>
              <el-input v-model="loginFormData.password" placeholder="Enter your password" name="password" type="password"
                show-password />
              <span class="forgot">Forgot Password</span>
            </div>
            <button class="btn" type="button" @click="handlerLogin(loginFormRef)">Log in</button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;


.content {
  font-family: 'Aguazyuan', Courier, monospace;
  width: 100vw;
  height: 100vh;
  background-color: rgb(186, 175, 221);
  position: relative;

  .login-wrapper {
    width: 70vw;
    height: 80vh;
    background-color: #fff;
    border-radius: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    .left-img {
      border-radius: 40px;
      flex: 1;
      background: url(@/assets/bg.jpg) no-repeat;
      background-size: cover;
      position: relative;

      .glass {
        width: 60%;
        padding: 20px;
        color: #fff;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -20%);
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.48);

        .tips {
          .title {
            width: 25%;
            font-weight: 600;
            font-size: 15px;
            text-align: center;
            padding: 10px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.48);
          }

          h1 {
            margin: 15px 0;
          }

          span {
            margin: 5px 0;
            display: block;
            font-weight: 100;
          }
        }
      }
    }

    .right-login-form {
      flex: 1;
      position: relative;

      .form-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        h1 {
          font-size: 30px;
          text-align: center;
        }

        .input-items {
          margin: 20px 0;

          .input-tips {
            display: inline-block;
            font-weight: 600;
            font-size: 20px;
            margin: 10px 0;
          }

          // .inputs {
          //   width: 100%;
          //   height: 50px;
          //   border-radius: 10px;
          //   border: 1px solid rgb(227, 227, 227);
          //   padding: 20px;
          //   box-sizing: border-box;
          //   outline: none;
          //   transition: .5s;

          //   &:focus {
          //     border: 1px solid rgb(128, 106, 196);
          //   }
          // }
          .el-input {
            width: 100%;
            height: 50px;
            font-size: 15px;
            border-radius: 10px;
            border: 1px solid rgb(227, 227, 227);
            box-sizing: border-box;
            outline: none;
            transition: .5s;

            :deep(.is-focus) {
              box-shadow: 0 0 0 1px rgb(128, 106, 196);
            }
          }

          .forgot {
            float: right;
            font-weight: 600;
            text-align: right;
            margin: 5px 0;
            font-size: 13px;
            cursor: pointer;
          }
        }

        .btn {
          width: 100%;
          height: 50px;
          background-color: rgb(128, 106, 196);
          border: 0;
          border-radius: 10px;
          color: #fff;
          font-size: 25px;
          margin: 20px 0;
          cursor: pointer;
        }

        .siginup-tips {
          text-align: center;
          font-weight: 600;
          margin: 10px 0;

          span:last-child {
            color: rgb(110, 87, 179);
            cursor: pointer;
          }
        }

        .other-login {
          .divider {
            width: 100%;
            margin: 20px 0;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .line {
              display: inline-block;
              max-width: 35%;
              width: 35%;
              flex: 1;
              height: 1px;
              background-color: rgb(162, 172, 185);
            }

            .divider-text {
              vertical-align: middle;
              margin: 0 20px;
              display: inline-block;
              width: 50px;
              color: rgb(162, 172, 185);
              white-space: normal;
            }
          }

          .other-login-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .other-login-item {
              width: 70px;
              padding: 10px;
              text-align: center;
              border-radius: 10px;
              cursor: pointer;
              font-weight: 600;
              color: rgb(51, 49, 116);
              margin: 0 10px;
              transition: .4s;

              img {
                width: 40px;
                height: 40px;
                vertical-align: middle;
              }

              span {
                vertical-align: middle;
              }

              &:hover {
                width: 80px;
                height: 50%;
                background-color: #fff;
                border: 0;
                box-shadow: 1px 10px 32px 1px rgba(186, 175, 221, 0.37);
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .login-wrapper {
    padding: 20px;

    .left-img {
      display: none;
    }

    .right-login-form {
      padding: 20px;
    }
  }
}
</style>
