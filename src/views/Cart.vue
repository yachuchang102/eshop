<template>
  <div class="cart">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
<!-- 購物車頁面 start -->
  <div class="my-5 row justify-content-center">
    <div class="col-md-6">
      <div class="text-right mb-3">
        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem">
          <i class="far fa-trash-alt"> 刪除所有品項</i>
        </button>
      </div>
      <table class="table">
        <thead>
          <th>刪除</th>
          <th>品名</th>
          <th width="150px">
            數量
          </th>
          <th>單位</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.product.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">{{item.product.title}}</td>
            <td class="align-middle">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary"
                    type="button"
                    :disabled="item.quantity === 1"
                    @click="item.quantity -- ; updateQuantity(item.product.id, item.quantity)">
                    -
                  </button>
                </div>
                <input id="inlineFormInputGroupUsername"
                type="number"
                min="1"
                class="form-control text-center"
                v-model="item.quantity"
                @change="updateQuantity(item.product.id, item.quantity)">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary"
                    type="button"
                    @click="item.quantity ++; updateQuantity(item.product.id, item.quantity)"
                    :disabled="status.loadingUpdate === item.product.id">
                    <span
                    class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true"
                    v-if="status.loadingUpdate === item.product.id"></span>
                    <span v-else>+</span>
                  </button>
                </div>
              </div>
            </td>
            <td class="align-middle">{{item.product.unit}}
            </td>
            <td class="align-middle text-right">{{item.product.price}}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
              總計{{cartTotal}}
            </td>
            <td class="text-right">
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <!-- 購物車頁面 end -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      tempProduct: {},
      products: [],
      isLoading: false,
      status: {
        loadingItem: '',
        loadingUpdate: ''
      },
      carts: [],
      cart: {},
      cartTotal: 0
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url).then(res => {
        this.isLoading = false
        console.log(res)
        this.carts = res.data.data
        console.log(this.carts)
        this.updateTotal()
      }).catch((error) => {
        console.log(error.response)
        this.isLoading = false
      })
    },
    updateTotal () {
      this.cartTotal = 0
      this.carts.forEach(item => {
        this.cartTotal += item.product.price * item.quantity
        console.log(this.cartTotal)
      })
    },
    updateQuantity (id, quantity) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.status.loadingUpdate = id
      const cart = {
        product: id,
        quantity: quantity
      }
      this.$http.patch(url, cart).then(res => {
        this.status.loadingUpdate = ''
        console.log(res)
        this.getCart()
      }).catch((error) => {
        console.log(error.response)
        this.status.loadingUpdate = ''
      })
    },
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.getCart()
        this.updateTotal()
      })
    },
    removeAllCartItem () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false
          this.getCart()
          this.updateTotal()
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
