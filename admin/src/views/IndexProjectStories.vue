<template>
  <div class="main-right">
    <div class="main-describe">项目故事</div>
    <draggable v-model="stories" @start="drag = true" @end="end">
      <el-card class="box-card" v-for="(item, index) in stories" :key="item.id">
        <div slot="header" class="clearfix">
          <div class="clearfix-title">
            <span>{{ item.name }}</span>
          </div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit">
                <el-button type="text" @click="handStorieEdit(item)"
                  >编辑</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-folder-delete">
                <el-button type="text" @click="handStorieDelete(item, index)"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <draggable
          v-model="item.tasks"
          group="people"
          @start="drag = true"
          @end="end"
        >
          <div class="text item" v-for="tasks in item.tasks" :key="tasks.id">
            <div class="text item_content">{{ tasks.name }}</div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-view">
                  <el-button type="text" @click="tasksContent(tasks)"
                    >内容</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-delete">
                  <el-button type="text" @click="tasksDelete(tasks)"
                    >删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </draggable>
        <el-button
          class="add_tasks"
          icon="el-icon-folder-add"
          circle
          type="text"
          @click="handTasksAdd(item)"
        >
          添加任务
        </el-button>
      </el-card>
    </draggable>
    <div class="add-stories">
      <el-button type="text" icon="el-icon-edit" circle @click="handStorieAdd">
        添加故事
      </el-button>
      <el-dialog :title="formBoxTitle" :visible.sync="dialogVisible">
        <el-form :label-position="labelPosition" :model="storieFrom">
          <el-form-item label="故事名称">
            <el-input v-model="storieFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="故事内容">
            <el-input v-model="storieFrom.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handStorieSave">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="tasksForm"
      >
        <el-form-item label="任务名称">
          <el-input v-model="tasksForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任务难度" style="width:40%;display:inline-block;">
          <el-select v-model="tasksLevelValue" placeholder="请选择">
            <el-option
              v-for="level in tasksForm.level"
              :key="level.value"
              :label="level.label"
              :value="level.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务平台" style="width:40%;display:inline-block;">
          <el-select v-model="tasksPlatformValue" placeholder="请选择">
            <el-option
              v-for="platform in tasksForm.platform"
              :key="platform.value"
              :label="platform.label"
              :value="platform.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容">
          <quill-editor
            class="quill-editor"
            v-model="tasksForm.content"
            ref="myQuillEditor"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="add_tasks_button"
            @click="handTasksEdit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import storieModel from "../models/stories";
import tasksModel from "../models/tasks";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }]
];
export default {
  name: "Stories",
  data() {
    return {
      labelPosition: "top",
      stories: [],
      formBoxTitle: "",
      storieFrom: {
        name: "",
        content: "",
        id: null
      },
      tasksForm: {
        id: "",
        name: "",
        level: [
          {
            value: 1,
            label: "入门"
          },
          {
            value: 2,
            label: "初级"
          },
          {
            value: 3,
            label: "中级"
          },
          {
            value: 4,
            label: "高级"
          }
        ],
        platform: [
          {
            value: 1,
            label: "API"
          },
          {
            value: 2,
            label: "前台"
          },
          {
            value: 3,
            label: "后台"
          },
          {
            value: 4,
            label: "小程序"
          }
        ],
        content: ""
      },
      tasksLevelValue: "",
      tasksPlatformValue: "",
      dialogVisible: false,
      drawer: false,
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
    storieModel.index(id).then(res => {
      this.stories = res.data.message;
      this.stories.sort((a, b) => {
        return a.sort - b.sort;
      });
      this.stories.map(data => {
        data.tasks.sort((a, b) => {
          return a.sort - b.sort;
        });
      });
    });
  },
  methods: {
    handStorieAdd() {
      this.dialogVisible = true;
      this.formBoxTitle = "添加故事";
      this.storieFrom.name = "";
      this.storieFrom.content = "";
      this.storieFrom.id = null;
    },
    handStorieEdit(row) {
      this.dialogVisible = true;
      this.formBoxTitle = "编辑故事";
      this.storieFrom.name = row.name;
      this.storieFrom.content = row.content;
      this.storieFrom.id = row.id;
    },
    handStorieSave() {
      let project_id = this.$route.params.id;
      let id = this.storieFrom.id;
      let name = this.storieFrom.name;
      let content = this.storieFrom.content;
      let params = { project_id, name, content };
      if (!name || !content) {
        this.$message.error("缺少必要参数!");
        return;
      }

      if (id) {
        storieModel.updated(id, params).then(res => {
          if (res.data.code === 200) {
            this.$message.success("编辑成功!");
            location.reload();
          }
        });
      } else {
        storieModel.created(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success("添加成功!");
            location.reload();
          }
        });
      }
    },
    handStorieDelete(row, index) {
      storieModel.delete(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          this.stories.splice(index, 1);
        }
      });
    },
    handTasksAdd(row) {
      let story_id = row.id;
      let project_id = this.$route.params.id;
      this.$prompt("请输入任务名", "添加任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.error("缺少必要参数!");
            return;
          }
          let params = { value, story_id, project_id };
          tasksModel.created(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success("成功添加任务");
              location.reload();
            }
          });
        })
        .catch(() => {
          this.$message.info("取消输入");
        });
    },
    tasksContent(row) {
      this.drawer = true;
      this.tasksForm.id = row.id;
      this.tasksForm.name = row.name;
      this.tasksLevelValue = row.level;
      this.tasksPlatformValue = row.platform;
      this.tasksForm.content = row.content;
    },
    handTasksEdit() {
      let id = this.tasksForm.id;
      let name = this.tasksForm.name;
      let level = this.tasksLevelValue;
      let platform = this.tasksPlatformValue;
      let content = this.tasksForm.content;
      if (!name || !level || !platform || !content) {
        this.$message.error("缺少必要参数!");
        return;
      }
      let params = { name, level, platform, content };
      tasksModel.updated(id, params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("修改成功!");
          this.drawer = false;
          location.reload();
        }
      });
    },
    tasksDelete(row) {
      tasksModel.delete(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          location.reload();
        }
      });
    },
    end() {
      let stories = this.stories;
      tasksModel.sort({ stories }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
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
.main-right {
  width: 45%;
  .box-card {
    .el-card__header {
      .clearfix {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .text.item {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
    }
    .add_tasks {
      float: right;
    }
  }
  .add-stories {
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
.main-describe {
  text-align: left;
  padding-left: 20px;
  border-left: 2px solid #999999;
  font-size: 18px;
  font-family: monospace;
  font-weight: 600;
  margin-bottom: 20px;
}
.el-drawer__wrapper {
  .el-drawer__body {
    .el-form-item {
      margin: 0 20px;
      text-align: left;
      .add_tasks_button {
        margin-top: 10px;
      }
    }
  }
}
</style>
