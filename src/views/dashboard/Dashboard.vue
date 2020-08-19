<template>
    <div>
      <loading  :active.sync="isLoading"></loading>
        <!--Navbar-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="checkSuccess">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">後台首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">產品管理列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/images">圖片儲存列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupons">優惠券列表</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" to="/">回前台首頁</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" to="/admin/customerorder">模擬下單</router-link>
              </li>
            </ul>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="signout">登出</button>
          </div>
        </nav>
        <!--Navbarend-->
        <router-view :token="token" v-if="checkSuccess"/>
    </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false,
      isLoading: false
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
    },
    signout () {
      this.isLoading = true
      // 清除cookie的方式，讓它為空
      document.cookie = 'loginName=; expires=; path=/'
      this.$router.push('/')
      this.isLoading = false
    }
  }
}
</script>
