<template>
    <div>
  <loading :active.sync="isLoading"></loading>
  <header id="header" class="navbar-fixed-top">
  <!--  Brand Logo  -->
  <router-link to="/" class="nav-brand">
    <img id="header-img" src="../assets/logo.png" alt="Sophie Skincare">
  </router-link>
  <!--  Menus  -->
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
    <a @click="$router.go(-1)"><i class="fas fa-undo"></i></a>
  </div>
</header>
    </div>
</template>

<script>
export default {
  data () {
    return {
      favTotal: 0,
      isFavShow: false,
      favoriteItem: JSON.parse(localStorage.getItem('favoriteItemId')) || [],
      favList: [],
      isCartShow: false,
      countTotal: 0,
      cart: {},
      isLoading: false
    }
  },
  methods: {
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
li{
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
.btn{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px white;
  transition: all .3s ease-in;
  color:white
}
.btn2{
  display: inline-block;
  padding: .5em 1.5em;
  border: solid 1px #2c3e50;
  transition: all .3s ease-in;
  border-radius: 0.25rem;
}
.btn:hover, .btn:focus, .btn2:hover, .btn2:focus{
  transform: translate(0px, -2px);
  -webkit-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  box-shadow: 0px 10px 7px -9px rgba(0,0,0,0.75);
  transition: all .3s ease-out;
}

/* Header */
.h-number{
  position:absolute;
  left:20px;
  top:5px
}
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
    height:235px
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
  height:auto;
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
