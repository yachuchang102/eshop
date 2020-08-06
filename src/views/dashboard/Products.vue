<template>
    <div>
        <h2>後台產品管理列表</h2>
    </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['token'],
  data () {
    return {
      products: []
    }
  },
  created () {
    const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`
    this.$http.get(api)
      .then((res) => {
        console.log(res)
        this.products = res.data.data
      })
  }
}
</script>
