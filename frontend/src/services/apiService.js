import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export function getNBADraftables() {
    return axios
        .get('https://api.draftkings.com/draftgroups/v1/draftgroups/58616/draftables?format=json')
        .then(resp => formatNBADraftables(resp.data));
}

export function getDraftables() {
    return axios
        .get(`${baseUrl}/draftables`)
        .then(resp => formatDraftables(resp.data));
}

export function getPositions() {
    return axios
        .get(`${baseUrl}/positions`)
        .then(resp => resp.data);
}

export function getOptimizedLineup(type, excludes = []) {
    let url = `${baseUrl}/optimized-lineup/${type}`;
    return axios.post(url, excludes).then(({ data }) => {
        let result = {}
        result.draftables = formatData(data)
        result.totalValue = data.Proj_Points.reduce((a, b) => a + b)
        result.totalSalary = data.Salary.reduce((a, b) => a + b)
        return result;
    })
}

export function getGeneratedLineup(type, numTrials) {
    let url = `${baseUrl}/generated-lineup/${type}`;
    if (numTrials) url = `${url}?numTrials=${numTrials}`;
    return axios.get(url).then(({ data }) => {
        let result = {}
        result.draftables = formatData(data)
        result.totalValue = data.Proj_Points.reduce((a, b) => a + b)
        result.totalSalary = data.Salary.reduce((a, b) => a + b)
        return result;
    })
}

//
//  HELPERS
//
const formatData = data => {
    let players = [];

    // TODO refactor in BE
    for (let i = 0; i < data.firstname.length; i++) {
        players.push({
            id: data.id[i],
            name: `${data.firstname[i]} ${data.lastname[i]}`,
            value: data.Proj_Points[i],
            salary: data.Salary[i],
            team: data.Team[i],
            position: data.Pos[i],
            runAvg: data.roll_average_points[i],
        })
    }

    return players;
}

const formatDraftables = data => {

    let draftables = data.map(x => {
        return {
            id: x.playerId,
            name: `${x.firstName} ${x.lastName}`,
            salary: x.salary,
            position: x.position,
            value: parseInt(x.draftStatAttributes[0].value),
            team: x.teamAbbreviation
        }
    })

    return draftables.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

}

const formatNBADraftables = data => {

    let draftables = data.draftables.map(x => {
        return {
            id: x.playerId,
            name: `${x.firstName} ${x.lastName}`,
            salary: x.salary,
            position: x.position,
            value: parseInt(x.draftStatAttributes[0].value),
            team: x.teamAbbreviation
        }
    })

    return draftables.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

}