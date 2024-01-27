<script setup>
import { useRoute, useRouter } from 'vue-router'
import {computed, onMounted, ref} from "vue";
import {Service} from "../apis/interceptors.js";
import {bodyTypes, ethnicities, genders, lookingFor, orientations, positions} from "@/apis/selectOptions.js";

const route = useRoute()
const router = useRouter()

const authUser = JSON.parse(localStorage.getItem('user'));
let form = ref({
  "id": "",
  "username": "",
  "headline": "",
  "info": "",
  "birth_year": "",
  "show_age": "", // @todo is not passing need to fix
  "age": "",
  "gender": "",
  "relationship_status": "",
  "tribes": [],
  "position": "",
  "weight": "",
  "height": "",
  "ethnicity": "",
  "looking_for": [],
  "orientation": "",
  "body_type": "",
  "images": "", // @todo
});

const submit = function () {
  Service.post('profiles/me', form.value)
    .then((res) => {
        console.log(res);
    });
};

onMounted(() => {
  Service
      .get('profiles/' + authUser.username)
      .then((res) => {
        form.value = res.data.data;
      });
});

const years = computed(() => {
  const year = new Date().getFullYear()
  return Array.from({length: year - 1940}, (value, index) => 1940 + index)
})

const weights = computed(() => {
  return Array.from({length: 50}, (value, index) => 60 + index)
})

const heights = computed(() => {
  const year = new Date().getFullYear()
  return Array.from({length: 100}, (value, index) => 100 + index)
})

</script>

<template>
  <div class="login">
    <h1>User</h1>
    user  {{ form }}

    <form @submit.prevent="submit" method="post">
      <label for="headline">headline</label>
      <input id="headline" v-model="form.headline"> <br/>

      <label for="info">A bit about you</label>
      <textarea id="info" v-model="form.info"></textarea><br/>

      <label for="birth_year">Year you were born</label>
      <select id="birth_year" v-model="form.birth_year">
        <option v-for="year in years"
                :value="year"
                :selected="year === form.birth_year"
        >
          {{ year }}
        </option>
      </select><br/>

      <label for="show_age">Show age?</label>
      <select id="show_age" v-model="form.show_age">
        <option value="1" :selected="form.show_age === 'true'">Yes {{ form.show_age}}</option>
        <option value="0" :selected="form.show_age === 'false'">No {{ form.show_age }}</option>
      </select><br/>

      <label for="gender">gender?</label>
      <select id="gender" v-model="form.gender">
        <option v-for="item in genders"
                :value="item"
                :selected="item === form.gender"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="relationship_status">relationship_status</label>
      <select id="relationship_status" v-model="form.relationship_status">
        <option value="Single">Single</option>
        <option value="Dating">Dating</option>
        <option value="Committed">Committed</option>
      </select><br/>

      <label for="show_age">tribes</label>
      <select id="tribes" v-model="form.tribes" multiple>
        <option value="Bear">Bear</option>
        <option value="Daddy">Daddy</option>
        <option value="Discreet">Discreet</option>
      </select><br/>

<!--      // @todo only for 'gay' so need a v-if -->
      <label for="show_age">position</label>
      <select id="position" v-model="form.position">
        <option v-for="item in positions"
                :value="item"
                :selected="item === form.position"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="weight">weight</label>
      <select id="weight" v-model="form.weight">
        <option v-for="item in weights"
                :value="item"
                :selected="item === form.weight"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="height">height</label>
      <select id="height" v-model="form.height">
        <option v-for="item in heights"
                :value="item"
                :selected="item === form.height"
        >
          {{ item }}
        </option>

        <option v-for="item in genders"
                :value="item"
                :selected="item === form.gender"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="ethnicity">ethnicity?</label>
      <select id="ethnicity" v-model="form.ethnicity">
        <option v-for="e in ethnicities"
                :value="e"
                :selected="h === form.ethnicity"
        >
          {{ e }}
        </option>
      </select><br/>

      <label for="looking_for">looking_for?</label>
      <select id="looking_for" v-model="form.looking_for" multiple>
        <option v-for="item in lookingFor"
                :value="item"
                :selected="item === form.looking_for"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="orientation">orientation?</label>
      <select id="orientation" v-model="form.orientation">
        <option v-for="item in orientations"
                :value="item"
                :selected="item === form.gender"
        >
          {{ item }}
        </option>
      </select><br/>

      <label for="body_type">body_type?</label>
      <select id="body_type" v-model="form.body_type">
        <option v-for="item in bodyTypes"
                :value="item"
                :selected="item === form.body_type"
        >
          {{ item }}
        </option>
      </select><br/>
      <input type="submit" name="Save" value="Save">
    </form>
  </div>
</template>
