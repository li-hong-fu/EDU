<template>
  <div class="page-container">
    <h1>账号安全</h1>
    <el-divider></el-divider>
    <div class="binding-container">
      <div class="binding-item">
        <div class="item_title">手机号</div>
        <div class="item_state">
          <el-tag
            :type="userInfo.phone == null? 'danger':'success'"
            class="item_state">
            {{userInfo.phone == null? '未绑定':'已绑定'}}
          </el-tag>
        </div>
        <div class="item_button">
          <el-button
            type="text"
            v-if="userInfo.phone == null"
            @click="phoneCreate">绑定手机</el-button>
          <el-button
            type="text"
            v-if="userInfo.phone != null"
            @click="relievePhone">解绑</el-button>
        </div>
      </div>
      <div class="binding-item">
        <div class="item_title">微信</div>
        <div class="item_state">
          <el-tag
            :type="userInfo.unionid == null? 'danger':'success'"
            class="item_state">
            {{userInfo.unionid == null? '未绑定':'已绑定'}}
          </el-tag>
        </div>
        <div class="item_button">
          <el-button
            type="text"
            v-if="userInfo.unionid == null"
            @click="getWechat">绑定微信</el-button>
          <el-button
            type="text"
            v-if="userInfo.unionid != null"
            @click="relieveWechat">解绑</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="绑定手机" :visible.sync="dialogFormVisible">
      <div class="login-form-phone">
        <el-form
          :model="smsFrom"
          :rules="smsRules"
          status-icon
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
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="submitForm('smsFrom')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userModel from "../models/users";
import wechatModel from "../models/wechat";
export default {
  data() {
    return {
      userInfo:[],
      dialogFormVisible:false,
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
    }
  },
  created() {
    let id = localStorage.getItem("user_id");
    userModel.userInfo(id).then(res => {
      this.userInfo = res.data.message[0];
    })

    let code = this.$route.query.code;
    wechatModel.wechatBind(id,{code}).then(res => {
      if(res.data.code ==200){
        this.$message.success(res.data.message)
        location.reload()
      }
    })
  },
  methods: {
    phoneCreate() {
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      let id = localStorage.getItem("user_id");
      let phone = this.smsFrom.phone;
      let code = this.smsFrom.code;
      this.$refs[formName].validate(valid => {
        if (valid) {
          userModel.phoneBind(id,{phone,code}).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.message);
              this.dialogFormVisible = false;
              location.reload()
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
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=wxf31cb4f589ed68c3&redirect_uri=http://edu-www.aitschool.com/api/user/security&response_type=code&scope=snsapi_login&state=wuye#wechat_redirect`
    },
    relievePhone() {
      let id = localStorage.getItem("user_id");
      this.$confirm('解绑后你将无法使用手机登录此账号, 你确定要解绑吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userModel.relievePhone(id).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.message)
            location.reload()
          }else{
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    relieveWechat() {
      let id = localStorage.getItem("user_id");
      this.$confirm('解绑后你将无法使用微信登录此账号, 你确定要解绑吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        wechatModel.relieveWechat(id).then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.message)
            location.reload()
          }else{
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
  },
}
</script>

<style lang="less" scoped>
h1{
  margin: 0;
  font-size: 24px;
}
.binding-container{
  width: 50%;
  margin: 0 auto;
  line-height: 100px;
  text-align: left;
  .binding-item{
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: monospace;
    .item_title{
      width: 100px;
      font-size: 18px;
    }
    .item_state{
      flex: 1;
      font-size: 18px;
    }
    button{
      font-size: 18px;
      font-family: monospace;
    }
  }
}
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
</style>