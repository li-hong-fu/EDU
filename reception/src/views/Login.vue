<template>
  <div class="account-login-contaienr">
    <div class="account-login-bd">
      <div class="company-info-container">
        <img class="company-info-logo" src="~@/assets/logo.png" />
        <span class="company-info-name">EDU 登录</span>
      </div>
      <div class="account-login-mainer">
        <div class="login-form-phone">
          <el-form
            :model="smsFrom"
            status-icon
            :rules="smsRules"
            ref="smsFrom"
          >
            <el-form-item prop="phone">
              <el-input
                type="number"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输手机号"
                v-model="smsFrom.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="flex-cell">
                <el-input
                  class="flex-cell-bd"
                  type="number"
                  placeholder="请输入验证码"
                  v-model="smsFrom.code"
                  autocomplete="off"
                  prefix-icon="el-icon-mobile"
                ></el-input>
                <el-button
                  :disabled="disabled"
                  class="flex-cell-ft"
                  @click="handleSendCode"
                  >{{ buttonName }}</el-button
                >
              </div>
            </el-form-item>
            <el-form-item prop="checked">
              <div class="flex-cell">
                <el-button type="text" @click="getWechat">使用微信登录>></el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('smsFrom')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userModel from "../models/users";
import wechatModel from "../models/wechat";
export default {
  data() {
    return {
      smsFrom: {
        phone: "",
        code: ""
      },
      smsRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      buttonName: "获取验证码",
      disabled: false
    };
  },
  created() {
    let code = this.$route.query.code;
    wechatModel.wechat({code}).then(res => {
      console.log(res)
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        this.$message.success(res.data.message);
        this.$router.push({ name: "Index" });
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         let phone = this.smsFrom.phone;
         let code = this.smsFrom.code;
         userModel.smsLogin({phone, code}).then(res => {
            if(res.data.token){
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user_id", res.data.user_id);
              this.$message.success(res.data.message);
              this.$router.push({ name: "Index" });
            }else{
              this.$message.error(res.data.message)
            }
         })
        }
      });
    },
    handleSendCode() {
      if (this.disabled) {
        return;
      }

      this.$refs.smsFrom.validateField("phone", errMsg => {
        console.log(errMsg)
        if (errMsg) return;
        this.disabled = true;

        userModel.send({ phone:this.smsFrom.phone }).then(res => {
          console.log(res)
          this.$message.success("验证码发送成功！");
          let time = 60;
          this.buttonName = `(${time})秒重新发送`;
          const interval = window.setInterval(() => {
            time -= 1;
            this.buttonName = `(${time})秒重新发送`;
            if (time <= 0) {
              this.buttonName = "重新发送";
              this.disabled = false;
              window.clearInterval(interval);
            }
          }, 1000)
        })
      });
    },
    getWechat(){
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=wxf31cb4f589ed68c3&redirect_uri=http://edu-www.aitschool.com/login&response_type=code&scope=snsapi_login&state=wuye#wechat_redirect`
    }
  }
};
</script>

<style lang="less" scoped>
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
.account-login-contaienr {
  height: 100vh;
  padding-top: 40px;
  box-sizing: border-box;
}
.account-login-bd {
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .company-info-logo {
    height: 44px;
    margin-right: 20px;
  }
  .company-info-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
</style>