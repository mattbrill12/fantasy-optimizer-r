import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

import Lineup from "../lineup/Lineup";
import { useEffect, useState } from 'react';
import { getOptimizedLineup, getGeneratedLineup } from '../../services/apiService';

function Optimizer({ type, optimizer = true }) {

    const [results, setResults] = useState([]);
    const [numTrials, setNumTrials] = useState(null);

    useEffect(() => {
        loadData(type)
    }, [])

    async function loadData(type) {
        const fn = optimizer ? getOptimizedLineup : getGeneratedLineup;
        const result = await fn(type, numTrials);
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
            <label>Total Salary</label>
            <p>{results.totalSalary}</p>
            <label>Total Projected Points</label>
            <p>{results.totalValue}</p>
            {/* <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="number"
                />
                <label htmlFor="floatingInputCustom"># of trials</label>
            </Form.Floating> */}
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
            <Lineup players={results.draftables} horizontal />
        </>
    )
}

export default Optimizer;