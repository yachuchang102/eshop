<template>
    <div>
    <Navbar/>
        <loading :active.sync="isLoading"></loading>
        <h3>{{product.title}}</h3>
        <div class="container mt-20">
       <div class="row">
      <div class="col-md-12 col-lg-8">
        <img :src='product.imageUrl[0]' class="bg-item"/>
      </div>
      <div class="col-md-12 col-lg-4">
        <h3 class="font-weight-bold">{{product.title}}</h3>
        <div class="d-flex mt-4 mb-4 justify-content-center">
          <span class="font-weight-bold price-text">特價{{ product.price }}元</span>
          <span class="ml-3 text-secondary origin-price-text">原價{{ product.origin_price}}元</span>
        </div>
        <div class="d-flex justify-content-center">
          <span class="mt-3 mr-1">數量</span>
        <select class="rounded-0 text-center form-control num-select" v-model="product.num">
          <option :value="num" v-for="num in 9" :key="num">
          {{ num }} {{ product.unit }}
          </option>
        </select>
        </div>
        <button type="button" class="btn btn-primary bg-pink btn-lg btn-block" @click="addToCart(product.id, product.num)">
        <i class="fas fa-shopping-bag fa-lg text-white"
        style="font-size:20px"></i>
        放入購物車</button>
        <button type="button" class="btn btn-outline-secondary btn-lg btn-block"
         @click="addFavorite(product.title, product.id)">
        <i class="far fa-heart"
        style="font-size:20px"
        v-if="!checkFavStatus(product.id)"></i>
        <i class="fas fa-heart"
        style="font-size:20px"
         v-if="checkFavStatus(product.id)"></i>
        收藏商品</button>
        <div class="col-12 mt-5">
        <h5 class="font-weight-bold">商品介紹</h5>
        <hr>
        <p>{{product.content}}</p>
      </div>
      </div>
    <!--你可能會喜歡 -->
      <div class="col-12">
        <h5 class="mt-5 font-weight-bold">你可能也會喜歡</h5>
        <hr>
        <div class="row">
          <div class="col-md-2 card-margin card-size"  v-for="item in filterProduct" :key="item.id">
            <div class="card rounded-0 border-0" @click="goProduct(item.id)">
              <img :src="item.imageUrl" class="card-img-top rounded-0" alt="">
              <div class="card-body">
                <h5 class="card-title like-font font-weight-bold">{{item.title}}</h5>
                <p class="card-text text-secondary"></p>
                <div class="d-flex price-margin"></div>
                <span class="font-weight-bold"></span>
                <del class="ml-2 text-secondary" style="font-size:12px"></del>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import $ from 'jquery'
console.log($)
export default {
  components: { Footer, Navbar },
  data () {
    return {
      product: {
        num: 1,
        imageUrl: []
      },
      categoryData: '',
      filterProduct: {},
      status: {
        loadingItem: ''
      },
      favoriteItem: JSON.parse(localStorage.getItem('favoriteItemId')) || []
    }
  },
  created () {
    this.isLoading = true
    const id = this.$route.params.id
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.$http.get(url)
      .then((res) => {
        this.isLoading = false
        this.product = res.data.data
        this.categoryData = res.data.data.category
        this.getProducts(this.categoryData)
      })
  },
  methods: {
    goProduct (id) {
      this.$router.push(`/product/${id}`)
      window.location.reload()
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
    addToCart (item, quantity = 1) {
      this.status.loadingItem = item.id
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item,
        quantity
      }
      this.$http.post(url, cart).then(() => {
        this.status.loadingItem = ''
        this.$bus.$emit('message:push',
          '加入購物車成功囉，好棒ヽ(＾Д＾)ﾉ ',
          'success')
        this.getCart()
        this.$bus.$emit('updateCart')
      }).catch((error) => {
        this.status.loadingItem = ''
        const errorList = error.response.data.errors
        errorList.forEach((err) => {
          this.$bus.$emit('message:push',
            `加入失敗惹，好糗Σ( ° △ °|||)︴
            ${err}`,
            'danger')
        })
      })
    },
    addFavorite (item, id) {
      const vm = this
      vm.productId = id
      if (vm.favoriteItem.indexOf(vm.productId) === -1) {
        vm.favoriteItem.push(vm.productId)
      } else {
        vm.favoriteItem.splice(vm.favoriteItem.indexOf(vm.productId), 1)
      }
      // 將更新過的favoriteItem存到localStorage內，並傳給navbar
      localStorage.setItem('favoriteItemId', JSON.stringify(vm.favoriteItem))
      vm.$bus.$emit('updateFavItem', vm.favoriteItem)
    },
    checkFavStatus (id) {
      const vm = this
      if (vm.favoriteItem.some((ele) => ele === id)) {
        return true
      }
      return false
    },
    getProducts (items) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
      vm.$http.get(api).then((response) => {
        vm.products = response.data.data
        // eslint-disable-next-line no-unused-vars
        vm.filterProduct = vm.products.filter((item, index, array) => item.category === items)
      })
    }
  },
  mounted () {
    const vm = this
    vm.$bus.$on('returnFavItem', (id) => {
      vm.checkFavStatus(id)
    })
  }
}
</script>

<style scoped>
.bg-item {
  max-width: 100%;
  width: 70%;
  height: auto;
  border:solid 1px gray
}
.mt-20 {
  margin-top:100px
}
.price-text {
    color: #2c3e50;
    font-size: 24px
}
.origin-price-text {
    font-size: 18px;
    text-decoration: line-through
}
.num-select {
    margin-top:10px;
    margin-bottom:25px;
    width:30%
}
</style>
