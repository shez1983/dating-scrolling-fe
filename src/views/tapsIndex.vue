<script setup>
import {reactive, ref, onBeforeMount} from 'vue';
import {Service} from "../apis/interceptors.js";

let users = reactive([]);
let nextPage = ref(1);

const getTaps = function () {
  if (! nextPage.value) {
    return;
  }

  Service
      .get('taps?page=' + nextPage.value)
      .then((res) => {
        users.push(...res.data.data);
        nextPage.value = res.data.links.next;
      })
      .catch((err) => {
        console.log(err);
      });
}

onBeforeMount(() => {
  getTaps();
});

window.onscroll = () => {
  // @todo need to add -50 or something so we actually get the next one WHEN you are about to reach bottom so
  // users DON'T have to see the actual request for next batch
  let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight)
      === (document.documentElement.offsetHeight);

  if (bottomOfWindow) {
    getTaps();
  }
};

</script>
<template>
  <div class="users">
    <h1>Users</h1>

    <table>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ user.username }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.last_seen_at }}</td>
        <td>{{ user.headline }}</td>
        <td>{{ user.image }}</td>
        <td>{{ user.is_favourited }}</td>
        <td>{{ user.last_seen_at }}</td>
        <td>{{ user.username }}</td>
        <td><router-link :to="{name: 'users.show', params: {username: user.username}}">Link to user</router-link></td>
      </tr>

    </table>
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
