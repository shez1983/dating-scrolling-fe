<script setup>
import { useRoute, useRouter } from 'vue-router'
import {onBeforeMount, ref} from "vue";
import {Service} from "../apis/interceptors.js";

const route = useRoute()
const router = useRouter()
let inboxes = ref(null);

onBeforeMount(() => {
  Service
      .get('inboxes')
      .then((res) => {
        console.log(res.data.data)
        inboxes.value = res.data.data;
      });
});
/**
 * "id" => $this->id,
 *             "other_user" => [
 *                 'username' => $otherUser->username,
 *                 'headline' => $otherUser->headline,
 *                 'image' => $otherUser->cover_image,
 *             ],
 *             "message" => [
 *                 "text" => $this->lastMessage->truncated_text,
 *                 "created_at" => $this->lastMessage->created_at,
 *                 "seen_at" => $this->lastMessage->seen_at,
 *             ],
 */
</script>

<template>
  <div class="login">
    <div v-for="inbox in inboxes" :key="inbox.id">
        <img style="width:20%" :src="inbox.other_user.image" alt="inbox.other_user.username"/>
        <p>{{ inbox.message.text }}</p>
<!--      @todo check if message is image? -->
        <router-link :to="{name: 'inboxes.show', params: {id: inbox.id}}">Inbox</router-link>

    </div>
  </div>
</template>
