<template>
  <div class="container align-items-center">
      <h3 class="mt-3 mr-4">PROFESSORS</h3>
      <ul v-for="professor in professors" :key="professor.id" class="list-group-flush mt-3">
        <li class="list-group-item list-group-item-light mr-5">
          <p class="h5">
            {{professor.first_name}} {{professor.last_name}}
          </p>
          <p v-if="professor.gradebook">
            Gradebook:
           {{professor.gradebook.name}}
          </p>
          <p v-else>
            Gradebook not available
          </p>
        </li>
      </ul>
      <button v-if="getNextPageUrl" class="btn btn-outline-success mb-3" @click="getProfessors()">Load More</button>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {

  computed:{
    ...mapGetters({
      getNextPageUrl: 'getProfessorNextPageUrl',
      professors: 'getSearchedProfessors'
    })
  },

  methods:{
    ...mapActions({
      getProfessors: 'getProfessorsByUrl'
    })
  },

  created(){
    this.getProfessors()
  }
}
</script>