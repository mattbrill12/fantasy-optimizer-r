import { useEffect, useState } from 'react';
import { getTeam } from '../../services/apiService';
import Optimizer from '../optimizer/Optimizer';

function Header() {
    return (
        <>
            <nav className="navbar navbar-default navbar-fixed-top navbar-inverse navbar-light bg-light">
                <div className="container">
                    <a class="navbar-brand" href="#">Fantasy Lineup Optimizer</a>
                </div>
            </nav>
        </>
    )
}

export default Header;