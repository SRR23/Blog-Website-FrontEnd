import {Outlet, Navigate} from 'react-router-dom';
const Guard = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Guard;