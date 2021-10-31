import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import Lineup from "../lineup/Lineup";
import { getOptimizedLineup } from '../../services/apiService';

function Optimizer({ type }) {

    const [results, setResults] = useState([]);
    const [excludes, setExcludes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData(type);
    }, [])

    async function loadData(type, excludes) {
        setResults([]);
        setIsLoading(true);
        const result = await getOptimizedLineup(type, excludes);
        setResults(result);
        setIsLoading(false);
    }

    function handleExclude(player) {
        setExcludes([...excludes, player])
    }
    return (
        <div className="solutions-container">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <label>Total Salary</label>
                            <h4>${results.totalSalary}</h4>
                        </div>
                        <div className="col">
                            <label>Total Projected Points</label>
                            <h4>{results.totalValue && results.totalValue.toFixed(2)}</h4>
                        </div>
                    </div>
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
                isLoading={isLoading}
                players={results.draftables}
                horizontal
                handleExclude={handleExclude}
            />
        </div>
    )
}

export default Optimizer;