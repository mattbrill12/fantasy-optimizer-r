import Player from '../player/Player';

function Lineup() {

    let players = [{
        id: 1,
        name: 'Joe Smith',
        salary: 10000,
        value: 30,
        position: 'Q'
    }, {
        id: 2,
        name: 'John Smith',
        salary: 10000,
        value: 30,
        position: 'Q'
    }]

    return (
        <>
            <h1>Lineup</h1>
            {players && players.map(p => <Player key={p.id} {...p} />)}

        </>)
}

export default Lineup;