<template>
  <div class="publish-quotation">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'title' ? 180 : 100"
        fixed
        v-for="(value, attr, index) in labels"
        :key="index"
      ></el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="dialogFormVisible = true">添加</el-button>
          <el-button type="primary" @click="submit" :disabled="flag">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="每日一句添加" :visible.sync="dialogFormVisible">
      <el-form :model="tableData[0]">
        <el-form-item
          :label="val"
          label-width="80px"
          v-for="(val, attr) in labels"
          :key="attr"
          :rules="[{required: true, message: `${val}不能为空`}]"
          :prop="attr"
        >
          <el-input v-model="tableData[0][attr]" autocomplete="off">{{ attr }}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Publish from "@/components/Publish";
import api from "@/api/quotation.js";
export default {
  components: {
    Publish
  },
  data() {
    return {
      dialogFormVisible: false,
      flag: true, //是否可发布
      labels: {
        author: "作者",
        content: "内容"
      },
      tableData: [
        {
          author: "",
          content: ""
        }
      ]
    };
  },
  methods: {
    handleConfirm() {
      if (this.tableData[0].author &&this.tableData[0].content) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      this.dialogFormVisible = false;
    },
    submit(data) {
      api
        .publishQuotation(data)
        .then(res => {
          this.resetDialog();
          this.$message({
            message: res.data.msg,
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetDialog() {
      for (var i in this.tableData[0]) {
        this.tableData[0][i] = "";
      }
    }
  }
};
</script>
<style scoped>
.publish-quotation {
  height: 100%;
}
</style>