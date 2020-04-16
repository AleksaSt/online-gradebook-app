import { HttpService } from './HttpService'

class StudentsService extends HttpService{

    addStudent(student){
        return this.axios.post('students/create', student)
    }
}

export const studentsService = new StudentsService()