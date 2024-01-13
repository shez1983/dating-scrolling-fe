<script setup>
  // @todo rename localStorage user key to authUser
  const authUser = JSON.parse(localStorage.getItem('user'));
</script>

<template>
  {{ authUser }}

  <menu>
    <ul>
      <li><router-link :to="{name: 'home'}">Home</router-link></li>
      <li><router-link :to="{name: 'users.index'}">All Users</router-link></li>
      <li><router-link :to="{name: 'register'}">Register</router-link></li>
      <li><router-link :to="{name: 'login'}">Login</router-link></li>
      <li><router-link :to="{name: 'feedback.create'}">Feedback</router-link></li>
      <li><router-link :to="{name: 'blockedUsers.index'}">Blocked Users</router-link></li>
      <li><router-link :to="{name: 'taps.index'}">Taps</router-link></li>
      <li><router-link :to="{name: 'preferences.show'}">Your Preferences</router-link></li>
      <li><router-link :to="{name: 'users.show', params: {username: authUser.username}}">Your Profile</router-link></li>
    </ul>
  </menu>
  <RouterView />
</template>
