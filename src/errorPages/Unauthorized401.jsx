import { Link } from "react-router-dom";

const Unauthorized401 = () => {
    return (
        <div>
            <div className="not-found-container">
                <h2 className="not-found-title">401 - Unauthorized</h2>
                <p className="not-found-text">You do not have permission to view this page.</p>
                <Link to="/login/" className="not-found-link">Go to Login</Link>
            </div>
        </div>
    );
};

export default Unauthorized401;