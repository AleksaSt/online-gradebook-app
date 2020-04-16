<template>
  <div class="container align-items-center">
      <h3 class="mt-3 mr-4">GRADEBOOKS</h3>
      <ul v-for="gradebook in gradebooks" :key="gradebook.id" class="list-group-flush mt-3">
        <li class="list-group-item list-group-item-light mr-5">
          <p class="h5">
            <router-link :to="{name: 'SingleGradebook', params:{id: gradebook.id}}">{{gradebook.name}}</router-link>
          </p>
          <p v-if="gradebook.professor">
            Proffesor name:
            <router-link :to="{name: 'SingleTeacher', params:{id: gradebook.professor.id}}">{{gradebook.professor.first_name}} {{gradebook.professor.last_name}}</router-link> 
          </p>
          <p v-else>
            Professor not available
          </p>
        </li>
      </ul>
      <button v-if="getNextPageUrl" class="btn btn-outline-success mb-3" @click="getGradebooks()">Load More</button>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {

  computed:{
    ...mapGetters({
      getNextPageUrl: 'getNextPageUrl',
      gradebooks: 'getSearchedGradebooks'
    })
  },

  methods:{
    ...mapActions({
      getGradebooks: 'getGradebooksByUrl'
    })
  },

  created(){
    this.getGradebooks()
  }
}
</script>

