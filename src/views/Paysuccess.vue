<template>
    <div>
        <h2 class="mt-5 text-success"><i class="fas fa-check-circle"></i>付款成功</h2>
        <hr>
<div class="container">
<h4>訂單編號{{order.id}}</h4>
<table class="table table-bordered mt-5">
  <thead>
    <tr>
      <th scope="col" colspan="3" class="text-left">訂單資訊</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">姓名</th>
      <td colspan="3">{{order.user.name}}</td>
    </tr>
  </tbody>
    <tr>
      <th scope="row">email</th>
      <td colspan="3">{{order.user.email}}</td>
    </tr>
    <tr>
      <th scope="row">電話</th>
      <td colspan="3">{{order.user.tel}}</td>
    </tr>
    <tr>
      <th scope="row">住址</th>
      <td colspan="3">{{order.user.address}}</td>
    </tr>
    <tr v-for="item in order.products" :key="item.id">
      <th scope="row">商品詳情</th>
      <td>{{item.product.title}}</td>
      <td>{{item.quantity}}/{{item.product.unit}}</td>
    </tr>
    <tr>
      <th scope="row">總金額</th>
      <td colspan="3">{{order.amount}}元</td>
    </tr>
</table>
</div>
            <div class="row justify-content-center mt-5">
            <div class="col-md-6">
            <router-link class="btn-lg btn-primary btn-block" to="/index">
              <i class="fas fa-undo" aria-hidden="true"></i> 回首頁
            </router-link>
            </div>
             </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      order: {}
    }
  },
  created () {
    this.isLoading = true
    const id = this.$route.params.id
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${id}`
    this.$http.get(url)
      .then((res) => {
        this.isLoading = false
        this.order = res.data.data
        console.log('order' + this.order)
      })
  }
}
</script>
