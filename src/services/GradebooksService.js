import { HttpService } from './HttpService'
import store from '../store';

class GradebooksService extends HttpService{

    getGradebooksByUrl(){
        if(store.getters.getNextPageUrl){
            return this.axios.get(store.getters.getNextPageUrl)
        }
    }

    addGradebook(gradebook){
        return this.axios.post('gradebooks/create', gradebook)
    }

    getFreeGradebooks(){
        return this.axios.get('gradebooks/free')
    }

    getMyGradebook(id){
        return this.axios.get(`myGradebook/${id}`)
    }

    getAll(){
        return this.axios.get('gradebooks/all')
    }

    getSingle(id){
        return this.axios.get(`gradebooks/single/${id}`)
    }

    editGradebook(id, gradebook){
        return this.axios.patch(`gradebooks/edit/${id}`, gradebook)
    }
}

export const gradebooksService = new GradebooksService()