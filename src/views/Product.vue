<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <h2>單一產品</h2>
        <h3>{{product.title}}</h3>
    </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    this.isLoading = true
    const id = this.$route.params.id
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.$http.get(url)
      .then((res) => {
        this.isLoading = false
        console.log(res)
        this.product = res.data.data
      })
  }
}
</script>
