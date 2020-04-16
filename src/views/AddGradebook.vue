<template>
    <div class="container">
        <h2 v-if="$route.name == 'EditGradebook'" class="mt-3">Edit Gradebook</h2>
        <h2 v-else class="mt-3">Add Gradebook</h2>
        <img src="https://cdn0.iconfinder.com/data/icons/school-13/250/School_grades_test-512.png" class="img">
        <div v-for="(error, index) in errors" :key="index" class="alert alert-danger mt-3">
            {{ error[0] }}
        </div>
        <form @submit.prevent>
            <div class="form-group">
                <label><b>Gradebook Name</b></label>
                <input type="text" class="form-control" v-model="gradebook.name" placeholder="Enter Gradebook Name">
                <p><small style="color:gray">*Required field</small></p> 
            </div>
            <div class="form-group">
                <label><b>Select Professor</b></label>
                <select class="form-control" v-model="gradebook.professor_id">
                    <option v-for="professor in freeProfessors" :key="professor.id" v-bind:value="professor.id">
                        {{professor.first_name}} {{professor.last_name}}
                    </option>
                </select>
                <button v-if="$route.name == 'EditGradebook'" class="btn btn-outline-success mt-3" @click="edit()">Edit</button>
                <button v-else class="btn btn-outline-success mt-3" @click="submit()">Add</button>
                <button class="btn btn-outline-warning mt-3 ml-3" @click="cancel()">Cancel</button>
            </div>
        </form>
        <div v-if="$route.name == 'EditGradebook'">
            <p>Students List</p>
            <ul v-for="student in gradebook.students" :key="student.id" class="list-group">
                <div class="list-group-item">
                    {{student.first_name}} {{student.last_name}}
                </div>
            </ul>
        </div>
    </div>
</template>

<script>

import { gradebooksService } from '../services/GradebooksService'
import { professorsService } from '../services/ProfessorsService'

export default {
    data(){
        return{
            gradebook: {},
            freeProfessors: {},
            errors: [],
        }
    },

    methods:{
        submit(){
            gradebooksService.addGradebook(this.gradebook).then(() => {
                if(this.errors.length == 0){
                    this.$router.push({name: 'Gradebook'})
                }
            }).catch(error => {
                this.errors = error.response.data.errors
            })
        },

        edit(){
            
            let gradebookEditRequest = { name: this.gradebook.name, professor_id: this.gradebook.professor_id}

            gradebooksService.editGradebook(this.$route.params.id, gradebookEditRequest).then(() => {
                this.$router.push({name: 'SingleGradebook', params:{id: this.$route.params.id}})
            }).
            catch(error => {
                this.errors = error.response.data.errors
            })
        },

        cancel(){
            this.$router.push({
                name: 'Gradebooks'
            })
        }
    },

    created(){
        
        if(this.$route.name == 'EditGradebook'){
            gradebooksService.getSingle(this.$route.params.id).then(response => {
                this.gradebook = response.data
            })
        }

        professorsService.getFreeProfessors().then(response => {
            this.freeProfessors = response.data
        })
    }
}
</script>

<style>
.img{
    width: 100px;
    height: 100px;
}
</style>