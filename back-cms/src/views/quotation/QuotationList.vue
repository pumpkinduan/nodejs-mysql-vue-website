<template>
  <div class="quotation-list">
    <List
      :labels="labels"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      :cacheData="cacheData"
      @getCurrentItem="getCurrentItem"
    >
      <template slot="only" slot-scope="{scopeProp}">
        <el-button type="info"  @click="handleEdit(scopeProp.$index, scopeProp.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scopeProp.$index, scopeProp.row)">删除</el-button>
      </template>
      <template>
        <el-dialog title="每日一句编辑" :visible.sync="dialogFormVisible">
          <el-form :model="tableData[curIndex]">
            <el-form-item
              :label="val"
              label-width="80px"
              v-for="(val, attr) in labels"
              :key="attr"
              :rules="[{required: true, message: `${val}不能为空`}]"
              :prop="attr"
            >
              <el-input
                v-model="tableData[curIndex][attr]"
                autocomplete="off"
                :disabled="attr == 'q_id'"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleConfirm">确认更新</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </template>
    </List>
  </div>
</template>

<script>
import api from "@/api/quotation.js";
import List from "@/components/List";
export default {
  components: {
    List
  },
  created() {
    api
      .getQuotationLists()
      .then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
          this.amount = res.data.meta.count;
          this.pageSize = res.data.meta.pageSize;
          this.cacheData.set(1, res.data.data); //缓存第一页数据 {1 => [...]}
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      tableData: [{//防止初始时tableData[curIndex][attr]报错
        created_at: "",
        q_id: "",
        author: "",
        content: ""
      }],
      curIndex: 0,
      dialogFormVisible: false,
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
      labels: {
        created_at: "创建时间",
        q_id: "id",
        author: "作者",
        content: "内容"
      }
    };
  },
  methods: {
    submit(data) {
      api
        .updateQuotation(this.id, data)
        .then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: res.data.msg,
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleConfirm() {
      this.submit() 
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.curIndex = index;
      this.id = row.q_id;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条语录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteQuotation(row.q_id).then(res => {
            if (res.data && res.data.success) {
              this.$message.success(res.data.msg);
              this.tableData.splice(index, 1); //删除纪录
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getCurrentItem(page) {
      //获取当前页的数据
      if (this.cacheData.has(page)) {
        //若是已经缓存数据了则不必发送网络请求
        this.tableData = this.cacheData.get(page); //从缓存中取数据
        return;
      }
      api
        .getQuotationLists({ page })
        .then(res => {
          if (res.data && res.data.data) {
            this.tableData = res.data.data; //更新显示数据
            this.cacheData.set(page, res.data.data); //缓存每次获取到的数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>