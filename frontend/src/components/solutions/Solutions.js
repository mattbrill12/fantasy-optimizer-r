import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Skeleton from 'react-loading-skeleton';
import { useParams } from "react-router-dom";

import Optimizer from '../../components/optimizer/Optimizer';
import Generator from '../../components/generator/Generator';
import Lineup from '../../components/lineup/Lineup';
import lineupTypes from '../../shared/constants/lineup-types';
import { getDraftables, getPositions, getNBADraftables } from '../../services/apiService';

function Solutions() {

    const { sport } = useParams();
    const [optimizerKey, setOptimizerKey] = useState(lineupTypes.optimizers.dk);
    const [generatorKey, setGeneratorKey] = useState(lineupTypes.generators.dk);
    const [players, setPlayers] = useState([]);
    const [originalPlayers, setOriginalPlayers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [savedLineup, setSavedLineup] = useState([]);

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {

        if (sport === 'NFL') {
            getPositions().then(pos => {
                setPositions(pos);
                let _filters = {}
                pos.forEach(p => { _filters[p] = false });
                setFilters(_filters);
            });
            getDraftables().then(players => {
                setPlayers(players);
                setOriginalPlayers(players);
                setIsLoading(false);
            });
        } else {
            getNBADraftables().then(players => {
                setPlayers(players);
                setOriginalPlayers(players);
                setIsLoading(false);
            });
        }

    }

    function handleSearchFilterChange(e) {
        let searchString = e.target.value.trim().toLowerCase()

        if (searchString) {
            let filtered = originalPlayers.filter(player => player.name.toLowerCase().includes(e.target.value))
            setPlayers(filtered);
        }
        else
            setPlayers(originalPlayers)
    }

    function handlePositionFilterChange(e, position) {
        const isChecked = e.target.checked;
        filters[position] = isChecked;
        setFilters(filters);

        if (isChecked) {
            let filtered = []
            Object.keys(filters).forEach(filter => {
                if (filter || filter === position)
                    filtered.push(
                        ...originalPlayers.filter(player => player.position === position)
                    );

            });
            setPlayers(filtered)
        }

    }

    function renderSkeleton() {
        let rows = [];

        for (let i = 0; i < 5; i++) {
            rows.push(
                <div className="row">
                    <div className="col-3"><Skeleton circle height="35%" /></div>
                    <div className="col-9"><Skeleton count={5} /></div>
                </div>
            );

        }
        return <div>{rows}</div>;
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={3}>
                        <div className="side p-2">
                            <div className="sticky px-2 pt-2">
                                <h4 className="mb-4">Week 7</h4>
                                <Form>
                                    <Form.Group className="mb-3" controlId="searchPlayers">
                                        <Form.Control
                                            type="text"
                                            placeholder="search players"
                                            onChange={handleSearchFilterChange} />
                                    </Form.Group>

                                    {positions && positions.map(p =>
                                        <Form.Check
                                            key={p}
                                            type="checkbox"
                                            onChange={(e) => handlePositionFilterChange(e, p)}
                                            label={p}
                                            inline
                                            id={p}
                                        />
                                    )}
                                </Form>
                                <div className="d-flex flex-row-reverse">
                                    <p>{players.length} players</p>
                                </div>
                            </div>

                            <div className="draftable-players">
                                {!isLoading ?
                                    <Lineup players={players} />
                                    :
                                    renderSkeleton()
                                }

                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="main">

                            <div className="solutions-container p-4">
                                <h4 className="mb-4">Linear Programming Solver</h4>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={optimizerKey}
                                    onSelect={(k) => setOptimizerKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey={lineupTypes.optimizers.dk} title="Draft Kings Projections">
                                        <Optimizer type={lineupTypes.optimizers.dk} sport={sport} />
                                    </Tab>
                                    <Tab eventKey={lineupTypes.optimizers.runAvg} title="Running Average Projections">
                                        {/* <Optimizer type={lineupTypes.optimizers.runAvg} sport={sport}/> */}
                                        <p className="invalid">Error loading running average projections</p>
                                    </Tab>
                                </Tabs>
                            </div>

                            <div className="solutions-container p-4">
                                <h4 className="mb-4">Random Walk Generator</h4>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={generatorKey}
                                    onSelect={(k) => setGeneratorKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey={lineupTypes.generators.dk} title="Draft Kings Projections">
                                        <Generator type={lineupTypes.generators.dk} optimizer={false} sport={sport} />
                                    </Tab>
                                    <Tab eventKey={lineupTypes.generators.runAvg} title="Running Average Projections">
                                        <Generator type={lineupTypes.generators.runAvg} optimizer={false} sport={sport} />
                                    </Tab>
                                </Tabs>
                            </div>

                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Solutions;