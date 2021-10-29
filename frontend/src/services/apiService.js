import axios from 'axios';


const baseUrl = 'http://localhost:3001';

export function getSeason() {
    return axios.get(`${baseUrl}/season`).then(resp => resp.data)
}

export function getTeam(team) {
    return axios.get(`${baseUrl}/team/${team}`).then(resp => resp.data)
}

export function getOptimizedLineup(type) {
    return axios.get(`${baseUrl}/optimized-lineup`).then(({ data }) => {
        let players = [];

        for (let i = 0; i < data.FirstName.length; i++) {
            players.push({
                id: data.X[i],
                name: `${data.FirstName[i]} ${data.LastName[i]}`,
                value: data.Proj_Points[i],
                salary: data.Salary[i],
                team: data.Team[i],
                position: data.Position[i],
            })
        }

        return players;
    })
}