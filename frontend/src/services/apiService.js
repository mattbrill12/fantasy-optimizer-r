import axios from 'axios';


const baseUrl = 'http://localhost:3001';

export function getSeason() {
    return axios.get(`${baseUrl}/season`).then(resp => resp.data)
}

export function getTeam(team) {
    return axios.get(`${baseUrl}/team/${team}`).then(resp => resp.data)
}