<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >创建技能</el-button
    >
    <el-table
      ref="singleTable"
      class="form-list"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePagination"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import stackModel from "../models/stack";
export default {
  name: "stack",
  data() {
    return {
      tableData: [],
      total: null,
      totalPage: null,
      pageSizes: [20, 30, 40, 50],
      pageSize: 20,
      currentPage: 1
    };
  },
  created() {
    let currentPage = this.currentPage;
    let pageSize = this.pageSize;
    let params = { currentPage, pageSize }
    stackModel.showStack(params).then(res => {
      this.tableData = res.data.message;
      this.total = res.data.total;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      val = val || 20
      let pageSize = this.pageSize = val
      this.totalPage = Math.ceil(this.total / this.pageSize)
      let currentPage = this.currentPage
      let params = { currentPage, pageSize }
      stackModel.showStack(params).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.total;
      });
    },
    handlePagination(val) {
      console.log(`当前页: ${val}`);
      let currentPage = this.currentPage = val || 1
      let  params = { currentPage }
      stackModel.showStack(params).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.total;
      });
    },
    handAdd() {
      this.$router.push({ path: "/sqb/stack/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/sqb/stack/edit/" + row.id });
    },
    handleDelete(index, row) {
      stackModel.deleteStack(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          this.tableData.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  .create-button {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
