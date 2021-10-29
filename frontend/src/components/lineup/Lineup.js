import Player from '../player/Player';

function Lineup({ players, horizontal = false }) {
    return (
        <div className={`${horizontal ? 'd-flex' : ''}`}>
            {players && players.map(p => <Player key={p.id} {...p} />)}
        </div>
    )
}

export default Lineup;