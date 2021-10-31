import Skeleton from 'react-loading-skeleton';
import Player from '../player/Player';

function Lineup({ players, horizontal = false, handleExclude, isLoading }) {
    return (
        <>
            {!isLoading ?
                <div className={`${horizontal ? 'd-flex flex-wrap' : ''}`} style={{ overflow: 'scroll' }}>
                    {players && players.map(p =>
                        <Player
                            key={p.id}
                            {...p}
                            handleExclude={handleExclude}
                            isLoading={isLoading}
                        />
                    )}
                </div>
                :
                <Skeleton count={5} />

            }
        </>

    )
}

export default Lineup;