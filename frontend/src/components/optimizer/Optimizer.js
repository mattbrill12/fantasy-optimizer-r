import Button from 'react-bootstrap/Button'

import Lineup from "../lineup/Lineup";
import { useEffect, useState } from 'react';
import { getOptimizedLineup, getGeneratedLineup } from '../../services/apiService';

function Optimizer({ type, optimizer = true }) {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        // loadData()
    }, [])

    async function loadData() {
        const fn = optimizer ? getOptimizedLineup : getGeneratedLineup;
        const players = await fn(type);
        setPlayers(players)
    }

    return (
        <>
            <h1>{type.toUpperCase()} {optimizer ? optimizer : 'Generator'}</h1>
            <Lineup players={players} horizontal />
            <Button
                variant="primary"
                onClick={() => console.log('loading...')}
            >
                Optimize
            </Button>
        </>
    )
}

export default Optimizer;