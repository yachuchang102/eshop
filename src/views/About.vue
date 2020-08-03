<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  created () {
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
    this.$http.get(url)
      .then((res) => {
        console.log(res.data.data)
      })
  }
}
</script>
