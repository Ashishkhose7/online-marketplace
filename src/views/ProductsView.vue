<script setup>
    import { computed, onMounted } from 'vue';
    import { useStore } from '../stores/index'
    import { ref } from 'vue';

    const appStore = useStore();

      onMounted(()=>{
        appStore.fetchProducts()
      })
      
      const productlist = computed(() => {
        return appStore.products
      });

      const favoritedIndices = ref([]);

      const toggleHeart = (index) => {
        if (favoritedIndices.value.includes(index)) {
          favoritedIndices.value = favoritedIndices.value.filter(i => i !== index);
        } else {
          favoritedIndices.value.push(index);
        }
      };



</script>

<template>
<section class="section__prod" id="vegetable">
  <div class="container">
    <div class="prod__list">
      <div v-if="productlist" class="prod__item" v-for="product,index in productlist">
        <div class="prod__item__wrap text-center flex flex-col gap-0 justify-between py-3 px-1">
          <a href="" class="prod__img">
            <img :src="product.image" alt="" class="h-[130px] w-[100%]">
          </a>
          <del class="text-start mx-3 mt-2 inline-block float-start"><i class='bx bxs-star text-yellow-400 mr-[2px]'></i>{{ Math.round(product.rating.rate) }} ({{ product.rating.count }})</del>
          <div class="prod__content">
            <h3 class="prod__name">
              <a href="">{{product.title}}</a>
            </h3>
            <div class="prod__price flex justify-between items-center">
              <ins>&#8377{{ product.price }}</ins>
              <ins class="cursor-pointer"><i @click="toggleHeart(index)" :class="favoritedIndices.includes(index) ? 'bx bxs-heart text-red-500':'bx bx-heart'"></i></ins>
              <!-- <del class="text-xs inline-block ratings"><i class='bx bxs-star text-yellow-400 mr-[2px]'></i>{{ Math.round(product.rating.rate) }} ({{ product.rating.count }})</del> -->
            </div>
          </div>
          <router-link to="/products" class="btn btn-darken btn-inline text-black px-16">
               Add to Cart<i class="bx bx-cart text-lg"></i>
           </router-link>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.section__prod {
  position: relative;
  padding: 30px 0 30px 0;
}
.section__prod .prod__title {
  position: relative;
  z-index: 3;
  overflow: hidden;
  margin-top: 0;
  padding: 60px 30px;
  font-size: 30px;
  text-align: center;
  color: #fff;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  transition: 0.25s;
}
@media (max-width: 991px) {
  .section__prod .prod__title {
    font-size: 26px;
    padding: 45px 30px;
  }
}
@media (max-width: 767px) {
  .section__prod .prod__title {
    font-size: 20px;
    text-align: center;
    padding: 30px 15px;
  }
}
.section__prod .prod__title:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.section__prod .prod__list {
  display: flex;
  flex-flow: row wrap;
  margin: 0 -15px;
  transition: 0.25s;
}
@media (max-width: 991px) {
  .section__prod .prod__list {
    margin: 0 -10px;
  }
}
.section__prod .prod__list .prod__item {
  flex: 0 0 25%;
  padding: 15px;
}
@media (max-width: 991px) {
  .section__prod .prod__list .prod__item {
    flex: 0 0 33.333333%;
    padding: 10px;
  }
}
@media (max-width: 767px) {
  .section__prod .prod__list .prod__item {
    flex: 0 0 50%;
  }
}
.section__prod .prod__list .prod__item .prod__item__wrap {
  height: 100%;
  border: 1px solid #eee;
  border-radius: 3px;
  overflow: hidden;
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__item__wrap:hover {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
/* .section__prod .prod__list .prod__item .prod__item__wrap:hover .prod__img img {
  transform: scale(0.9) rotate(5deg);
} */
.section__prod .prod__list .prod__item .prod__img {
  display: flex;
}
.section__prod .prod__list .prod__item .prod__img img {
  width: 100%;
  transform: scale(1) rotate(0);
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__content {
  padding: 0 15px 10px 15px;
  display: flex;
  flex-flow: column;
  /* align-items: start; */
}
.section__prod .prod__list .prod__item .prod__name {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  text-align: start;
}
@media (max-width: 767px) {
  .section__prod .prod__list .prod__item .prod__name {
    font-size: 14px;
  }
}
.section__prod .prod__list .prod__item .prod__name a {
  text-decoration: none;
  color: #000;
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__name a:hover {
  color: #41b93c;
}
.section__prod .prod__list .prod__item .prod__price {
  font-weight: 500;
}
.section__prod .prod__list .prod__item .prod__price ins {
  font-size: 18px;
  text-decoration: none;
  color: black;
}
.section__prod .prod__list del {
  color: gray;
  font-weight: 200;
  font-size: 12px;
}
.section__prod .prod__viewall {
  /* padding-top: 30px; */
  text-align: center;
}
.section__prod .prod__viewall a {
  text-decoration: none;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 12px 40px;
  transition: 0.25s;
}
.section__prod .prod__viewall a:hover {
  color: #fff;
  border-color: #41b93c;
  background-color: #41b93c;
}
#vegetable .prod__title {
  background-image: url('https://i.imgur.com/4waL6kW.jpg');
}
.btn {
	 display: inline-block;
	 font-family: inherit;
	 font-size: 14px;
	 font-weight: 500;
	 text-align: center;
     margin: 5px 10px;
	 vertical-align: middle;
	 white-space: nowrap;
	 user-select: none;
	 outline: none;
     border: 1px solid #333333;
	 border-radius: 0.25rem;
	 text-transform: unset;
	 transition: all 0.2s ease-in-out;
}
.btn:hover{
   color:  white;
   background: #2463eb;
   border: 1px solid #2463eb;
}
 .btn-inline {
	 display: inline-flex;
	 align-items: center;
	 justify-content: center;
	 column-gap: 0.5rem;
}
</style>