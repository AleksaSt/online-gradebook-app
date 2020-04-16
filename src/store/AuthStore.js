import { authService } from "../services/AuthService";

export const AuthStore = {

    state:{
        token: localStorage.getItem('token'),
        loginErrors: null
    },

    mutations:{
        setLoginErrors(state, errors){
            state.loginErrors = errors
        },

        setToken(state, token){
            state.token = token
        }
    },
    
    actions:{
        async login(context, credentials){
            try{
                const response = await authService.login(credentials)
                authService.setHeaders({
                    Authorization: `Bearer ${response.data.token}`
                })

                context.commit('setLoginErrors', null)
                context.commit('setToken', response.data.token)                
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.user_id)

            }catch(exception){
                context.commit('setLoginErrors', exception.response.data.error)
            }
        },

        async logout(context){
            context.commit('setToken', null)
            localStorage.removeItem('token')
        }
    },

    getters:{

        getLoginErrors(state){
            return state.loginErrors
        },

        isUserLoggedIn(state){
            return !!state.token
        }
    }
}