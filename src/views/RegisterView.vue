<script setup>
import {reactive, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: 'shez4@me.com',
  password: '234ddfsdf@',
  password_confirmation: '234ddfsdf@',
});

let response = ref(null);

const submit = function () {
  fetch(import.meta.env.VITE_API_URL + 'register', {
    body: JSON.stringify(form),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(data => {
    if (data.status === 201) {
      response.value = null;
      router.push({ name: 'verifyEmail' })
    } else {
      data.json().then(function (jsonData) {
        response.value = jsonData;
      });
    }
  }).catch(err => {
    console.error(err);
  });
}

</script>

<template>
  <div class="login">
    <h1>Register</h1>

    {{ response }} <br/><br/>

    <span v-if="response && response.errors" class="error">
       There are some errors, please fix & try again
    </span>

    <form @submit.prevent="submit" method="post">
      <label for="email">Email</label>
      <input id="email" v-model="form.email">
      <span v-if="response && response.errors.email">
         {{ response.errors.email[0] }}
      </span>
      <br/>

      <label for="password">Password</label>
      <input id="password" v-model="form.password">
      <span v-if="response && response.errors.password">
         {{ response.errors.password }}
      </span>
      <br/>

      <label for="password_confirmation">Password Confirmation</label>
      <input id="password_confirmation" v-model="form.password_confirmation">
      <span v-if="response && response.errors.password_confirmation">
         {{ response.errors.password_confirmation }}
      </span>
      <br/>

      <input type="submit" name="Register" value="Register">
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
