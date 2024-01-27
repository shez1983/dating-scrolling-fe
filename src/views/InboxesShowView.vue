<script setup>
import { useRoute, useRouter } from 'vue-router'
import {onBeforeMount, reactive, ref} from "vue";
import {Service} from "../apis/interceptors.js";

const route = useRoute()
const router = useRouter()
let messages = ref(null);
const form = reactive({
  message: 'ssss',
});

onBeforeMount(() => {
  Service
      .get('inboxes/' + route.params.id)
      .then((res) => {
        console.log(res.data.data)
        messages.value = res.data.data;
      });
});

const archiveChat = function () {
  Service
    .delete('inboxes/' + route.params.id)
    .then((res) => {
      router.push({ name: 'inboxes.index' })
    })
}

const submit = function () {
  //inboxes/{id}/messages
  Service
      .post('inboxes/' + route.params.id + '/messages', form)
      .then((res) => {
        // refresh or add it to messages array

        // maybe have it return from api in case of image?
        messages.value.push(form.message)
        form.message = "";
      })
}

</script>

<template>
  <div class="login">
    <a @click.prevent="archiveChat">Archive Chat</a><br/>

    <form @submit.prevent="submit" action="" method="post">
<!--      @todo send image -->
      <textarea v-model="form.message"></textarea>
      <input type="submit" value="send"/>
    </form>

    <div v-for="message in messages" :key="message.id">
      <img style="width:20%" :src="message.sender.image">
      <p>{{ message.text }}</p>
      {{ message.seen_at }}
      {{ message.created_at }}
    </div>
  </div>
</template>
