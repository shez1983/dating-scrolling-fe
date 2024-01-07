<script setup>
import {reactive, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: 'shez4@me.com',
  password: '234ddfsdf@',
});

const submit = function () {
  fetch('http://localhost/api/login', {
    body: JSON.stringify(form),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    response.json().then(function (res) {
      localStorage.setItem('token', res.token);
      router.push({ name: 'users.index' })
    });
  }).catch(err => {
    console.error(err);
  });
}

</script>

<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="submit" method="post">
      <label for="email">Email</label>
      <input id="email" name="email" v-model="form.email"> <br/>

      <label for="password">Password</label>
      <input id="password" name="password" v-model="form.password"><br/>

      <input type="submit" name="Login" value="Login">
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
