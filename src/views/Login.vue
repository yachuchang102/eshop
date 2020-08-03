<template>
    <div class="text-center">
            <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control"
            v-model="user.email" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control"
            v-model="user.password" placeholder="Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="button" @click="signin">登入</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
          </form>
    </div>
</template>

<style>
    html,
body {
  height: 100vh;
  text-align:center;
}

body {
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    signin () {
    },
    getData () {
    }
  }
}
</script>
