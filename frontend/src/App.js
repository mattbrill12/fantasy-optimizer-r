import './App.css';
import Optimizer from './components/optimizer/Optimizer';
import Header from './components/header/Header';


function App() {
  return (
    <div className="App">

      <Header />

      <div className="container">
        <Optimizer />
      </div>

    </div>
  );
}

export default App;