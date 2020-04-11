import { HttpService } from './HttpService'
import store from '../store';

class GradebooksService extends HttpService{

    getGradebooksByUrl(){
        if(store.getters.getNextPageUrl){
            return this.axios.get(store.getters.getNextPageUrl)
        }
    }
}

export const gradebooksService = new GradebooksService()