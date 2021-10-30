import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import Lineup from "../lineup/Lineup";
import { getOptimizedLineup } from '../../services/apiService';

function Optimizer({ type }) {

    const [results, setResults] = useState([]);
    const [excludes, setExcludes] = useState([]);

    useEffect(() => {
        loadData(type);
    }, [])

    async function loadData(type, excludes) {
        setResults([]);
        const result = await getOptimizedLineup(type, excludes);
        setResults(result);
    }

    function handleExclude(player) {
        setExcludes([...excludes, player])
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <label>Total Salary</label>
                    <p>{results.totalSalary}</p>
                    <label>Total Projected Points</label>
                    <p>{results.totalValue}</p>
                </div>
                <div className="col">
                    <div className="d-flex flex-row-reverse">
                        <div>
                            <Button
                                variant="primary"
                                id="optimize"
                                onClick={() => loadData(type, excludes)}>
                                Optimize
                            </Button>
                            <ul>
                                {excludes && excludes.map((player, index) =>
                                    <li key={index}>{player.name}</li>
                                )}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>



            <Lineup
                players={results.draftables}
                horizontal
                handleExclude={handleExclude}
            />
        </>
    )
}

export default Optimizer;