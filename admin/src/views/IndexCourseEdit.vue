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
        <el-form-item
          label="课程名称:"
          prop="name"
          style="display:inline-block;width:45%;margin-right:10%;"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="副标题:"
          prop="name"
          style="display:inline-block;width:45%"
        >
          <el-input v-model="ruleForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="课程提示:" prop="tips">
          <el-input v-model="ruleForm.tips" minlength="10"></el-input>
        </el-form-item>
        <el-form-item label="课程描述:" prop="description">
          <el-input v-model="ruleForm.description" minlength="10"></el-input>
        </el-form-item>
        <el-form-item label="课程封面:" prop="image_url">
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
          <el-button type="primary" @click="handEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-right">
      <div class="main-describe">课程章节</div>
      <draggable v-model="chapter" @start="drag = true" @end="end">
        <el-card class="box-card" v-for="item in chapter" :key="item.id">
          <div slot="header" class="clearfix">
            <div class="clearfix-title">
              <i class="el-icon-s-flag"></i>
              <span>{{ item.name }}</span>
            </div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit">
                  <el-button type="text" @click="chapterEdit(item)"
                    >编辑</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-delete">
                  <el-button type="text" @click="chapterDelete(item)"
                    >删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <draggable
            v-model="item.section"
            group="people"
            @start="drag = true"
            @end="end"
          >
            <div
              class="text item"
              v-for="section in item.section"
              :key="section.id"
            >
              <div class="text item_content">{{ section.name }}</div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-view">
                    <el-button type="text">内容</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit">
                    <el-button type="text" @click="sectionEdit(section)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-folder-delete">
                    <el-button type="text" @click="sectionDelete(section)"
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
            @click="showAddSection(item.id)"
            >添加节</el-button
          >
          <el-drawer
            :visible.sync="dialog"
            :show-close="false"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="sectionsForm"
            >
              <el-form-item label="小节名称">
                <el-input v-model="sectionsForm.name"></el-input>
              </el-form-item>
              <el-form-item label="视频地址">
                <el-input v-model="sectionsForm.video_url"></el-input>
              </el-form-item>
              <el-form-item label="课程内容">
                <quill-editor
                  class="quill-editor"
                  v-model="sectionsForm.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="add_section_button"
                  @click="sectionAdd"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-drawer>
        </el-card>
      </draggable>
      <div class="add-chapters">
        <el-button type="text" icon="el-icon-edit" circle @click="chapterAdd"
          >添加章</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import courseModel from "../models/course";
import courseChapterModel from "../models/courseChapter";
import courseSectionModel from "../models/courseSection";
import qiniuModel from "../models/qiniu";
import * as qiniu from "qiniu-js";

import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  // [{'header': 1}, {'header': 2}],
  [{ list: "ordered" }, { list: "bullet" }],
  // [{'script': 'sub'}, {'script': 'super'}],
  // [{'indent': '-1'}, {'indent': '+1'}],
  // [{'direction': 'rtl'}],
  // [{'size': ['small', false, 'large', 'huge']}],
  // [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{ color: [] }, { background: [] }],
  // [{'font': []}],
  [{ align: [] }]
  // ['clean'],
  // ['link', 'image', 'video'],
];

import draggable from "vuedraggable";

export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        short_name: "",
        tips: "",
        description: "",
        image_url: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        tips: [
          { required: true, message: "请输入课程提示", trigger: "blur" },
          { min: 3, message: "长度最少10个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 10, message: "长度最少10个字符", trigger: "blur" }
        ]
      },
      dialog: false,
      section_id: "",
      chapter: [],
      sectionsForm: {
        name: "",
        video_url: "",
        content: ""
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    courseModel.courseShow(id).then(res => {
      this.ruleForm = res.data.message;
    });

    courseSectionModel.getSection(id).then(res => {
      this.chapter = res.data.message;
      this.chapter.sort((a, b) => {
        return a.sort - b.sort;
      });
      this.chapter.map(data => {
        data.section.sort((a, b) => {
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
    handEdit() {
      let id = this.$route.params.id;
      let name = this.ruleForm.name;
      let short_name = this.ruleForm.short_name;
      let tips = this.ruleForm.tips;
      let description = this.ruleForm.description;
      let image_url = this.ruleForm.image_url;

      if (!name || !short_name || !tips || !description || !image_url) {
        this.$message.error("缺少必要参数");
        return;
      }

      let params = { name, short_name, tips, description, image_url };
      courseModel.courseEdit(id, params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("修改成功!");
          this.$router.push({ path: "/cop/course" });
        }
      });
    },
    chapterAdd() {
      this.$prompt("请输入章的名称", "添加章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let course_id = this.$route.params.id;
          courseChapterModel.createChapter({ course_id, value }).then(res => {
            if (res.data.code === 200) {
              this.$message.success("添加成功!");
              location.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    chapterEdit(row) {
      let id = row.id;
      this.$prompt("请编辑章的名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.info("你还没有输入");
            return;
          }
          courseChapterModel.updateChapter(id, { name: value }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("编辑成功!");
              location.reload();
            }
          });
        })
        .catch(() => {
          this.$message.info("取消输入");
        });
    },
    chapterDelete(row) {
      courseChapterModel.deleteChapter(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          location.reload();
        }
      });
    },
    showAddSection(id) {
      this.dialog = true;
      this.section_id = id;
    },
    sectionAdd() {
      let id = this.section_id;
      let name = this.sectionsForm.name;
      let video_url = this.sectionsForm.video_url;
      let content = this.sectionsForm.content;
      let params = { id, name, video_url, content };
      courseSectionModel.createSection(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("添加成功!");
          location.reload();
        }
      });
    },
    sectionEdit(row) {
      let id = row.id;
      this.$prompt("请编辑节的名称", "第一章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.info("你还没有输入");
            return;
          }
          courseSectionModel.updateSection(id, { name: value }).then(res => {
            console.log(res);
            this.$message.success("编辑成功!");
            location.reload();
          });
        })
        .catch(() => {
          this.$message.info("取消输入");
        });
    },
    sectionDelete(row) {
      courseSectionModel.deleteSection(row.id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          location.reload();
        }
      });
    },
    end() {
      let chapter = this.chapter;
      courseChapterModel.sortChapter({ chapter }).then(res => {
        console.log(res.data.message);
      });
    }
  },
  components: {
    "quill-editor": quillEditor,
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
  }
}
.el-dropdown {
  cursor: pointer;
}
.box-card {
  margin-bottom: 5px;
}
</style>
