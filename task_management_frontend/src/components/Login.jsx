import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            console.error('Failed to login:', error);
            setError('Failed to login')
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" name="Login" />
                <br />
                {error && <span style={{ color: "red" }}>{error}</span>}
            </form>
        </div>
    )
}

export default Login