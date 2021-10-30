import Player from '../player/Player';

function Lineup({ players, horizontal = false, handleExclude }) {
    return (
        <div className={`${horizontal ? 'd-flex' : ''}`} style={{ overflow: 'scroll' }}>
            {players && players.map(p => <Player key={p.id} {...p} handleExclude={handleExclude} />)}
        </div>
    )
}

export default Lineup;