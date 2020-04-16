import { HttpService } from './HttpService'

class CommentsService extends HttpService{

    addComment(comment){
        return this.axios.post('comments/create', comment)
    }

    remove(id){
        return this.axios.delete(`comments/delete/${id}`)
    }
}

export const commentsService = new CommentsService()