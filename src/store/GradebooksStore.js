import { gradebooksService } from "../services/GradebooksService";

export const GradebooksStore = {

    state:{
        gradebooks: [],
        next_page_url: 'gradebooks',
        searchTerm: ''
    },

    mutations:{
        extendsGradebooks(state, gradebooks){
            state.gradebooks.push(... gradebooks)
        },

        setNextPageUrl(state, url){
            state.next_page_url = gradebooksService.parseUrl(url)
        },

        setSearchTerm(state, term){
            state.searchTerm = term
        }
    },
    
    actions:{
        async getGradebooksByUrl(context){
            try{

                const response = await gradebooksService.getGradebooksByUrl()
                
                context.commit('extendsGradebooks', response.data.data)
                context.commit('setNextPageUrl', response.data.next_page_url)
            }catch{
                //eslint-disable-line
            }
        }
    },

    getters:{

        getNextPageUrl(state){
            return state.next_page_url
        },

        getGradebooks(state){
            return state.gradebooks
        },

        getSearchedGradebooks(state){
            return state.gradebooks.filter(gradebook => {
                return gradebook.name.toLowerCase().includes(state.searchTerm.toLowerCase())
            })
        }
    }
}