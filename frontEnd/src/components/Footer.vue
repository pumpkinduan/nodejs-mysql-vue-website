<template>
  <div class="footer">
    <ul>
      <li class="about">
        <h3>Simple Word</h3>
        <p class="hitokoto">{{hitokoto}}</p>
        <div class="copyright">
          <span>@ 南瓜的时光机</span>
          <span class="line"></span>
          <span class="author">
            Created by
            <a href="#">Pumpkin</a>
          </span>
          <p>湘ICP备20002688号-1</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getHitokoto} from '@/api/index.js';
export default {
  data() {
    return {
      timer: null,
      hitokoto:
        'life is beautiful like summer flowers and death like autumn leaves'
    };
  },
  created() {
    this.getHitokoto();
    setInterval(() => {
      this.getHitokoto();
    }, 6500);
  },
  methods: {
    getHitokoto() {
      //第三方获取
     getHitokoto()
        .then(res => {
          if (res) {
            this.hitokoto = res.hitokoto;
          }
        })
        .catch(() => {
          this.hitokoto =
            "life is beautiful like summer flowers and death like autumn leaves";
        });
    }
  }
};
</script>  
<style scoped lang="less">
.footer {
  background: #eee;
  position: relative;
  width: 100%;
  padding: 2px 20px;
  text-align: center;
  color: #555;
}
/* --底部关于开始-- */
.footer .about h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 500;
}
.footer .about p {
  margin: 15px 0;
  font-size: 1.1rem;
}
.footer .about .copyright {
  margin-bottom: 10px;
  font-size: 1rem;
}
.footer .about .copyright span {
  word-spacing: -2px;
}
.footer .about .copyright .line {
  border-left: 1px solid #ddd;
  padding: 1px 2px;
  margin-left: 6px;
}
.footer .about .copyright .author a {
  border-bottom: 1px dotted #f2f2f2;
  transition: color 0.4s;
  margin-left: 5px;
  color: @blue1;
}
.footer .about .copyright .author a:hover {
  color: @orange;
}
.footer .about .copyright p {
  color: #888;
}
.footer .about .hitokoto {
  transition: all 0.3s;
}
.footer .about .hitokoto:hover {
  color: @orange;
}
@media screen and (max-width: 768px){
    .footer {
      color: @baseFontColor;
    }
}
/* --底部关于结束-- */
</style>