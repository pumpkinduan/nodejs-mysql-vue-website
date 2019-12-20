<template>
  <div class="category">
    <h1 class="category-header">分类</h1>
    <p class="category-description">目前共计 5 个分类</p>
    <ol class="category-nav">
      <li class="category-nav-item">
        <router-link to="/">
          <span class="category-nav-item-name">category-nav-item</span>
          <span class="category-nav-item-count">(7)</span>
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "category"
};
</script>

<style scoped>
.category {
  padding: 2rem 1rem;
  font-size: 1rem;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
}
.category .category-header {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
.category .category-description {
  color: #666;
  padding: 1rem 0;
}
.category .category-nav {
  text-align: left;
  padding: 0 1rem;
}
.category .category-nav .category-nav-item {
  list-style-type: circle;
  padding: 0.8rem 0;
}
.category .category-nav .category-nav-item a .category-nav-item-name {
  color: rgb(153, 47, 9);
}
.category .category-nav .category-nav-item a .category-nav-item-name:hover {
  color: #ff4d00;
}

.category .category-nav .category-nav-item a .category-nav-item-count {
  color: #ccc;
}
</style>