import { HttpService } from './HttpService'
import store from '../store';

class ProfessorsService extends HttpService{

    getProfessorsByUrl(){
        if(store.getters.getNextPageUrl){
            return this.axios.get(store.getters.getProfessorNextPageUrl)
        }
    }

    getFreeProfessors(){
        return this.axios.get('professors/free')
    }

    addProfessor(professor){
        return this.axios.post('professors/create', professor)
    }

    getProfessor(id){
        return this.axios.get(`professors/single/${id}`)
    }
}

export const professorsService = new ProfessorsService()