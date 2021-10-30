import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './App.css';
import Optimizer from './components/optimizer/Optimizer';
import Header from './components/header/Header';
import Lineup from './components/lineup/Lineup';
import lineupTypes from './shared/constants/lineup-types';
import { getDraftables } from './services/apiService';

function App() {

    const [optimizerKey, setOptimizerKey] = useState(lineupTypes.optimizers.dk);
    const [generatorKey, setGeneratorKey] = useState(lineupTypes.generators.dk);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const players = await getDraftables();
        setPlayers(players)
    }

    return (
        <div className="App">

            <Header />

            <Container>
                <Row>
                    <Col md={3}>
                        <div className="side" style={{ height: '100vh', overflow: 'scroll' }}>
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
                                    <Optimizer type={lineupTypes.generators.dk} optimizer={false} />
                                </Tab>
                                <Tab eventKey={lineupTypes.generators.runAvg} title="Running Average Projections">
                                    <Optimizer type={lineupTypes.generators.runAvg} optimizer={false} />
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