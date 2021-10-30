import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export function getDraftables() {
    return axios.get(`${baseUrl}/draftables`).then(resp => formatDraftables(resp.data))
}

export function getOptimizedLineup(type) {
    let url = `${baseUrl}/optimized-lineup`;
    return axios.get(url).then(({ data }) => formatData(data))
}

export function getGeneratedLineup(type) {
    let url = `${baseUrl}/generated-lineup/1`;
    return axios.get(url).then(({ data }) => formatData(data))
}

//
//  HELPERS
//
const formatData = data => {
    let players = [];

    // TODO refactor in BE
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
}

const formatDraftables = data => {
    return data.map(x => {
        return {
            id: x.playerId,
            name: `${x.firstName} ${x.lastName}`,
            salary: x.salary,
            position: x.position,
            value: parseInt(x.draftStatAttributes[0].value),
            team: x.teamAbbreviation

        }
    })

}