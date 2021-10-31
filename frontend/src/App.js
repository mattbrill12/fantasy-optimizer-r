import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


import './App.css';
import Optimizer from './components/optimizer/Optimizer';
import Generator from './components/generator/Generator';
import Header from './components/header/Header';
import Lineup from './components/lineup/Lineup';
import lineupTypes from './shared/constants/lineup-types';
import { getDraftables, getPositions } from './services/apiService';


function App() {

    const [optimizerKey, setOptimizerKey] = useState(lineupTypes.optimizers.dk);
    const [generatorKey, setGeneratorKey] = useState(lineupTypes.generators.dk);
    const [players, setPlayers] = useState([]);
    const [originalPlayers, setOriginalPlayers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        getPositions().then(pos => {
            setPositions(pos);
            let _filters = {}
            pos.forEach(p => { _filters[p] = false });
            setFilters(_filters);
        });
        getDraftables().then(players => {
            setPlayers(players);
            setOriginalPlayers(players);
        });
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
            let filtered = originalPlayers.filter(player => player.position.toLowerCase() === position.toLowerCase());
            setPlayers(filtered)
        }

    }

    return (
        <div className="App">

            <Header />

            <Container>
                <Row>
                    <Col md={3}>
                        <div className="side" style={{ height: '100vh', overflow: 'scroll' }}>
                            <h4>Week 7</h4>

                            <div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="searchPlayers">
                                        <Form.Control
                                            type="text"
                                            placeholder="search players"
                                            onChange={handleSearchFilterChange} />
                                    </Form.Group>

                                    {positions && positions.map(p =>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handlePositionFilterChange(e, p)}
                                            label={p}
                                            inline
                                            id={p}
                                        />
                                    )}

                                </Form>
                            </div>

                            <Lineup players={players} />
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="main">
                            <h1>Linear Programming Solver</h1>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={optimizerKey}
                                onSelect={(k) => setOptimizerKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey={lineupTypes.optimizers.dk} title="Draft Kings Projections">
                                    <Optimizer type={lineupTypes.optimizers.dk} />
                                </Tab>
                                <Tab eventKey={lineupTypes.optimizers.runAvg} title="Running Average Projections">
                                    {/* <Optimizer type={lineupTypes.optimizers.runAvg} /> */}
                                    <p className="invalid">Error loading running average projections</p>
                                </Tab>
                            </Tabs>
                            <h1>Random Walk Generator</h1>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={generatorKey}
                                onSelect={(k) => setGeneratorKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey={lineupTypes.generators.dk} title="Draft Kings Projections">
                                    <Generator type={lineupTypes.generators.dk} optimizer={false} />
                                </Tab>
                                <Tab eventKey={lineupTypes.generators.runAvg} title="Running Average Projections">
                                    <Generator type={lineupTypes.generators.runAvg} optimizer={false} />
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>

            </Container>

        </div >
    );
}

export default App;