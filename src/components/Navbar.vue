<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">Gradebooks</a>
              </li>
              <li v-if="!isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li v-if="!isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/register">Register</a>
              </li>
              <li v-if="isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/teachers">All Professors</a>
              </li>
              <li v-if="isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/my-gradebook">My Gradebook</a>
              </li>
              <li v-if="isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/gradebooks/create">Add Gradebook</a>
              </li>
              <li v-if="isUserLoggedIn" class="nav-item active">
                <a class="nav-link" href="/professors/create">Add Professor</a>
              </li>
              <li v-if="isUserLoggedIn" class="nav-item active">
                <a class="nav-link" @click="logoutUser()" href="/logout">Logout</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" @input="setSearchTerm($event.target.value)" type="search" placeholder="Search" aria-label="Search">
          </form>
        </div>
      </nav>
    </div>
</template>

<script>

import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
   computed:{
        ...mapGetters({
            isUserLoggedIn: 'isUserLoggedIn'
        })
    },

    methods:{
        ...mapActions({
            logout: 'logout'
        }),

        ...mapMutations({
            setSearchTerm: 'setSearchTerm'
        }),

        logoutUser(){
            this.logout().
            then(() =>{
                this.$router.push({name: 'Gradebooks'})
            })
        }
    }
}
</script>