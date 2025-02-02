import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import myaxios from "../utils/myaxios";

const SearchBlogsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("find");
    const [blogs, setBlogs] = useState([]);
    const [latest, setLatest] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [tags, setTags] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogsBySearch = async () => {
            if (!searchQuery) return; // Early return if categoryId is not provided
    
            setLoading(true);
    
            try {
                const response = await myaxios.get(`/search/?find=${searchQuery}`);
                const data = response.data;
    
                if (data) {
                    setBlogs(data); // Directly setting the array of blogs
                }
            } catch (error) {
                console.error('Error fetching filtered blogs:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBlogsBySearch(); // Fetch blogs when categoryId changes
    }, [searchQuery]); // Effect depends on categoryId


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch blogs, categories, and tags simultaneously
                const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
                    myaxios.get("/all-blogs/?latest=3"),
                    myaxios.get("/categories/"),
                    myaxios.get("/tags/")
                ]);
    
                // Set state for all data
                setLatest(blogsRes.data || []);
                setCategories(categoriesRes.data || []);
                setTags(tagsRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []); // Empty dependency array, so this runs once on mount


    return (
        <div>
            {/* Page Header */}
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Search Results</h4>
                                    <h2>{searchQuery}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Blog Posts Section */}
            <section className="blog-posts grid-system">
                <div className="container">
                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="all-blog-posts">
                                <div className="row">
                                    {loading ? (
                                        <p>Loading blogs...</p>
                                    ) : blogs.length > 0 ? (
                                        blogs.map((blog) => (
                                            <div className="col-lg-6" key={blog.id}>
                                                <div className="blog-post">
                                                    <div className="blog-thumb">
                                                        <img src={blog.banner} style={{ height: "300px" }} alt="Blog Banner" />
                                                    </div>
                                                    <div className="down-content">
                                                        <span>{blog.category_title}</span>
                                                        <Link to={`/blog-details/${blog.slug}`}>
                                                            <h4>{blog.title}</h4>
                                                        </Link>
                                                        <ul className="post-info">
                                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.user}</Link></li>
                                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.created_date}</Link></li>
                                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.reviews.length} Comments</Link></li>
                                                        </ul>
                                                        <div className="post-options">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <ul className="post-tags">
                                                                        <li><i className="fa fa-tags"></i></li>
                                                                        <li>{blog.tag_title.join(", ")}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No blogs found for this search text.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="row">
                                    {/* Recent Blogs */}
                                    <div className="col-lg-12">
                                        <div className="sidebar-item recent-posts">
                                            <div className="sidebar-heading">
                                                <h2>Recent Blogs</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {latest.length > 0 ? latest.map((blog) => (
                                                        <li key={blog.id}>
                                                            <Link to={`/blog-details/${blog.slug}/`}>
                                                                <h5>{blog.title}</h5>
                                                                <span>{blog.created_date}</span>
                                                            </Link>
                                                        </li>
                                                    )) : <p>No recent blogs available.</p>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="col-lg-12">
                                        <div className="sidebar-item categories">
                                            <div className="sidebar-heading">
                                                <h2>Categories</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {categories.length > 0 ? categories.map(category => (
                                                        <li key={category.id}>
                                                            <Link to={`/category-blogs/?category=${category.id}`}>
                                                                - {category.title}
                                                            </Link>
                                                        </li>
                                                    )) : <p>No categories found.</p>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="col-lg-12">
                                        <div className="sidebar-item tags">
                                            <div className="sidebar-heading">
                                                <h2>Tag Clouds</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {tags.length > 0 ? tags.map(tag => (
                                                        <li key={tag.id}>
                                                            <Link to={`/tag-blogs/?tags=${tag.slug}`}>{tag.title}</Link>
                                                        </li>
                                                    )) : <p>No tags available.</p>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchBlogsPage;