<template>
  <div class="main-left">
    <div class="main-describe">项目版本</div>
    <el-card class="box-card">
      <draggable v-model="versions" @start="drag = true" @end="end">
        <div class="text item" v-for="(item, index) in versions" :key="item.id">
          <div class="text item_content">{{ item.name }}</div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-folder-delete">
                <el-button type="text" @click="handEdit(item)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-folder-delete">
                <el-button type="text" @click="handDelete(item, index)"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </draggable>
      <el-button
        class="add_version"
        icon="el-icon-folder-add"
        circle
        type="text"
        @click="handAdd"
      >
        添加版本
      </el-button>
      <el-dialog :title="formBoxTitle" :visible.sync="dialogVisible">
        <el-form :label-position="labelPosition" :model="storieFrom">
          <el-form-item label="故事名称">
            <el-input v-model="storieFrom.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handSave">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import versionModel from "../models/versions";
export default {
  name: "Version",
  data() {
    return {
      labelPosition: "top",
      formBoxTitle: "",
      dialogVisible: false,
      versions: [],
      storieFrom: {
        id: null,
        name: ""
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    versionModel.index(id).then(res => {
      this.versions = res.data.message;
      this.versions.sort((a, b) => {
        return a.sort - b.sort;
      });
    });
  },
  methods: {
    handAdd() {
      this.dialogVisible = true;
      this.formBoxTitle = "添加版本";
      this.storieFrom.name = "";
    },
    handEdit(row) {
      this.dialogVisible = true;
      this.formBoxTitle = "修改版本";
      this.storieFrom.id = row.id;
      this.storieFrom.name = row.name;
    },
    handSave() {
      let id = this.storieFrom.id;
      let project_id = this.$route.params.id;
      let name = this.storieFrom.name;
      if (!name) {
        this.$message.error("缺少必要参数!");
        return;
      }
      if (id) {
        versionModel.updated(id, { project_id, name }).then(res => {
          if (res.data.code === 200) {
            this.$message.success("修改成功!");
            location.reload();
          }
        });
      } else {
        versionModel.created({ project_id, name }).then(res => {
          if (res.data.code === 200) {
            this.$message.success("添加成功!");
            location.reload();
          }
        });
      }
      console.log(id, project_id, name);
    },
    handDelete(row, index) {
      versionModel.delete(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          this.versions.splice(index, 1);
        }
      });
    },
    end() {
      let versions = this.versions;
      versionModel.sort({ versions }).then(res => {
        this.$message.success(res.data.message);
      });
    }
  },
  components: {
    draggable
  }
};
</script>

<style lang="less" scoped>
.main-left {
  width: 45%;
  .box-card {
    .text.item {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
    }
    .add_version {
      float: right;
    }
    .el-dialog__wrapper {
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
</style>
