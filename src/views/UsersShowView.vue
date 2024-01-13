<script setup>
import { useRoute, useRouter } from 'vue-router'
import {onBeforeMount, ref} from "vue";
import {Service} from "../apis/interceptors.js";

const route = useRoute()
const router = useRouter()

let user = ref({});
let is_favourited = ref(false);
let is_tapped = ref(false);

onBeforeMount(() => {
  Service
      .get('profiles/' + route.params.username)
      .then((res) => {
        user.value = res.data.data;
        is_favourited.value = res.data.data.is_favourited;
        is_tapped.value = res.data.data.is_tapped;
      });
});

const favouriteUser = function () {
  Service
      .post('favourites/' + route.params.username)
      .then(() => {
        is_favourited.value = true;
      });
}

const unFavouriteUser = function () {
  Service
      .delete('favourites/' + route.params.username)
      .then(() => {
        is_favourited.value = false;
      });
}

const blockUser = function () {
  Service
      .post('blocks/' + route.params.username)
      .then(() => {
        router.go(-1);
      });
}

const tapUser = function () {
  Service
      .post('taps/' + route.params.username)
      .then(() => {
        is_tapped.value = true;
      });
}

// @todo rename localStorage user key to authUser
const authUser = JSON.parse(localStorage.getItem('user'));

</script>

<template>
  <div class="login">
    <h1>User</h1>
    <span v-if="authUser.username !== route.params.username">
      <span v-if="is_favourited">
        <a @click.prevent="unFavouriteUser">Unfavourite User</a>
      </span>

      <span v-else>
        <a @click.prevent="favouriteUser">Favourite User</a>
      </span>

      <br/><br/>

      <span v-if="! is_tapped">
        <a @click.prevent="tapUser">Tap User</a>
      </span>
    </span>

    <br/><br/>

    <a @click.prevent="blockUser">Block User</a>

    is_favourited {{ is_favourited }}<br/><br/>
    user  {{ user }}
  </div>
</template>
