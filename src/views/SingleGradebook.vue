<template>
    <div class="container">
        <h3 class="mt-3">
            {{gradebook.name}}
        </h3>
        <p v-if="gradebook.professor"><b>Professor: </b>{{gradebook.professor.first_name}} {{gradebook.professor.last_name}}</p>
        <p v-else>No professor available</p>
        <div v-if="gradebook.students.length" >
            <b>Students:</b>
            <ul class="list-group">
                <li v-for="student in gradebook.students" :key="student.id"  class="list-group-item">
                    {{student.first_name}} {{student.last_name}}
                </li>
            </ul>
        </div>
        <p v-else>No students available</p>
        <div v-if="gradebook.comments.length" class="mt-3">
            <b>Comments:</b>
            <ul class="list-group">
                <li v-for="comment in gradebook.comments" :key="comment.id"  class="list-group-item">
                    {{comment.content}}
                    <div>
                        <button v-if="comment.user_id == user_id" @click="remove(comment.id)" class="btn btn-danger">Remove</button>
                    </div>
                </li>
            </ul>
        </div>
        <p v-else class="mt-3">No comments available</p>
        <div v-for="(error, index) in errors" :key="index" class="alert alert-danger mt-3">
            {{ error[0] }}
        </div>
        <form @submit.prevent>
            <div class="form-group">
                <label><b>Comment:</b></label>
                <textarea class="form-control" v-model="comment.content" placeholder="Add Comment"></textarea>
                <button class="btn btn-success mt-3" @click="submit()">Add</button>
            </div>
        </form>
    </div>
</template>

<script>
import { gradebooksService } from '../services/GradebooksService'
import { commentsService } from '../services/CommentsService'

export default {
    data(){
        return{
            gradebook: {},
            comment: {
                gradebook_id: this.$route.params.id,
                user_id: localStorage.getItem('user_id')
            },
            errors: [],
            user_id: localStorage.getItem('user_id')
        }
    },

    methods:{
        submit(){
            commentsService.addComment(this.comment).then(() => {
                this.comment.content = ''
                this.getGradebook()
            }).
            catch(error => {
                this.errors = error.response.data.error
            })
        },

        remove(id){
            if (window.confirm("Do you really want to remove this comment?")) { 
            
                commentsService.remove(id).then(() => {
    
                    this.getGradebook()
                })
            }
        },

        getGradebook(){

            gradebooksService.getSingle(this.$route.params.id).then(response => {
                this.gradebook = response.data
            })
        }
    },

    created(){
        this.getGradebook()
    }
}
</script>

<style>

</style>