import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import Lineup from "../lineup/Lineup";
import { useEffect, useState } from 'react';
import { getGeneratedLineup } from '../../services/apiService';

function Generator({ type }) {

    const [results, setResults] = useState([]);
    const [numTrials, setNumTrials] = useState(null);

    useEffect(() => {
        loadData(type)
    }, [])

    async function loadData(type) {
        const result = await getGeneratedLineup(type, numTrials);
        setResults(result)
    }

    function handleUpdate() {
        setResults([])
        getGeneratedLineup(type, numTrials).then(resp => {
            setResults(resp)
        });

    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <label>Total Salary</label>
                            <h3>${results.totalSalary}</h3>
                        </div>
                        <div className="col">
                            <label>Total Projected Points</label>
                            <h3>{results.totalValue && results.totalValue.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
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

            <Lineup players={results.draftables} horizontal />
        </>
    )
}

export default Generator;