import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import Lineup from "../lineup/Lineup";
import { useEffect, useState } from 'react';
import { getGeneratedLineup } from '../../services/apiService';

function Generator({ type }) {

    const [results, setResults] = useState([]);
    const [numTrials, setNumTrials] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData(type);
    }, [])

    async function loadData(type) {
        const result = await getGeneratedLineup(type, numTrials);
        setResults(result);
        setIsLoading(false)
    }

    function handleUpdate() {
        setResults([]);
        setIsLoading(true);
        getGeneratedLineup(type, numTrials).then(resp => {
            setResults(resp);
            setIsLoading(false);
        });

    }

    return (
        <div>
            <div className="row">
                <div className="col-8">
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
                <div className="col-4">
                    <div className="d-flex flex-row-reverse">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Number of Trials"
                                aria-label="Number of Trials"
                                onChange={(e) => setNumTrials(e.target.value)}
                            />
                            <Button
                                variant="primary"
                                id="num-trial-generator"
                                onClick={handleUpdate}>
                                Optimize
                            </Button>
                        </InputGroup>
                    </div>

                </div>
            </div>

            <Lineup
                isLoading={isLoading}
                players={results.draftables}
                horizontal />
        </div>
    )
}

export default Generator;