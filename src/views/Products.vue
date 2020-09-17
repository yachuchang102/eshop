<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Navbar/>
    <div class="container">
    <!-- 產品列表 start -->
    <div class="row"  v-if="!isLoading">
   <div class="col-md-3 col-lg-2 col-sm-12 left-list">
    <ul class="list-group mt-10 sticky-top">
      <li class="list-group-item list-group-item-action views"
      v-for="(item, index) in local.list" :key="index"
      :class="{'active': select == item}" @click.prevent="getLocal(item)">{{ item }}</li>
    </ul>
   </div>
      <div class="row col-md-10 d-flex mt-10 right-content">
        <div  class="col-md-4 mb-4 justify-content-center product-card" v-for="item in products" :key="item.id">
          <div class="card border-0">
            <span class="badge badge-secondary float-right ml-2 col-md-3">{{item.category}}</span>
            <div class="product-img" style="height: 150px; background-size: 100%; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl[0]})`}"></div>
             <!--加上背景圖片的方式-->
            <div class="card-body">
              <h6 class="card-title">
                <a href="#" class="text-dark">{{item.title}}</a>
              </h6>
              <p class="card-text" v-html="item.description">
                內容</p>
              <div>
                <!-- 售價(price)欄位是可選的，因此售價若為空，就顯示原價(origin_price)
                售價若不為空，就顯示原價(origin_price)與售價(price) -->
                <div class="h5 text-center" v-if="!item.price">
                    {{item.origin_price}}元
                </div>
                  <div class="h6 text-center">
                  $ {{item.price}}
                  </div>
                <div class="float-right favIcon">
                <i class="far fa-heart fa-item"
                  v-if="!checkFavStatus(item)"
                  @click="addFavorite(item, item.id)"
                  style="font-size:25px"></i>
                <i class="fas fa-heart fa-item"
                  v-if="checkFavStatus(item)"
                  @click="addFavorite(item, item.id)"
                  style="font-size:25px"></i>
                </div>
              </div>
            </div>
            <div class="card-footer bg-transparent d-flex">
            <!-- 如果 status.loadingItem和item.id一樣的話就不能再次點按，避免modal已經打開了還重複點按-->
              <button type="button" class="btn btn-outline-secondary btn-sm" @click="goPage(item.id)"
              :disabled="status.loadingItem === item.id">
                <i class="spinner-grow spinner-grow-sm" v-if="status.loadingItem === item.id"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item)">
                <i class="spinner-grow spinner-grow-sm" v-if="status.loadingItem === item.id"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- 產品列表 end -->
      <!-- 產品詳細 Modal start -->
            <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="exampleModalLabel" class="modal-title">
                    {{ tempProduct.title }}
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img :src="tempProduct.imageUrl[0]" class="img-fluid" alt>
                  <blockquote class="blockquote mt-3">
                    <p class="mb-0" v-html="tempProduct.content"></p>
                    <footer class="blockquote-footer text-right">
                      {{ tempProduct.description }}
                    </footer>
                  </blockquote>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div v-if="!tempProduct.price" class="h4">
                      {{ tempProduct.origin_price }} 元
                    </div>
                    <del v-if="tempProduct.price" class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                    <div v-if="tempProduct.price" class="h4">
                      現在只要 {{ tempProduct.price }} 元
                    </div>
                  </div>
                  <select v-model="tempProduct.num" name class="form-control mt-3">
                    <option value="0" disabled selected>
                      請選擇數量
                    </option>
                    <option v-for="num in 10" :key="num" :value="num">
                      選購 {{ num }} {{ tempProduct.unit }}
                    </option>
                  </select>
                </div>
                <div class="modal-footer">
                  <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
                    小計
                    <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
                  </div>
                  <button type="button" class="btn btn-primary" @click="addToCart(tempProduct.id, tempProduct.num)">
                    <i v-if="tempProduct.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        <!-- 產品詳細 Modal end -->
        </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
