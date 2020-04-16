<template>
    <div class="container">
        <h3 class="mt-3">Add Student</h3>
        <img src="https://cdn2.iconfinder.com/data/icons/professional-4/64/74-512.png" class="img">
        <div v-for="(error, index) in errors" :key="index" class="alert alert-danger mt-3">
            {{ error[0] }}
        </div>
        <form @submit.prevent>
            <div class="form-group">
                <label><b>First Name</b></label>
                <input type="text" class="form-control" v-model="student.first_name" placeholder="Enter First Name">
            </div>
            <div class="form-group">
                <label><b>Last Name</b></label>
                <input type="text" class="form-control" v-model="student.last_name" placeholder="Enter Last Name">
            </div>
            <div class="form-group">
                <label><b>Image</b></label>
                <input type="text" class="form-control" v-model="student.photo" placeholder="Enter Image">
            </div>
            <div v-if="$route.name === 'AddStudent'" class="form-group">
                <label><b>Select Gradebook</b></label>
                <select v-model="student.gradebook_id" class="form-control">
                    <option v-for="gradebook in gradebooks" :key="gradebook.id" v-bind:value="gradebook.id">
                        {{gradebook.name}}
                    </option>
                </select>
            </div>
            <button class="btn btn-outline-success mt-3" @click="submit()">Add</button>
        </form>
    </div>
</template>

<script>

import { studentsService } from '../services/StudentsService'
import { gradebooksService } from '../services/GradebooksService'

export default {
    data(){
        return{
            student: {
                gradebook_id: this.$route.params.id
            },
            errors: [],
            gradebooks: []
        }
    },

    methods:{
        submit(){
            studentsService.addStudent(this.student).then(() => {
                if(!this.errors.length && this.$route.name === 'AddStudent'){
                    this.$router.push({name: 'SingleTeacher', params:{id: this.student.gradebook_id}})
                }else if(!this.errors.length && this.$route.name === 'AddMyStudent'){
                    this.$router.push({name: 'MyGradebook'})
                }
            }).
            catch(error => {
                this.errors = error.response.data.errors
            })
        }
    },

    created(){

        gradebooksService.getAll().then(response => {
            this.gradebooks = response.data
        })
    }
}
</script>

<style>

</style>