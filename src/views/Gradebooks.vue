<template>
  <div class="container align-items-center">
      <h3 class="mt-3 mr-4">GRADEBOOKS</h3>
      <ul v-for="gradebook in gradebooks" :key="gradebook.id" class="list-group-flush mt-3">
        <li class="list-group-item list-group-item-light mr-5">
          <p class="h5">
            {{gradebook.name}}
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

