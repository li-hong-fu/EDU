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
        <el-form-item label="广告名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="slug:" prop="slug">
          <el-input v-model="ruleForm.slug"></el-input>
        </el-form-item>
        <el-form-item
          label="尺寸:宽"
          prop="width"
          style="display:inline-block;width:45%;margin-right:10%;"
        >
          <el-input v-model="ruleForm.width"></el-input>
        </el-form-item>
        <el-form-item
          label="尺寸:高"
          prop="height"
          style="display:inline-block;width:45%"
        >
          <el-input v-model="ruleForm.height"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handAdd">保存编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-right">
      <div class="main-describe">广告-物料</div>
      <el-card class="box-card">
        <draggable v-model="material" @start="drag = true" @end="end">
          <div class="text item"
            v-for="(item,index) in material"
            :key="item.id">
            <div class="text item_content">
              <i class="el-icon-s-help"></i> {{item.materiel_name}}
            </div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-folder-delete">
                  <el-button type="text" @click="materialDelete(item.id,index)"
                    >删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </draggable>
      </el-card>
      <div class="AddButton">
        <el-button type="text" @click="materialAdd"
          >添加物料 <i class="el-icon-circle-plus"></i
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import advertiseModel from "../models/advertise";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        slug: "",
        width: "",
        height: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        slug: [
          { required: true, message: "请输入课程提示", trigger: "blur" },
          { min: 3, message: "长度最少10个字符", trigger: "blur" }
        ]
      },
      material: []
    };
  },
  created() {
    let id = this.$route.params.id;
    advertiseModel.indexItem(id).then(res => {
      this.ruleForm = res.data.message;
    });
    advertiseModel.showAdvertiseMaterial(id).then(res => {
      this.material = res.data.message
      this.material.sort((a, b) => {
        return a.sort - b.sort;
      });
    })
  },
  methods: {
    handAdd() {
      let id = this.$route.params.id;
      let name = this.ruleForm.name;
      let slug = this.ruleForm.slug;
      let width = this.ruleForm.width;
      let height = this.ruleForm.height;
      let params = { name, slug, width, height };
      if (!name || !slug || !width || !height) {
        this.$message.error("请填写好广告详情");
        return;
      }
      advertiseModel.updated(id, params).then(res => {
        this.$message.success(res.data.message);
        this.$router.push({ name: "Advertise" });
      });
    },
    materialAdd() {
      let id = this.$route.params.id;
      this.$prompt("请输入物料ID", "添加关联物料", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if(!value){
            this.$message.error('请输入广告ID')
            return
          }
          advertiseModel.advertiseMaterial({id,value}).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.message)
              location.reload()
            }else{
              this.$message.info(res.data.message)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    materialDelete(id,index) {
      advertiseModel.deleteAdvertiseMaterial(id).then(res => {
        if(res.data.code == 200){
          this.$message.success(res.data.message)
          this.material.splice(index, 1)
        }
      })
    },
    end() {
      let material = this.material;
      console.log(material)
      advertiseModel.sort({material}).then(res => {
        console.log(res)
      })
      
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
  .main-left {
    width: 45%;
    text-align: left;
  }
  .main-right {
    width: 45%;
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
    .AddButton {
      background: #ffffff;
      border-radius: 5px;
      border: 1px solid #dddddd;
      text-align: right;
      padding: 0 20px;
      .text.item_content {
        padding: 10px 0;
      }
    }
  }
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
</style>