/* global $ */
export default {
  name: 'Products',
  components: { Footer, Navbar },
  data () {
    return {
      select: '全部商品',
      tempProduct: {
        num: 0,
        imageUrl: []
      },
      products: [],
      productId: '',
      isLoading: false,
      status: {
        loadingItem: ''
      },
      cart: [],
      cartTotal: 0,
      local: {
        list: [
          '全部商品',
          '精華液',
          '眼唇保養',
          '清潔系列'
        ],
        select: '全部商品'
      },
      favItem: '',
      favoriteItem: JSON.parse(localStorage.getItem('favoriteItemId')) || []
    }
  },
  methods: {
    goPage (item) {
      console.log(this.$router)
      this.$router.push(`/product/${item}`)
    },
    checkId (item) {
      console.log(item)
    },
    addFavorite (item, id) {
      const vm = this
      vm.productId = id
      console.log(vm.productId)
      if (vm.favoriteItem.indexOf(vm.productId) === -1) {
        item.favItem = true
        vm.favoriteItem.push(vm.productId)
      } else {
        vm.favoriteItem.splice(vm.favoriteItem.indexOf(vm.productId), 1)
        item.favItem = false
      }
      console.log(vm.favoriteItem)
      // 將更新過的favoriteItem存到localStorage內，並傳給navbar
      localStorage.setItem('favoriteItemId', JSON.stringify(vm.favoriteItem))
      vm.$bus.$emit('updateFavItem', vm.favoriteItem)
    },
    getDetailed (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http.get(url).then((response) => {
        this.tempProduct = response.data.data
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        this.$set(this.tempProduct, 'num', 0)
        $('#productModal').modal('show')
        this.isLoading = false
      })
    },
    getProducts (page = 1) { // 參數預設值
      const vm = this
      vm.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      vm.$http.get(url).then(res => {
        vm.isLoading = false
        console.log(vm.local.select)
        if (vm.local.select !== '全部商品') {
        // eslint-disable-next-line max-len
          const localData = res.data.data.filter((item) => item.category === vm.local.select)
          vm.products = localData
        } else {
          vm.products = res.data.data
          console.log(res.data.data)
        }
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
      })
    },
    getLocal (loaclId) {
      const vm = this
      vm.local.select = loaclId
      vm.select = loaclId
      vm.getProducts()
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
        product: item.id,
        quantity
      }
      this.$http.post(url, cart).then(() => {
        this.status.loadingItem = ''
        this.$bus.$emit('message:push',
          '加入購物車成功囉，好棒ヽ(＾Д＾)ﾉ ',
          'success')
        $('#productModal').modal('hide')
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
        $('#productModal').modal('hide')
      })
    },
    getCookie (name) {
      var arr = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      )
      if (arr != null) return unescape(arr[2])
      return null
    },
    delCookie (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = this.getCookie(name)
      if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
      }
    },
    checkFavStatus (item) {
      const vm = this
      if (vm.favoriteItem.some((ele) => ele === item.id)) {
        return true
      }
      return false
    }
  },
  created () {
    this.isLoading = true
    this.local.select = this.getCookie('productItem')
    console.log('select:' + this.local.select)
    if (!this.local.select) {
      this.local.select = '全部商品'
    }
    this.getLocal(this.local.select)
    this.getProducts()
    this.delCookie('productItem')
  },
  mounted () {
    const vm = this
    vm.$bus.$on('returnFavItem', (id) => {
      vm.getProducts()
      vm.checkFavStatus(id)
    })
  }
}
</script>

<style lang="scss" scoped>
.favIcon{
  position: absolute;
  bottom: 70px;
  right: 20px
}
.mt-10{
  margin-top:100px
}
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}
.list-group {
  border-radius:0;
  border:1px black solid;
}
.list-group-item {
    border-style: none
}
.badge{
  position:absolute;
  top:10px;
  right:10px
}

.card{
   text-align:center;
   border-radius:0;
}
.product-card:hover{
   box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.1);
   top:-10px;
}
.product-card .card :hover{
   background-size: 150% !important;
   transition: background-size 1s;
}

.list li:hover {
  background-color: #dcdcdc;
  color: black;
}
.list-group-item.active {
  background-color: #dcdcdc !important;
  color: black
}
.left-list {
width:200px;
cursor: pointer;
}
@media(min-width: 768px){
.left-list {
position: fixed;
top: 0;
left: 0;
}
.right-content{
  margin-left:90px
}
}

</style>
