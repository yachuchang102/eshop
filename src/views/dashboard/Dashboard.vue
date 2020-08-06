<template>
    <div v-if="checkSuccess">
        <h2>這裡是管理頁面</h2>
        <div id="nav">
        <router-link to="/admin">後台首頁</router-link> |
        <router-link to="/admin/products">產品管理列表</router-link> |
        <router-link to="/admin/coupons">優惠券列表</router-link> |
        <router-link to="/admin/orders">訂單列表</router-link> |
        <router-link to="/admin/images">圖片儲存列表</router-link> |
        <router-link to="/">回前台首頁</router-link> |
        </div>
        <router-view :token="token"/>
    </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)loginName\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}auth/check`
      this.$http.post(api, {
        api_token: this.token
      })
        .then((res) => {
          console.log(res)
          this.checkSuccess = true
        })
        .catch((error) => {
          console.log(error.response)
          this.$router.push('/login')
        })
    }
  }
}
</script>
