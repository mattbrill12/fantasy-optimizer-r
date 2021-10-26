import logo from './logo.svg';
import './App.css';
import { getSeason, getTeam } from './services/apiService';
import { useEffect, useState } from 'react';

function App() {


  return (
    <div className="App">
      <Header />
      <Chart />
    </div>
  );
}

export default App;

function Header() {

  let [header, setHeader] = useState([])

  async function loadHeader() {
    let resp = await getTeam('LAL');
    setHeader(resp)
  }

  useEffect(() => {
    loadHeader()
  }, [])

  return (
    <h1>{header}</h1>
  )
}
function Chart() {

  let [winRatio, setWinRatio] = useState([])


  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    let resp = await getSeason();
    console.log(resp)
    setWinRatio(resp)
  }

  return (
    <>
      <label>Home</label>
      {
        winRatio && winRatio.map((item, idx) => {
          if (item.visiting === '1')
            return <p key={idx}><b>{item.season}:</b> {item.ratio}</p>
        })
      }
      <label>AWAY</label>
      {
        winRatio && winRatio.map((item, idx) => {
          if (item.visiting === '0')
            return <p key={idx}><b>{item.season}:</b> {item.ratio}</p>
        })
      }
    </>
  )
}