import { professorsService } from "../services/ProfessorsService";

export const ProfessorStore = {

    state:{
        professors: [],
        next_page_url: 'professors',
        searchTerm: ''
    },

    mutations:{
        extendsProfessors(state, professors){
            state.professors.push(... professors)
        },

        setNextPageUrl(state, url){
            state.next_page_url = professorsService.parseUrl(url)
        },

        setSearchTerm(state, term){
            state.searchTerm = term
        }
    },
    
    actions:{
        async getProfessorsByUrl(context){
            try{

                const response = await professorsService.getProfessorsByUrl()
                
                context.commit('extendsProfessors', response.data.data)
                context.commit('setNextPageUrl', response.data.next_page_url)
            }catch{
                //eslint-disable-line
            }
        }
    },

    getters:{

        getProfessorNextPageUrl(state){
            return state.next_page_url
        },

        getProfessors(state){
            return state.professors
        },

        getSearchedProfessors(state){
            return state.professors.filter(professor => {
                return professor.first_name.toLowerCase().includes(state.searchTerm.toLowerCase())
            })
        }
    }
}