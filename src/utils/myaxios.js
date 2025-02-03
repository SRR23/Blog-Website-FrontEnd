import axios from "axios";

const myaxios = axios.create({
    baseURL: "https://saidur.pythonanywhere.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

myaxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for handling token expiration
myaxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Check if the error is due to an expired access token (HTTP 401)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Get the refresh token from local storage
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    // Make a request to refresh the access token
                    const response = await axios.post('https://saidur.pythonanywhere.com/api/token/refresh/', {
                        refresh: refreshToken,
                    });
                    
                    // Save the new access token to localStorage
                    const newAccessToken = response.data.access;
                    localStorage.setItem('token', newAccessToken);
                    
                    // Update the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    // Retry the original request with the new token
                    return myaxios(originalRequest);
                } catch (err) {
                    // Handle token refresh failure (e.g., log out the user)
                    console.error('Token refresh failed:', err);
                    // Optionally, clear tokens and redirect to login page
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login'; // Or use a more appropriate redirection
                }
            }
        }
        // Return the error if it's not a token expiration issue
        return Promise.reject(error);
    }
);

export default myaxios;