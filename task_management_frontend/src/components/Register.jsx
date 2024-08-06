import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', { username, email, password }).then(response => {
                if (response.data.success) {
                    navigate('/login');
                };
            });
        } catch (e) {
            console.error('Failed to register:', e);
            setError('Failed to register');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" name="email" id="" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" id="" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" name="Register" id="" />
                <br />
                {error && <span style={{ color: "red" }}>{error}</span>}
            </form>
        </div>
    )
}

export default Register