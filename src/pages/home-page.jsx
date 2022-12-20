import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1>Better Life</h1>
            <div className="par-wrapper">
                <p>Providing a real-time response to anxiety attacks 24/7</p>
            </div>
            <button className="btn-help" onClick={() => navigate('/findHelp')}>click for Help</button>
            <button className="btn-start" onClick={() => navigate('/login')}>Get Started</button>
        </div>
    )
}          