<template>
  <div class="home">
 <header id="header">
  <!--  Brand Logo  -->
  <a class="nav-brand" href="" target="_self">
    <img id="header-img" src="../assets/logo.png" alt="Sophie Skincare">
  </a>
  <!--  Toggle Menu for Mobile  -->
  <input type="checkbox" id="toggle-menu" role="button">
  <label for="toggle-menu" class="toggle-menu"><i class="fas fa-bars"></i></label>
  <!--  Menus  -->
  <nav id="nav-bar" class="navbar">
    <ul class="menu">
      <li><a class="nav-link" href="#featured">新品入庫</a></li>
      <li><a class="nav-link" href="#collections">產品介紹</a></li>
      <li><a class="nav-link" href="#about">關於Sophie</a></li>
      <li><a class="nav-link" href="#contact">聯繫我們</a></li>
    </ul>
    <ul class="social-menu">
      <li><a href="#"><i class="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
      <li><a href="#"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
      <li><a href="#"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
    </ul>
  </nav>
    <div class="cart-menu">
        <li class="nav-item dropdown">
          <a href="#" class="navbar-icon-badge navbar-icon-size mb-0 text-secondary" data-toggle="dropdown">
            <i class="fas fa-heart fa-lg text-danger" v-if="isFavShow"></i>
            <i class="far fa-heart fa-lg" v-else></i>
            <span class="badge badge-danger badge-pill h-number" v-if="isFavShow">{{ favTotal }}</span>
          </a>
          <div class="dropdown-menu favorite-dropdown-menu-right dropdown-menu-right p-3 position-absolute" style="min-width: 280px" data-offset="400">
            <h6>最愛商品列表</h6>
            <p class="empty" v-if="!isFavShow">清單內已無商品</p>
            <table class="table table-sm">
              <tbody>
                <tr v-for="item in favList" :key="item">
                  <td class="align-middle text-center" v-if="isFavShow">
                    <a href="#" class="text-muted" @click="removeFav(item.id)">
                      <i class="far fa-trash-alt trash"></i>
                    </a>
                  </td>
                  <td width="200px" class="align-middle">{{ item }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
            <li class="nav-item dropdown">
          <a href="#" class="navbar-icon-badge navbar-icon-size mb-0 text-secondary" data-toggle="dropdown" data-flip="false">
            <i class="fas fa-shopping-bag fa-lg text-danger" v-if="isCartShow"></i>
            <i class="fas fa-shopping-bag fa-lg" v-else></i>
            <span class="badge badge-danger badge-pill h-number" v-if="isCartShow">{{countTotal}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right position-absolute p-3" style="min-width: 300px" data-offset="400">
            <h6>已選擇商品</h6>
            <p class="empty"  v-if="!isCartShow">清單內已無商品</p>
            <table class="table table-sm">
              <tbody>
                <tr  v-for="(item, index) in cart" :key="index">
                  <td class="align-middle text-center"  v-if="isCartShow">
                    <a href="#" class="text-muted" @click="removCartProduct(item.product.id)">
                      <i class="far fa-trash-alt trash"></i>
                    </a>
                  </td>
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td width="40" class="align-middle"></td>
                  <td class="align-middle text-right"></td>
                </tr>
              </tbody>
            </table>
           <div v-if="isCartShow">
               <router-link to="/pay" class="btn btn-primary btn-block" style="height:50px;line-height:35px">
               <span><i class="fa fa-cart-plus"></i>結帳去</span>
                 </router-link>
             </div>
          </div>
        </li>
    <router-link to="/admin"><i class="fas fa-user"></i></router-link>
  </div>
</header>
<!-- Hero Section -->
<div class="hero">
  <div class="hero-img">
  </div>
  <div class="hero-text">
    <h1>重新找回<br> 自然脫俗的美</h1>
    <a href="#featured" class="btn-banner">為何選sophie？</a>
  </div>
</div>
<!-- Featured Section -->
<section id="featured">
  <div class="title title-left">
    <span class="line"></span><h3>歡迎您初次到來sophie!</h3>
  </div>
  <div class="wrapper">
    <div class="image">
      <img src="../assets/328.png" alt="sophie Facial Cream">
    </div>
    <div class="text">
      <h2>還原青春的秘訣</h2>
      <input type="checkbox" name="toggle" id="toggle" style="display: none;">
      <p>日本東京大學的山口博士長年研究長在富士山上稀有的藍紫花，在寒凍之中依舊盛開的秘密。團隊發現其中的x因子是關鍵，
        它就像一把鎖住青春的鑰匙，有了x因子，使得藍紫花在惡劣環境下還是能綻放，
        維持最美的瞬間。團隊以奈米技術萃取藍紫花，將其精華濃縮進sophie全系列的保養品中，就是sophie讓您恢復青春的秘訣。
      </p>
      <label class="btn2" for="toggle"></label>
    </div>
  </div>
</section>
<!-- Collection Section -->
<section id="collections">
  <div class="title title-right">
    <span class="line line-right"></span><h3>主打產品</h3>
  </div>
  <div class="wrapper">
    <a class="box box1" href="#" @click.prevent="goToProducts('精華液')">
      <img src="../assets/img1.jpg" alt="Avatar" class="image">
      <div class="middle">
      <h4>{{item1}}</h4></div>
      <div class="box-overlay"></div>
    </a>
    <a class="box box2" href="#" @click.prevent="goToProducts('眼唇保養')">
      <img src="../assets/img2.jpg" alt="Avatar" class="image">
       <div class="middle">
      <h4>眼唇保養</h4></div>
      <div class="box-overlay"></div>
    </a>
    <a class="box box3" href="#">
      <img src="../assets/img3.jpg" alt="Avatar" class="image" @click.prevent="goToProducts('清潔保養')">
     <div class="middle">
      <h4>清潔保養</h4></div>
    <div class="box-overlay"></div>
    </a>
  </div>
</section>
<!-- About Section -->
<section id="about">
  <div class="title title-left">
    <span class="line"></span><h3>關於sophie.</h3>
  </div>
  <div class="wrapper">
    <div class="text">
       <input type="checkbox" name="toggle2" id="toggle2" style="display: none;">
      <p>2010年創立至今，來自法國的創辦人Emi女士最注重女性的保養細節。首次來到日本的她，認識了藍紫花的魅力後，就迫不及待想把其引進到歐洲。
      在法國首次上市後，就受到法國女性的喜愛，進而推廣到整個國際；長期愛用的消費者喜愛sophie.天然的成分，不含化學藥劑，經過多個國家的嚴格把關。
      而高成本的提煉技術，讓效果提升更高，能夠達到精緻、美白、修復肌膚的完全功效。
      </p>
      <label class="btn3" for="toggle2"></label>
    </div>
    <div class="video-wrapper">
      <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/j4hvdSCV7xc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</section>
<Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
// @ is an alias to /src
export default {
  name: 'Home',
  components: { Footer },
  data () {
    return {
      item1: '精華液',
      item2: '眼唇保養',
      favTotal: 0,
      isFavShow: false,
      favoriteItem: JSON.parse(localStorage.getItem('favoriteItemId')) || [],
      favList: []
    }
  },
  methods: {
    goToProducts (item) {
      document.cookie = `productItem=${item}; expires=/; path=/`
      this.$router.push('/products')
    },
    checkFavorite () {
      const vm = this
      vm.favTotal = vm.favoriteItem.length
      if (vm.favoriteItem.length !== 0) {
        vm.isFavShow = true
      } else {
        vm.isFavShow = false
      }
    },
    removeFav (id) {
      const vm = this
      vm.isLoading = true
      vm.favData = vm.favoriteItem.indexOf(id)
      vm.favoriteItem.splice(vm.favData, 1)
      localStorage.setItem('favoriteItemId', JSON.stringify(vm.favoriteItem))
      vm.checkFavorite()
      setTimeout(() => {
        vm.$bus.$emit('returnFavItem', id)
      }, 100)
      vm.isLoading = false
    },
    getFavProduct () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(api).then((response) => {
        vm.isLoading = false
        const productItem = response.data.data
        productItem.filter((item) => {
          if (vm.favoriteItem.indexOf(item.id) !== -1) {
            vm.favList.push(item.title)
            console.log('Fav' + vm.favList)
          }
          return item
        })
      })
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data
        console.log('購物車內容', vm.cart)
        vm.countTotal = vm.cart.length
        if (vm.cart.length === 0) {
          vm.isCartShow = false
        } else {
          vm.isCartShow = true
        }
        vm.isLoading = false
      })
    },
    removCartProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then(() => {
        vm.getCart()
        vm.$bus.$emit('updateOrderCart')
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getFavProduct()
    this.checkFavorite()
    this.getCart()
  },
  watch: {
    favoriteItem () {
      const vm = this
      if (vm.favList.length !== vm.favoriteItem.length) {
        vm.favList = []
        vm.getFavProduct()
      }
    }
  },
  mounted () {
    const vm = this
    vm.$bus.$on('updateCart', () => {
      vm.getCart()
    })
    vm.$bus.$on('updateFavItem', (newFavItem) => {
      vm.favoriteItem = newFavItem
      vm.checkFavorite()
    })
  }
}
</script>

<style lang="scss" scoped>
/* Global */
.h-number{
  position:absolute;
  left:20px;
  top:5px
}
li{
  list-style: none;
}
* {
  box-sizing: border-box;
}
body{
  color: #090b08;
  margin:  0;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  background-color: #ffe9ef;
}
h1{
  font-size: 1.7em;
  font-weight: 700;
  line-height: 1.5em;
  text-transform: uppercase;
}
h2{
  text-transform: uppercase;
}
h4{
  font-size: .8em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}
h6{
  font-weight: 500;
}
a{
  text-decoration: none;
  color: #090b08;
}
ul{
  list-style: none;
}
section{
  padding: 5.8em 2em 0;
}
.title{
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 1em;
}
.title.title-right{
  justify-content: flex-end;
}
.line{
  width: 3em;
  height: 1px;
  background-color: #000;
  margin-right: 1em;
}
.line.line-right{
  order: 2;
  margin-right: 0;
  margin-left: 1em;
}
.btn3{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px #2c3e50;
  transition: all .3s ease-in;
  border-radius: 0.25rem;
}

.btn-banner{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px white;
  transition: all .3s ease-in;
  border-radius: 0.25rem;
  color:white
}
.btn2{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px #2c3e50;
  transition: all .3s ease-in;
  border-radius: 0.25rem;
}
.btn-banner:hover, .btn-banner:focus, .btn3:hover, .btn3:focus, .btn2:hover, .btn2:focus{
  transform: translate(0px, -2px);
  -webkit-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  transition: all .3s ease-out;
}

/* Header */
header{
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: space-around;
  z-index: 1;
}
header:before{
  content: "";
  position: absolute;
  background-color: white;
  width: 100%;
  height: 90%;
  z-index: -1;
  -webkit-box-shadow: 0px 7px 5px 0px rgba(0,0,0,0.22);
  -moz-box-shadow: 0px 7px 5px 0px rgba(0,0,0,0.22);
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.22);
}
.nav-brand img{
  width: auto;
  height: 4em;
}
.toggle-menu{
  display: block;
  margin-left:40px;
  font-size: 1.2em;
  align-self: center;
  cursor: pointer;
}
input[type="checkbox"]{
  display: none;
}
input[type="checkbox"]:hover ~ .toggle-menu,
input[type="checkbox"]:checked ~ .toggle-menu
{
  color: #ffcfd5
}
input[type="checkbox"]:checked ~ .navbar{
  display: flex;
  flex-direction: column;
}
.navbar{
  display: none;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #ffe9ef;
  justify-content: space-evenly;
  align-items: center;
  z-index: -2;
  margin-top:10px
}
.menu{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 4em 0 0;
}
a.nav-link{
  margin-right: 0;
}
a.nav-link:hover,
a.nav-link:active,
a.nav-link:focus{
  border-bottom: solid 1.8px #090b08;
}
.menu li{
  margin-top: 3em;
}
.social-menu{
  display: flex;
  flex-direction: row;
  padding: 0;
}
.cart-menu{
  display: flex;
  flex-direction: row;
  padding: 1.7em;
}
.cart-menu i {
  margin: 0 .5em 0 0;
  padding: 0 .5em 1em .2em;
  color: gray;
  cursor: pointer;
  opacity:0.5
}
.cart-menu i:hover{
  opacity:1
}
.social-menu li a{
  margin: 0 .5em;
  padding: .5em;
}
.social-menu li a{
  font-size: 1.2em;
}
.social-menu li a:hover,
.social-menu li a:active,
.social-menu li a:focus
{
  border-bottom: solid 1px #000;
}

/* Hero Section */
.hero {
display: flex;
height: 100vh;
align-items: center;
background: #f5d9d6 url("../assets/banner.jpg") no-repeat cover bottom;
background-image: url("../assets/banner.jpg");
background-position: center top;
background-repeat:no-repeat;
background-size: cover;
}
.hero-img img{
  display: none;
}
.hero-text{
  padding: 0 0 0 2em;
  color:white
}

/* Featured Section */
#featured .image img{
  width: 100%;
  height: auto;
}
.text{
  text-align: center;
  padding-top: 1em;
}
.text p{
  text-align: justify;
  line-height: 1.4em;
  text-indent: 20px;
  text-overflow: ellipsis;
  overflow:hidden;
  display: -webkit-box;
  white-space: nowrap;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  white-space: normal;
}
input[name="toggle"]:checked {
 & + p {
   -webkit-line-clamp: unset;
 }
}
input[name="toggle2"]:checked {
 & + p {
   -webkit-line-clamp: unset;
 }
}
.btn2, .btn3{
  &::after {
    content: "更多內容";
  }
}
input[name="toggle"]:checked {
  & ~ .btn2 {
    &::after {
      content: "收起內容";
    }
  }
}
input[name="toggle2"]:checked {
  & ~ .btn3 {
    &::after {
      content: "收起內容";
    }
  }
}
/* Collections Section */
.box{
  display: block;
  position: relative;
  padding: 1.3em;
  background-color: #f5d9d6;
  text-align: center;
  margin-bottom: 4em;
}
.box-overlay {
  display: block;
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 4em;
border: solid 3px #fff;
transform: translate(8px, 8px);
  transition: all 1s ease;
}
.box:hover .box-overlay,
.box:focus .box-overlay
{
  transform: translate(0px, 0px) scale(0.92, 0.8);
}

/* About Section */
#about{
  background-color: #f5d9d6;
}
section#about{
  padding-bottom: 5.8em;
}
#about .text{
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 2em;
}
#about .text p{
  padding-bottom: 0;
  text-align: left;
}
.video-wrapper{
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  overflow: hidden;
  height: 0;
}
.video-wrapper iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Contact Section */
section#contact{
  padding: 3em 2em .5em;
}
.form-wrapper:after,
.contact-wrapper:after{
  display: block;
  content: "";
  margin: 2em auto;
  border-bottom: solid 1px #dadada;
}
form{
  display: flex;
}
form input:first-child{
  flex: 1 0 80%;
  background-color: transparent;
}
form input:last-child{
  flex: 1 0 20%;
  border-left: 0;
  cursor: pointer;
  background-color: #f5d9d6;
  transition: all .25s ease;
}
#submit:hover {
background-color: #000;
color: #fff;
  transition: all .25s ease;
}
input{
  padding: 1em;
  border: 1px solid #000;
}
.contact-wrapper .wrapper{
  display: flex;
  text-align: center;
  flex-wrap: wrap;
}
.contact-wrapper .social-menu{
  flex: 1 0 100%;
  justify-content: center;
}
.contact-wrapper .social-menu li a {
font-size: 1.5em;
  padding: 0;
  margin: 0 1.5em 0 0;
}
.contact-wrapper a i{
  width: 100%;
  padding-bottom: .2em;
}
.contact-footer{
  padding: 1em 0;
  border: 1px solid #000;
}
.contact-footer:last-child{
  border-left: 0;
}
.contact-footer:hover{
  background-color: #f5d9d6;
}
.contact-tel{
  flex: 1 0 50%;
}
.contact-email{
  flex: 1 0 50%;
}
.copy-wrapper a{
  font-weight: 700;
}

