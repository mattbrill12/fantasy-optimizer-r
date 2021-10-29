import { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './App.css';
import Optimizer from './components/optimizer/Optimizer';
import Header from './components/header/Header';


function App() {

  const [key, setKey] = useState('dk');

  return (
    <div className="App">

      <Header />

      <div className="container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="dk" title="Draft Kings">
            <Optimizer type={'dk'} />
          </Tab>
          <Tab eventKey="runAvg" title="Running Avg">
            <Optimizer type={'runAvg'} />
          </Tab>

          {/*  */}
          <Tab eventKey="randomWalk" title="Random Walk">
            <Optimizer type={'randomWalk'} />
          </Tab>
          <Tab eventKey="runAvg" title="Random Walk">
            <Optimizer type={'randomWalk'} />
          </Tab>
        </Tabs>

      </div>

    </div>
  );
}

export default App;