<script setup>
import {onBeforeMount, reactive, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {Service} from "../apis/interceptors.js";

const router = useRouter()
const route = useRoute()
const form = reactive({
  user_id: '',
  name: '',
  subject: '',
  message: '',
});
let user = ref({});
let isDone = ref(false);

onBeforeMount(() => {
  user.value = localStorage.getItem('user');

  if (user.value) {
    form.user_id = user.value.id;
    form.name = user.value.username;
  }
});


const submit = function () {
  Service
      .post('feedbacks', form)
      .then(() => {
        isDone.value = true;
      });
}
</script>

<template>
  <div class="login">
    <h1>Feedback</h1>

    <form v-if="! isDone" @submit.prevent="submit" method="post">
      <label for="name">Name</label>
      <input id="name" name="name" v-model="form.name"> <br/>

      <label for="subject">Subject</label>
      <input id="subject" name="subject" v-model="form.subject"> <br/>

      <label for="message">message</label>
      <input id="message" name="message" v-model="form.message"> <br/>

      <input type="submit" name="Login" value="Login">
    </form>
    <div v-else>
      Thank you for giving us your feedback.
    </div>
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