/* Responsive Style */
@media(min-width: 320px){
    .hero-text{
    padding: 0 0 0 12em;
  }
}
@media(min-width: 576px){
  /*  Global  */
  h1{
    font-size: 2em;
  }
  /*  Hero Section  */
  .hero{
    justify-content: center;
    overflow: hidden;
  }
  .hero-img{
    padding-top: 6.5em;
  }
  .hero-img img{
    display: block;
    width: 14em;
    height: auto;
  }
  .hero-text{
    padding: 0 2em 0 25em;
  }
  /*  Featured Section  */
  .text{
    margin: 2em 2em auto;
  }
  /*  Collections Section  */
  #collections .wrapper{
    display: flex;
    flex-wrap: wrap;
  }
  .box{
    padding: 4em;
  }
  .box1{
    flex: 1 0 20%;
    margin-right: 1em;
    height: 240px
  }
  .box2{
    flex: 1 0 20%;
    margin-right: 1em;
  }
  .box3{
    flex: 1 0 20%;
    margin-right: 1em;
  }
.box1 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box2 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box3 .image {
  opacity: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
}
.box1 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box2 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box3 .middle{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.box1:hover .image {
  opacity: 0;
}
.box2:hover .image {
  opacity: 0;
}
.box3:hover .image {
  opacity: 0;
}
.box1:hover .middle {
  opacity: 1;
}
.box2:hover .middle {
  opacity: 1;
}
.box3:hover .middle {
  opacity: 1;
}
  /*  About Section  */
  .video-wrapper{
    margin: 0 2em;
  }
}
@media(min-width: 768px){
  /*  Global  */
  .wrapper{
    display: flex;
  }
  /*  Header  */
  .nav-brand img{
    height: 3em;
    margin-top:1em
  }
  .toggle-menu{
    display: none;
  }
  .navbar{
    display: flex;
    position: relative;
    height: auto;
    width: auto;
    background-color: transparent;
    z-index: 1;
  }
  .menu{
    flex-direction: row;
    padding: 0;
    justify-content: flex-end;
  }
  .social-menu{
    display: none;
  }
  .menu li{
    margin-top: 0;
  }
  a.nav-link{
    margin-right: 3em;
  }
  /*  Featured Section  */
  .text{
    text-align: left;
    margin: 0 0 auto 4em;
  }
  #featured .text{
    flex: 1;
    order: 1;
  }
  #featured .image{
    flex: 1 0 12em;
    order: 2;
  }
  /*  Collections Section  */
  #collections .wrapper{
    margin: 0 4em;
  }
  /*  About Section  */
  #about .wrapper{
    display: block;
  }
  #about .text{
    margin-right: 4em;
  }
  .video-wrapper{
    margin: auto 4em;
  }
  /* Contact Section  */
  #contact .wrapper{
    flex-wrap: wrap;
  }
  .form-wrapper, .contact-wrapper{
    flex: 1 0 50%;
    align-self: center;
    padding: 0 1em;
  }
  .copy-wrapper{
    flex: 1 0 100%;
    padding: 0 1em;
  }
  .form-wrapper:after,
  .contact-wrapper:after{
    display: none;
  }
  .contact-footer{
    border: 0;
    padding: 0;
    margin: .6em auto;
    text-align: left;
  }
  .contact-footer:hover{
    background-color: transparent;
  }
  .contact-wrapper a.contact-footer:hover i{
  }
  .contact-wrapper a i{
    width: auto;
    padding-right: 1em;
  }
  .contact-wrapper .social-menu{
    display: flex;
    order: 3;
    justify-content: flex-start;
  }
  .contact-wrapper .social-menu a i{
    padding-right: 0;
  }
  .copy-wrapper:before{
    display: block;
    content: "";
    margin: 2em auto;
    border-bottom: solid 1px #dadada;
  }
}
@media(min-width: 992px){
  /*  Global  */
  section{
    padding: 5.8em 7em 0;
  }
  .title.title-left{
    margin-left: -2.5em;
  }
  .title.title-right{
    margin-right: -2.5em;
  }
  .line{
    width: 5.5em;
  }
  /*  Hero Section  */
  .hero-img img{
    width: 100%;
  }
  /*  Featured Section  */
  #featured .image{
    margin-top: -2em;
  }
  /* About Section  */
  #about .wrapper{
    display: flex;
  }
  #about .text{
    flex: 1 0 40%;
    margin-right: 1em;
    padding-bottom: 0;
  }
  .video-wrapper{
    flex: 2 0 55%;
    padding-bottom: 33.25%;
    align-self: center;
    margin: 1.4em 0;
  }
  .contact-tel{
    flex-basis: 20%;
  }
}
@media(min-width: 1200px){
  /*  Global  */
  h1{
    font-size: 2.4em;
  }
  section{
    padding: 5.8em 11em 0;
  }
  /*  Hero Section  */
  .hero-img img{
    width: 100%;
  }
  /*  Featured Section  */
  #featured .image{
    margin-top: -4em;
  }
  /*  About Section  */
  #about .text{
    padding-right: 3em;
    padding-bottom: 0;
  }
  .video-wrapper{
    margin: 0;
  }
}
</style>
