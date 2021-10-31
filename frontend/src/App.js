import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Home from './components/home/Home';
import Solutions from './components/solutions/Solutions';
import Header from './components/header/Header';

import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/solutions/:sport"
                        component={Solutions}
                    />
                </Switch>
            </BrowserRouter>
        </div >
    );
}

export default App;