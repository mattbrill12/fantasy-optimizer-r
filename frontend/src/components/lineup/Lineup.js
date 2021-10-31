import Skeleton from 'react-loading-skeleton';
import Player from '../player/Player';

function Lineup({ players, horizontal = false, handleExclude, isLoading }) {
    return (
        <>
            <div className={`${horizontal ? 'd-flex' : ''}`} style={{ overflow: 'scroll' }}>
                {players && players.map(p =>
                    <Player
                        key={p.id}
                        {...p}
                        handleExclude={handleExclude}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </>
    )
}

export default Lineup;