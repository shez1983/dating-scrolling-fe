<script setup>
import {onBeforeMount, reactive, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {Service} from "../apis/interceptors.js";

const router = useRouter()
const route = useRoute()

const form = reactive({
  min_age: '',
  max_age: '',
  relationship_status: '',
  tribes: '',
  positions: '',
  min_weight: '',
  max_weight: '',
  min_height: '',
  max_height: '',
  ethnicities: '',
  body_types: '',
  looking_for: '',
});

const submit = function () {
  Service
      .post('preferences/me', form)
      .then(() => {

      });
}

onBeforeMount(() => {
  Service
      .get(`preferences/me`)
      .then((res) => {
        form.min_age = res.data.data.min_age;
        form.max_age = res.data.data.max_age;
        form.relationship_status = res.data.data.relationship_status;
        form.tribes = res.data.data.tribes;
        form.positions = res.data.data.positions;
        form.min_weight = res.data.data.min_weight;
        form.max_weight = res.data.data.max_weight;
        form.min_height = res.data.data.min_height;
        form.max_height = res.data.data.max_height;
        form.ethnicities = res.data.data.ethnicities;
        form.body_types = res.data.data.body_types;
        form.looking_for = res.data.data.looking_for;
      })
      .catch((err) => {
        console.log(err);
      });
})

</script>

<template>
  <div class="login">
    <h1>Preferences</h1>

    <form @submit.prevent="submit" method="post">
      <label for="min_age">Min Age</label>
      <input id="min_age" v-model="form.min_age"> <br/>

      <label for="max_age">Max Age</label>
      <input id="max_age" v-model="form.max_age"> <br/>

      <label for="min_weight">Min weight</label>
      <input id="min_weight" v-model="form.min_weight"> <br/>

      <label for="max_weight">Max weight</label>
      <input id="max_weight" v-model="form.max_weight"> <br/>

      <label for="min_height">Min height</label>
      <input id="min_height" v-model="form.min_height"> <br/>

      <label for="max_height">Max height</label>
      <input id="max_height" v-model="form.max_height"> <br/>

      <input type="submit" name="Update" value="Update">
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
