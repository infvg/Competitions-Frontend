import axios from 'axios'
const pre = `http://localhost:8080`
class CompetitionDataReceiver {

    retrieveAllCompetitions(name) {
        return axios.get(`${pre}/competitions`)
    }

    retrieveCompetition(name, compId) {
        return axios.get(`${pre}/competitions/${compId}`)
    }
    getTeams(name, compId) {
        return axios.get(`${pre}/competitions/${compId}/teams`)
    }
    getStudentsInTeam(name, compId, teamId) {
        return axios.get(`${pre}/competitions/${compId}/teams/${teamId}/students`)
    }
    getStudent(name, compId, teamId, studentId) {
        return axios.get(`${pre}/competitions/${compId}/teams/${teamId}/students/${studentId}`)
 
    }
    addCompetition(name, comp){
        return axios.post(`${pre}/competitions`,comp)
    }
    addTeam(name, compId, team){
        return axios.post(`${pre}/competitions/${compId}/team`,team)
    }
    modifyCompetition(name, comp){
        return axios.put(`${pre}/competitions`,comp)
    }
    modifyTeam(name, compId, team){
        return axios.put(`${pre}/competitions/${compId}/team`,team)
    }
    deleteCompetition(name, comp){
        return axios.delete(`${pre}/competitions`,comp)
    }
    deleteTeam(name, compId, team){
        return axios.delete(`${pre}/competitions/${compId}/team`,team)
    }
}