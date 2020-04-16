<template>
    <div class="container">
        <div v-if="gradebook.professor">
            <div class="float-left">
                <button class="btn btn-success" @click="$router.push({name: 'AddMyStudent', params:{id: gradebook.id}})">Add New Students</button>
            </div>
            <div class="align-items-center">
                <h3 class="title">
                    {{gradebook.name}}
                </h3>
                <p>Professor: {{gradebook.professor.first_name}} {{gradebook.professor.last_name}}</p>
                <div v-if="gradebook.students.length" >
                    Students: 
                    <ul class="list-group">
                        <li v-for="student in gradebook.students" :key="student.id"  class="list-group-item">
                            {{student.first_name}} {{student.last_name}}
                        </li>
                    </ul>
                </div>
                <p v-else>No students available</p>
            </div>
        </div>
        <div v-else>
            You are not assigned to any gradebook
        </div>
    </div>
</template>

<script>

import { gradebooksService } from '../services/GradebooksService'
export default {
    data(){
        return{
            gradebook: {}
        }
    },

    created(){
        gradebooksService.getMyGradebook(localStorage.getItem('user_id')).then(response => {
            this.gradebook = response.data
        })

    }
}
</script>

<style>
.title{
    margin-right: 160px;
    margin-top: 15px;
}
</style>