<script setup>
import { useRoute } from 'vue-router'
import {onBeforeMount, ref} from "vue";
import {Service} from "../apis/interceptors.js";

const route = useRoute()
let user = ref({});
let is_favourited = ref(false);

onBeforeMount(() => {
  Service
      .get('profiles/' + route.params.username)
      .then((res) => {
        user.value = res.data.data;
        is_favourited.value = res.data.data.is_favourited;
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

</script>

<template>
  <div class="login">
    <h1>User</h1>

    <span v-if="is_favourited">
      <a @click.prevent="unFavouriteUser">Unfavourite</a>
    </span>
    <span v-else>
      <a @click.prevent="favouriteUser">Favourite</a>
    </span><br/><br/>

    is_favourited  {{ is_favourited }}<br/><br/>
    user  {{ user }}
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
