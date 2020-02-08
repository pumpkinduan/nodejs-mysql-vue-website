<template>
  <div class="footer">
    <ul>
      <li class="about">
        <h3>Simple Word</h3>
        <p class="hitokoto">{{hitokoto}}</p>
        <section class="copyright">
          <span>@ 南瓜的时光机</span>
          <span class="line"></span>
          <span class="author">
            Created by
            <a href="#">Pumpkin</a>
          </span>
          <p>湘ICP备20002688号-1</p>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '@/api/hitokoto.js';
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
      api
        .getHitokoto()
        .then(res => {
          if (res.data) {
            this.hitokoto = res.data.hitokoto;
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
<style scoped>
.footer {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  padding: 1.5rem 2rem 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
}
/* --底部关于开始-- */
.footer .about h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 500;
}
.footer .about p {
  color: #666;
  font-size: 1rem;
  margin: 1.5rem 0;
}
.footer .about .copyright {
  color: #777;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
.footer .about .copyright span {
  word-spacing: -2px;
}
.footer .about .copyright .line {
  border-left: 1px solid #ccc;
  padding: 1px 5px;
  margin-left: 15px;
}
.footer .about .copyright .author a {
  border-bottom: 1px dotted #666;
  transition: color 0.4s;
  margin-left: 5px;
}
.footer .about .copyright .author a:hover {
  color: #ff450085;
}
.footer .about .hitokoto {
  transition: all 0.3s;
}
.footer .about .hitokoto:hover {
  color: #ff450085;
}
/* --底部关于结束-- */
</style>