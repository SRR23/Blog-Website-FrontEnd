import { Link } from "react-router-dom";

const NotFound404 = () => {
    return (
        <div>
            <div className="not-found-container">
                <h2 className="not-found-title">404 - Page Not Found</h2>
                <p className="not-found-text">The page you're looking for doesn't exist.</p>
                <Link to="/" className="not-found-link">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound404;