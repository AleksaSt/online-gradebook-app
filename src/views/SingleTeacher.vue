<template>
    <div class="container">
        <h2>{{professor.first_name}} {{professor.last_name}}</h2>
        <div v-for="image in professor.images" :key="image.id">
            <img :src="image.url" alt="">
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
export default {
    data(){
        return{
            professor: {}
        }
    },

    created(){
        professorsService.getProfessor(this.$route.params.id).then(response => {
            this.professor = response.data
        })
    }
}
</script>

<style>

</style>