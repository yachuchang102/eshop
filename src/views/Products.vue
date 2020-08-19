<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
    <!-- 產品列表 start -->
    <div class="row mt-4"  v-if="!isLoading">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
          <div class="card border-0 shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl[0]})`}"></div>
             <!--加上背景圖片的方式-->
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark">{{item.title}}</a>
              </h5>
              <p class="card-text" v-html="item.description">
                內容</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <!-- 售價(price)欄位是可選的，因此售價若為空，就顯示原價(origin_price)
                售價若不為空，就顯示原價(origin_price)與售價(price) -->
                <div class="h5" v-if="!item.price">
                    {{item.origin_price}}元
                </div>
                <div>
                  <del class="h6">原價{{item.origin_price}}元</del>
                  <div class="h5">
                    現在只要{{item.price}}元
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex">
            <!-- 如果 status.loadingItem和item.id一樣的話就不能再次點按，避免modal已經打開了還重複點按-->
              <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)"
              :disabled="status.loadingItem === item.id">
                <i class="spinner-grow spinner-grow-sm" v-if="status.loadingItem === item.id"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)">
                <i class="spinner-grow spinner-grow-sm" v-if="status.loadingItem === item.id"></i>
                加到購物車
              </button>
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
                  <img :src="tempProduct.image" class="img-fluid" alt>
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
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Products',
  data () {
    return {
      tempProduct: {},
      products: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      cart: [],
      cartTotal: 0
    }
  },
  methods: {
    goPage (item) {
      console.log(this.$router)
      this.$router.push(`/product/${item.id}`)
    },
    getProducts (page = 1) { // 參數預設值
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      this.$http.get(url).then(res => {
        this.isLoading = false
        console.log(res)
        this.products = res.data.data
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
      })
    },
    addToCart (id, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.isLoading = true
      const cart = {
        product: id,
        quantity: quantity
      }
      console.log(cart)
      this.$http.post(url, cart).then(res => {
        this.isLoading = false
        $('#productModal').modal('hide')
        console.log(res)
      }).catch(error => {
        this.isLoading = false
        console.log(error.response)
        alert(error.response.data.errors)
        $('#productModal').modal('hide')
      })
    }
  },
  created () {
    this.isLoading = true
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
    this.$http.get(url)
      .then((res) => {
        this.isLoading = false
        console.log(res)
        this.products = res.data.data
      })
  }
}
</script>
