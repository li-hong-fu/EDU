<template>
  <div class="main-container">
    <div class="main-left">
      <div class="main-describe">基本信息</div>
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        label-width="80px"
        ref="ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="职业名称:" prop="name">
          <el-input v-model="ruleForm.name" minlength="10"></el-input>
        </el-form-item>
        <el-form-item label="职业描述:" prop="description">
          <el-input v-model="ruleForm.description" minlength="10"></el-input>
        </el-form-item>
        <el-form-item label="职业封面:" prop="image_url">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :limit="1"
            :http-request="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.image_url"
              :src="ruleForm.image_url"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="zhiyeEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-right">
      <div class="main-describe">职业路径</div>
      <draggable v-model="zhiye_path" @start="drag = true" @end="end">
        <el-card class="box-card" v-for="item in zhiye_path" :key="item.id">
          <div slot="header" class="clearfix">
            <div class="clearfix-title">
              <span>{{ item.name }}</span>
            </div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit">
                  <el-button type="text" @click="pathEdit(item)"
                    >编辑</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-delete">
                  <el-button type="text" @click="pathDetele(item.id)"
                    >删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <draggable
            v-model="item.course"
            group="people"
            @start="drag = true"
            @end="end"
          >
            <div
              class="text item"
              v-for="course in item.course"
              :key="course.id"
            >
              <div class="text item_content">{{ course.name }}</div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-folder-delete">
                    <el-button
                      type="text"
                      @click="zhiyeCourseDelete(course.zhiye_courseId)"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </draggable>
          <el-button
            class="add_section"
            icon="el-icon-edit"
            circle
            type="text"
            @click="zhiyeCourse(item.id)"
          >
            添加关联课程
          </el-button>
        </el-card>
      </draggable>
      <div class="add-chapters">
        <el-button type="text" icon="el-icon-edit" circle @click="pathAdd">
          添加路径
        </el-button>
        <el-dialog :title="pathForm.formBoxTitle" :visible.sync="dialogVisible">
          <el-form :label-position="labelPosition" :model="pathForm">
            <el-form-item label="路径名称">
              <el-input v-model="pathForm.name"></el-input>
            </el-form-item>
            <el-form-item label="路径描述">
              <el-input v-model="pathForm.description"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="pathSave">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuModel from "../models/qiniu";
