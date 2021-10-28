import Lineup from "../lineup/Lineup";
import { useEffect, useState } from 'react';
import { getOptimizedLineup } from '../../services/apiService';

function Optimizer({ type }) {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const players = await getOptimizedLineup(type);
        setPlayers(players)
    }

    return (
        <>
            <h1>{type.toUpperCase()} Optimizer</h1>
            <Lineup players={players} />
        </>
    )
}

export default Optimizer;