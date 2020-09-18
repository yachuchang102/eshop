<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div  v-if="cartTotal!==0">
        <div class="container">
        <ul class="step-list">
        <li class="col-md-12 col-lg-3 pt-2 mt-3 dot-none">
          <div class="d-flex justify-content-center">
          <div class="h-circle"
          :class="{'bg-primary active': step === 1}"
          >Step:1</div>
          </div>
          <p class="mt-2">確認訂單內容</p>
        </li>
         <li class="col-md-12 col-lg-3 pt-2 mt-3 dot-none">
          <div class="d-flex justify-content-center">
          <div class="h-circle"
          :class="{'bg-primary active': step === 2}"
          >Step:2</div>
          </div>
          <p class="mt-2">填寫訂單資料</p>
        </li>
         <li class="col-md-12 col-lg-3 pt-2 mt-3 dot-none">
          <div class="d-flex justify-content-center">
          <div class="h-circle"
          :class="{'bg-primary active': step === 3}"
          >Step:3</div>
          </div>
          <p class="mt-2">付款/完成訂單</p>
        </li>
      </ul>
      </div>
    <!--step1購物車內容-->
     <div class="my-5 row justify-content-center"  v-if="step === 1">
      <div class="col-md-6">
        <div class="text-right mb-3">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="removeAllCartItem()"
          >
            <i class="far fa-trash-alt" /> 刪除所有品項
          </button>
        </div>
        <table class="table">
          <thead>
            <th />
            <th>品名</th>
            <th width="150px">
              數量
            </th>
            <th>單位</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart.length">
            <tr
              v-for="item in cart"
              :key="item.id"
            >
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.product.id)"
                >
                  <i class="far fa-trash-alt" />
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div
                  v-if="item.coupon"
                  class="text-success"
                >
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-primary"
                      @click="quantityUpdata(item.product.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                  <input
                    id="inlineFormInputGroupUsername"
                    type="text"
                    class="form-control text-center"
                    :value="item.quantity"
                    @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      :disabled="item.quantity === 1"
                      @click="quantityUpdata(item.product.id, item.quantity - 1)"
                    >
                      -
                    </button>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                {{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.product.price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="4"
                class="text-right"
              >
                總計
              </td>
              <td class="text-right">
                {{ cartTotal }}
              </td>
            </tr>
            <tr v-if="coupon.enabled">
              <td
                colspan="4"
                class="text-right text-success"
              >
                折扣價
              </td>
              <td class="text-right text-success">
                {{ cartTotal * (coupon.percent / 100) }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input
            v-model="coupon_code"
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCoupon"
            >
              套用優惠碼
            </button>
          </div>
        </div>
          <hr>
           <div class="row justify-content-between" v-if="step === 1">
             <div class="col-md-3">
               <router-link to="/products" class="btn btn-secondary btn-block step-btn">
                 <i class="fas fa-arrow-left"></i>繼續選購</router-link>
             </div>
             <div class="col-md-3" v-if="orderTotal !== 0">
                 <button  class="btn btn-primary btn-block step-btn" @click="step = 2">下一步
                 <i class="fas fa-arrow-right"></i></button>
             </div>
          </div>
      </div>
    </div>
    <!--step1購物車內容end-->
          <!-- step2 -->
      <!--訂單-->
<div class="my-2 row justify-content-center" v-if="step === 2">
      <validation-observer
        v-slot="{ invalid }"
        class="col-md-6"
      >
        <form @submit.prevent="createOrder">
          <div class="form-group">
            <validation-provider
              v-slot="{ errors, classes }"
              rules="required"
            >
              <label for="username">收件人姓名</label>
              <input
                id="username"
                v-model="form.name"
                type="text"
                class="form-control"
                :class="classes"
              >
              <span
                v-if="errors[0]"
                class="text-danger"
              >{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider
              v-slot="{ errors, classes }"
              name="E-mail"
              rules="required|email"
            >
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                :class="classes"
              >
              <span
                v-if="errors[0]"
                class="text-danger"
              >{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider
              v-slot="{ errors, classes }"
              rules="required|min:8"
            >
              <label for="tel">電話</label>
              <input
                id="tel"
                v-model="form.tel"
                type="tel"
                class="form-control"
                :class="classes"
              >
              <span
                v-if="errors[0]"
                class="text-danger"
              >{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider
              v-slot="{ errors, classes }"
              rules="required"
            >
              <label for="address">地址</label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                class="form-control"
                :class="classes"
              >
              <span
                v-if="errors[0]"
                class="text-danger"
              >{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="message">購買方式</label>
            <select
              v-model="form.payment"
              class="form-control"
              required
            >
              <option
                value=""
                disabled
              >
                請選擇付款方式
              </option>
              <option value="WebATM">
                WebATM
              </option>
              <option value="ATM">
                ATM
              </option>
              <option value="CVS">
                CVS
              </option>
              <option value="Barcode">
                Barcode
              </option>
              <option value="Credit">
                Credit
              </option>
              <option value="ApplePay">
                ApplePay
              </option>
              <option value="GooglePay">
                GooglePay
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form-control"
              cols="30"
              rows="3"
            />
          </div>
             <hr>
           <div class="row justify-content-between">
             <div class="col-md-3">
               <router-link to="/products" class="btn btn-secondary btn-block step-btn">
                 <i class="fas fa-arrow-left"></i>繼續選購</router-link>
             </div>
             <div class="col-md-3">
         <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="invalid"
              @click="createOrder"
            >
              送出表單
            </button>
             </div>
          </div>
        </form>
      </validation-observer>
</div>
<!--step2end-->
</div>
<div v-else>
  <h2>您尚未加入任何商品</h2>
</div>
</div>
</template>

<script>
/* global $ */
export default {
  name: 'Paybill',
  data () {
    return {
      step: 1,
      products: [],
      tempProduct: {
        num: 0,
        imageUrl: []
      },
      status: {
        loadingItem: ''
      },
      coupon_code: '',
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
      orderTotal: '',
      cart: {},
      cartTotal: 0,
      coupon: {},
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      this.$http.get(url).then((response) => {
        this.products = response.data.data
        this.isLoading = false
      })
    },
    addtoCart (item, quantity = 1) {
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
    quantityUpdata (id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const data = {
        product: id,
        quantity: num
      }
      this.$http.patch(url, data).then(() => {
        this.isLoading = false
        this.getCart()
      })
    },
    addCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`
      // 輸入 coupon 之前必須先戳一下 api/{{ uuid }}/coupon/search API 確定該 coupon 是存在的
      this.$http.post(url, { code: this.coupon_code }).then((response) => {
        // 若 coupon 存在就回寫回去到 this.coupon
        // 該資料會是一個物件格式，詳情可見 API 文件
        // https://course-ec-api.hexschool.io/document#frontend-search-coupon-code-code
        this.coupon = response.data.data
        this.isLoading = false
      }).catch((error) => {
        const errorData = error.response.data.errors
        if (errorData) {
          errorData.code.forEach((err) => {
            this.$bus.$emit('message:push',
              `加入失敗惹，好糗Σ( ° △ °|||)︴
            ${err}`,
              'danger')
          })
          this.isLoading = false
        } else {
          const { message } = error.response.data
          this.$bus.$emit('message:push',
            `加入失敗惹，好糗Σ( ° △ °|||)︴
            ${message}`,
            'danger')
          this.isLoading = false
        }
      })
    },
    getCart () {
      this.isLoading = true
      this.cartTotal = 0
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        console.log(this.cart)
        this.orderTotal = response.data.data.length
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity)
        })
        this.isLoading = false
      })
    },
    createOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`
      const order = { ...this.form }
      // 如果有優惠卷就加入，請注意該 coupon 必須先執行過 this.addCoupon()
      // 主要會使用 enabled 屬性判斷該 coupon 是否可以使用
      // 如果沒有執行 this.addCoupon() 那麼 enabled 就會是 undefined，因此還是不會執行
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }
      this.$http.post(url, order).then((response) => {
        if (response.data.data.id) {
          this.$router.push(`/customercheckout/${response.data.data.id}`)
        }
        this.isLoading = false
      }).catch((error) => {
        const errorData = error.response.data.errors
        errorData.forEach((err) => {
          this.$bus.$emit('message:push',
            `建立訂單失敗惹，好糗Σ( ° △ °|||)︴
          ${err}`,
            'danger')
        })
        this.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.step-list {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
}
.step-list.active {
  display: flex;
  flex-direction: column;
}
.dot-none {
  list-style-type: none;
}
.order-left-box {
  border: 1px solid rgb(228, 228, 228);
  border-radius: 10px 10px 0 0;
}
.step-btn {
 margin-bottom: 15px
}
.h-circle{
  padding-top:20px;
  border-radius: 50%;
  width:60px;
  height:60px
}
</style>
