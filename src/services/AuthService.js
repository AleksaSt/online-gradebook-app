import { HttpService } from './HttpService'

class AuthService extends HttpService{

    register(user){
        return this.axios.post('register', user)
    }

    login(credentials){
        return this.axios.post('login', credentials)
    }
}

export const authService = new AuthService()