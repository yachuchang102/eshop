<template>
  <div id="app">
    <Toast />
    <router-view/>
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue'
import 'bootstrap'
export default {
  components: {
    Toast
  },
  data () {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';
#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
