<template>
  <div class="about">
    <loading :active.sync="isLoading"></loading>
    <h1 v-if="!isLoading">This is 產品列表頁面</h1>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>
          <router-link :to="`/product/${item.id}`">看產品</router-link>
        </td>
        <td>
          <button @click="goPage(item)">產品細節</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  methods: {
    goPage (item) {
      console.log(this.$router)
      this.$router.push(`/product/${item.id}`)
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
