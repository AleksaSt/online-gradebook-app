<template>
    <div class="container">
        <h2 class="mt-3">Add Professor</h2>
        <img src="https://logodix.com/logo/2094561.jpg" class="img">
        <div v-for="(error, index) in errors" :key="index" class="alert alert-danger mt-3">
            {{ error[0] }}
        </div>
        <div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="professor.first_name" placeholder="Enter First Name">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="professor.last_name" placeholder="Enter Last Name">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="professor.email" placeholder="Enter Email">
            </div>
            <div class="form-group">
                <div class="form-group" v-for="(photo, index) in photos" :key="index">
                    <input type="index" class="form-control" v-model="photos[index]" placeholder="Enter Photo">
                    <button @click="removeImageInput(index)" class="btn btn-default">Remove</button>
                </div>
                <button @click="addImageInput()" class="btn btn-default">Add Image</button>
            </div>
            <div class="form-group">
                <select class="form-control" v-model="professor.gradebook_id">
                    <option v-for="gradebook in freeGradebooks" :key="gradebook.id" v-bind:value="gradebook.id">
                        {{gradebook.name}}
                    </option>
                </select>
            </div>
            <button class="btn btn-success mt-3" @click="submit()">Add</button>
            <button class="btn btn-warning mt-3 ml-3" @click="cancel()">Cancel</button>
        </div>
    </div>
</template>

<script>

import { gradebooksService } from '../services/GradebooksService'
import { professorsService } from '../services/ProfessorsService'

export default {
    data(){
        return{
            professor: {},
            freeGradebooks: [],
            errors: [],
            photos: []
        }
    },

    methods:{
        
        submit(){
            
            let professorRequest = {first_name: this.professor.first_name, last_name: this.professor.last_name, email: this.professor.email, photos:this.photos, gradebook_id: this.professor.gradebook_id}

            professorsService.addProfessor(professorRequest).then(() => {
                
                if(this.errors.length == 0){
                    this.$router.push({name: 'AllProfessors'})
                }
                
            }).catch(error => {
                this.errors = error.response.data.errors
            })
        },

        cancel(){
            this.$router.push({
                name: 'Gradebooks'
            })
        },

        addImageInput(){
            this.photos.push([])
        },

        removeImageInput(index){
            this.photos.splice(index, 1)
        }
    },

    created(){
        gradebooksService.getFreeGradebooks().then(response => {
            this.freeGradebooks = response.data
        })
    }
}
</script>

<style scoped>
.img{
    width: 250px;
    height: 250px;
}
</style>>

