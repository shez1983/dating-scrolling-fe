<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {Service} from "@/apis/interceptors.js";

const router = useRouter()
const authUser = JSON.parse(localStorage.getItem('user'));

const logout = function () {
  Service.delete('logout')
      .then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        router.push({ name: 'login' })
      });
}
</script>

<template>
    <menu>
        <li><router-link :to="{name: 'home'}">Home</router-link></li>
        <li><router-link :to="{name: 'users.index'}">All Users</router-link></li>
        <li><router-link :to="{name: 'register'}">Register</router-link></li>
        <li><router-link :to="{name: 'login'}">Login</router-link></li>
        <li><router-link :to="{name: 'feedback.create'}">Feedback</router-link></li>
        <li><router-link :to="{name: 'blockedUsers.index'}">Blocked Users</router-link></li>
        <li><router-link :to="{name: 'taps.index'}">Taps</router-link></li>
        <li><router-link :to="{name: 'preferences.show'}">Your Preferences</router-link></li>
        <li><router-link :to="{name: 'profile.edit'}">Your Profile</router-link></li>
        <li><router-link :to="{name: 'inboxes.index'}">Inbox</router-link></li>
        <li><router-link :to="{name: 'favourites.index'}">favourites</router-link></li>
        <li><a @click.prevent="logout">Logout</a></li>
    </menu>

  {{ authUser }}
  <RouterView />
</template>