<template>
  <div class="article-list">
    <List
      :labels="labels"
      :hasCover="true"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      :cacheData="cacheData"
      @getCurrentItem="getCurrentItem"
    >
      <template slot="only" slot-scope="{scopeProp}">
        <router-link
          style="margin-right: 8px;"
          :to="{name: 'EditArticle', params: {article: scopeProp.row}}"
        >
          <el-button type="info">编辑</el-button>
        </router-link>
        <el-button type="danger" @click="handleDelete(scopeProp.$index, scopeProp.row)">删除</el-button>
      </template>
    </List>
  </div>
</template>

<script>
import article from '@/api/article.js';
import timeline from '@/api/timeline.js';
import List from '@/components/List';
export default {
  created() {
    article
      .getArticleLists()
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
  components: {
    List
  },
  data() {
    return {
      search: '',
      tableData: [],
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
      labels: {
        created_at: '日期',
        total_char: '字数',
        browse: '访问量',
        tag: '标签',
        title: '标题'
      }
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          article.deleteArticle(row.article_id).then(res => {
            if (res.data && res.data.success) {
              this.$message.success(res.data.msg);
              this.tableData.splice(index, 1); //删除纪录
              this.amount--;
              timeline.createOneTimeline({
                title: row.title,
                status: '删除文章',
                description: row.description
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
        .getArticleLists({ page })
        .then(res => {
          if (res.data && res.data.data) {
            this.tableData = res.data.data; //更新显示数据
            this.cacheData.set(page, res.data.data); //缓存每次获取到的数据
          }
        })
    }
  }
};
</script>

<style scoped>
</style>