import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegTimesCircle } from "react-icons/fa";

import Lineup from "../lineup/Lineup";
import { getOptimizedLineup } from '../../services/apiService';

function Optimizer({ type, sport }) {

    const [results, setResults] = useState([]);
    const [excludes, setExcludes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (sport === 'NFL') loadData(type);
        else setShow(true);
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

    function handleExcludeListClick(player) {

        let index = excludes.indexOf(player);
        excludes.splice(index, 1);
        setExcludes([...excludes]);

    }

    function handleClose() {
        setShow(false);
    }

    return (
        <div className="solutions-container">
            <div className="row">
                <div className="col-10">
                    <div className="row">
                        <div className="col">
                            <label>Total Salary</label>
                            <h4 className="result-value">${results.totalSalary}</h4>
                        </div>
                        <div className="col">
                            <label>Total Projected Points</label>
                            <h4 className="result-value">{results.totalValue && results.totalValue.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Lineup
                                isLoading={isLoading}
                                players={results.draftables}
                                horizontal
                                handleExclude={handleExclude}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="d-flex flex-row-reverse">
                        <div>
                            <Button
                                variant="primary"
                                id="optimize"
                                onClick={() => loadData(type, excludes)}>
                                Optimize
                            </Button>
                            <div>
                                <label>Excluded players</label>

                                {excludes && excludes.map((player, index) =>
                                    <p key={index} onClick={p => handleExcludeListClick(p)}><FaRegTimesCircle />{player.name}</p>
                                )}

                            </div>

                        </div>
                        {/* <div>
                            <Button>
                                <FaBookmark />
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>NBA Optimizer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Coming soon !</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}

export default Optimizer;