import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div style={{ display: "flex", justifyContent: 'space-between', background: "grey", padding: "0px 25px" }}>
            <h3>TMS</h3>
            <ul style={{ listStyle: "none", display: "flex", justifyContent: 'space-between' }}>
                <li>
                    <button onClick={() => logout()}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar