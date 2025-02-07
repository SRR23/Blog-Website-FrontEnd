import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import myaxios from "../utils/myaxios";

const Header = () => {
    const [username, setUsername] = useState(null);
    const [categories, setCategories] = useState([]); // For fetching blog categories
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    // Update the username when localStorage changes (for dynamic updates)
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername); // Set username based on localStorage value
    }, [localStorage.getItem('username')]); // Adding localStorage value as a dependency

    // Fetch categories
    useEffect(() => {
        myaxios.get("/categories/")
            .then(response => {
                if (response.data) {
                    setCategories(response.data);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const handleLogout = () => {
        // Clear localStorage and state when logging out
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setUsername(null); // Update state to reflect the logout
        navigate('/login/'); // Navigate to login page
    };

    // Helper function to check if the current path matches the link
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (searchQuery.trim()) {
            navigate(`/search-blogs/?find=${searchQuery}`);
        }
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand" to="/"><h2>BlogTopia<em>.</em></h2></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className={`nav-item ${isActive('/')}`}>
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className={`nav-item ${isActive('/blogs/')}`}>
                                    <Link className="nav-link" to="/blogs/">Blogs</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Categories
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories.map(category => (
                                        <Link
                                            key={category.id}
                                            className={`dropdown-item ${isActive(`/filter-category/?category=${category.id}`)}`}
                                            to={`/category-blogs/?category=${category.id}`} // Navigate to the filtered category blogs page
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                    </div>
                                </li>

                                {username ? (
                                    <li className="nav-item dropdown">
                                        <button className="nav-link dropdown-toggle" id="userDropdown" role="button" 
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                                        style={{ cursor: "pointer" }}>
                                            {username}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="userDropdown">
                                            <Link className="dropdown-item" to="/profile/">Profile</Link>
                                            <Link className="dropdown-item" to="/add-blog/">Add Blog</Link>
                                            <Link className="dropdown-item" to="/my-blogs/">My Blogs</Link>
                                            <Link className="dropdown-item" to="/my-favourites/">Favourite Blogs</Link>
                                            <button className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/login/')}`} to="/login/">Login</Link>
                                    </li>
                                )}

                                <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                                    <input 
                                        className="form-control mr-sm-2" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search" 
                                        value={searchQuery} 
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        required 
                                    />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
