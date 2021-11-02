import Skeleton from 'react-loading-skeleton';
import Player from '../player/Player';

function Lineup({ players, horizontal = false, handleExclude, isLoading }) {
    function renderSkeleton() {
        let cols = [];

        for (let i = 0; i < 3; i++) {
            cols.push(
                <div className="col">
                    <div className="d-flex">
                        <div className="col-3 p-2"><Skeleton circle height="50px" /></div>
                        <div className="col-9"><Skeleton count={3} /></div>

                    </div>
                    <div>
                        <Skeleton count={3} />
                    </div>

                </div>



            );

        }
        return <div className="row">{cols}</div>;
    }
    return (
        <div>
            {!isLoading ?
                <div className={`${horizontal ? 'd-flex flex-wrap lineup' : ''}`} style={{ overflow: 'scroll' }}>
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
                renderSkeleton()
            }
        </div>

    )
}

export default Lineup;