import * as qiniu from "qiniu-js";
import draggable from "vuedraggable";
import zhiyeModel from "../models/zhiye";
import zhiyePathModel from "../models/zhiyePath";
import zhiyeCourseModel from "../models/zhiyeCourse";
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        description: "",
        image_url: ""
      },
      zhiye_path: [],
      pathForm: {
        dataIndex: null,
        formBoxID: null,
        formBoxTitle: "",
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 10, message: "长度最少10个字符", trigger: "blur" }
        ]
      },
      dialogVisible: false
    };
  },
  created() {
    let id = this.$route.params.id;
    zhiyeModel.indexItem(id).then(res => {
      this.ruleForm = res.data.message;
    });

    zhiyePathModel.index(id).then(res => {
      this.zhiye_path = res.data.message;
      this.zhiye_path.sort((a, b) => {
        return a.sort - b.sort;
      });
      this.zhiye_path.map(data => {
        data.course.sort((a, b) => {
          return a.sort - b.sort;
        });
      });
    });
  },
  methods: {
    handleAvatarSuccess(files) {
      let file = files.file;
      let name = file.name;
      let key = "test/" + Date.now() + "_" + name;
      let that = this;
      qiniuModel.qiniu().then(res => {
        let token = res.data.token;
        let domain = res.data.domain;
        let config = { useCdnDomain: true, region: null };
        let putExtra = {
          fname: "",
          params: {},
          mimeType: []
        };
        let observable = qiniu.upload(file, key, token, putExtra, config);
        observable.subscribe({
          next() {
            console.log(123123);
          },
          error(err) {
            console.log(err);
          },
          complete(data) {
            let image_url = domain + "/" + data.key;
            that.ruleForm.image_url = "http://" + image_url;
          }
        });
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    zhiyeEdit() {
      let id = this.$route.params.id;
      let name = this.ruleForm.name;
      let description = this.ruleForm.description;
      let image_url = this.ruleForm.image_url;
      let params = { name, description, image_url };
      if (!name || !description || !image_url) {
        this.$message.info("缺少必要参数!");
        return;
      }
      zhiyeModel.updated(id, params).then(res => {
        if (res.data.code == 200) {
          this.$message.success("编辑成功!");
          this.$router.push({ path: "/cop/zhiye" });
        }
      });
    },
    pathAdd() {
      this.dialogVisible = true;
      this.pathForm.formBoxTitle = "添加路径";
      this.pathForm.name = "";
      this.pathForm.description = "";
      this.pathForm.formBoxID = "";
      this.pathForm.dataIndex = "";
    },
    pathEdit(path) {
      this.dialogVisible = true;
      this.pathForm.formBoxTitle = "编辑路径";
      this.pathForm.formBoxID = path.id;
      this.pathForm.name = path.name;
      this.pathForm.description = path.description;
    },
    pathSave() {
      let zhiye_id = this.$route.params.id;
      let id = this.pathForm.formBoxID;
      let name = this.pathForm.name;
      let description = this.pathForm.description;
      let params = { zhiye_id, name, description };
      if (!name || !description) {
        this.$message.info("缺少必要参数!");
        return;
      }

      //编辑
      if (id) {
        zhiyePathModel.updated(id, params).then(res => {
          if (res.data.code === 200) {
            this.$message.success("编辑成功!");
            this.dialogVisible = false;
            location.reload();
          }
        });
        //添加
      } else {
        zhiyePathModel.create(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success("添加成功!");
            this.dialogVisible = false;
            location.reload();
          }
        });
      }
    },
    pathDetele(id) {
      zhiyePathModel.delete(id).then(res => {
        this.$message.success(res.data.message);
        location.reload();
      });
    },
    zhiyeCourse(path_id) {
      this.$prompt("请输入课程ID", "关联课程", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let zhiye_id = this.$route.params.id;
          let params = { zhiye_id, path_id, value };
          if (!value) {
            this.$message.info("缺少必要参数");
            return;
          }
          zhiyeCourseModel.created(params).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              location.reload();
            } else {
              this.$message.info(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("取消输入");
        });
    },
    zhiyeCourseDelete(id) {
      zhiyeCourseModel.delete(id).then(res => {
        this.$message.success(res.data.message);
        location.reload();
      });
    },
    end() {
      let zhiye_path = this.zhiye_path;
      zhiyeCourseModel.sort({ zhiye_path }).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    draggable
  }
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .main-describe {
    width: 630px;
    margin: 30px auto;
    text-align: left;
    padding-left: 20px;
    border-left: 2px solid #999999;
    font-size: 18px;
    font-family: monospace;
    font-weight: 600;
  }
}
.main-left {
  width: 45%;
  text-align: left;
  .main-describe {
    margin-top: 30px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    background: #ffffff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.main-right {
  width: 45%;
  .main-describe {
    margin: 30px 0;
  }
  .el-card {
    .el-card__header {
      .clearfix {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    /deep/.el-card__body {
      padding: 0 20px;
      .text.item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 10px 10px;
      }
      .text.item:hover {
        cursor: pointer;
        box-shadow: 1px 1px 10px 2px #dddddd;
        transition: all 0.15s;
      }
      .add_section {
        float: right;
      }
      .el-drawer__wrapper {
        .el-drawer__body {
          .el-form-item {
            margin: 0 20px;
            text-align: left;
            .add_section_button {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
  .add-chapters {
    background: #ffffff;
    margin-top: 5px;
    box-shadow: 1px 1px 10px 2px #dddddd;
    border-radius: 5px;
    text-align: right;
    padding: 0 20px;
    /deep/.el-dialog {
      text-align: left;
    }
  }
}
.box-card {
  margin-bottom: 5px;
}
</style>
