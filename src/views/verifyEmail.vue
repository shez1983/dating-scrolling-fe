<script setup>
import {reactive} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: 'shez4@me.com',
  password: '234ddfsdf@',
  password_confirmation: '234ddfsdf@',
});

const submit = function () {
  fetch('http://mm-shez-mm.laravel-sail.site:8080/api/register', {
    body: JSON.stringify(form),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    response.json().then(function () {
      router.push({ name: 'verifyEmail' })
    });
  }).catch(err => {
    console.error(err);
  });
}

</script>

<template>
  <div class="login">
    <h1>Verify Your Email</h1>

    We have sent you an email. Please click on it to verify your email
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
