<template>
    <div class="container">
        <div v-if="errors" class="alert alert-danger mt-3">
            {{ errors }}
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwmt1uaVWqZT0sBJPuX2f_X4JbXJfXlAdRMDt7EOnaAytp99TxQ&s" class="img">
        <form @submit.prevent>
            <div class="form-group">
                 <label><b>Email</b></label>
                <input type="text" class="form-control" v-model="user.email" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label><b>Password</b></label>
                <input type="password" class="form-control" v-model="user.password" placeholder="Enter your password">
            </div>
            <button @click="submit()" class="btn btn-success">Login</button>
        </form>
    </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
    data(){
        return{
            user: {}
        }
    },

    computed:{
        ...mapGetters({
            errors: 'getLoginErrors'
        })
    },

    methods:{
        ...mapActions({
            login: 'login'
        }),

        submit(){
            this.login(this.user).then(() => {
                if(!this.errors){
                    this.$router.push({name: 'Gradebooks'})
                }
            })
        }
    }
}
</script>

<style>
.img{
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>