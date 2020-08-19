<template>
    <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
    <!--訂單-->
    <table class="table mt-4">
          <thead>
            <tr>
              <th>
                下單時間
              </th>
              <th>購買款項</th>
              <th>
                付款方式
              </th>
              <th>
                應付金額
              </th>
              <th>
                是否付款
              </th>
            </tr>
          </thead>
          <tbody v-if="orders.length">
            <tr v-for="(item) in orders" :key="item.id">
              <td>{{ item.created.datetime }}</td>
              <td>
              <ul class="list-unstyled">
              <li
                v-for="(product, i) in item.products"
                :key="i"
              >
                {{ product.product.title }} 數量：{{ product.quantity }}
                {{ product.product.unit }}
              </li>
              </ul></td>
              <td>
                {{ item.payment }}
              </td>
              <td class="text-right">
                {{ item.amount }}
              </td>
              <td>
            <div class="custom-control custom-switch">
              <input
                :id="item.id"
                v-model="item.paid"
                type="checkbox"
                class="custom-control-input"
                @change="setOrderPaid(item)"
              >
              <label
                class="custom-control-label"
                :for="item.id"
              >
                <strong
                  v-if="item.paid"
                  class="text-success"
                >已付款</strong>
                <span
                  v-else
                  class="text-muted"
                >尚未付款</span>
              </label>
            </div>
              </td>
            </tr>
          </tbody>
    </table>
    <Pagination :pages="pagination" :emit-pages="getData"></Pagination>
    <!--訂單 end-->
    </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Orders',
  components: {
    Pagination
  },
  props: ['token'],
  data () {
    return {
      status: {
        fileUploading: false
      },
      orders: [],
      isLoading: false,
      pagination: {},
      tempProduct: {
        imageUrl: []
      },
      isNew: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          console.log('getData', res.data.meta.pagination)
          console.log('token', this.token)
          this.orders = res.data.data
          console.log('訂單列表', this.orders)
          this.pagination = res.data.meta.pagination
        })
    },
    setOrderPaid (item) {
      this.isLoading = true
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
      }
      this.$http.patch(url, item.id).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push',
          '付款狀態已修改，好棒ヽ(＾Д＾)ﾉ ',
          'success')
        this.getData()
      })
    }
  }
}
</script>
