import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import myaxios from '../utils/myaxios';  // Axios instance for API calls

const TagBlogFilterPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [latest, setLatest] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [tags, setTags] = useState([]); 
    const [loading, setLoading] = useState(true);  // Added loading state
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const tagSlug = searchParams.get('tags'); 

    console.log("Current category ID:", tagSlug); // Debugging

    // Fetch blogs by category
    useEffect(() => {
        if (tagSlug) {
            console.log("Fetching blogs for tags:", tagSlug);
            setLoading(true);
            myaxios.get(`/filter-tags/?tags=${tagSlug}`)
                .then(response => {
                    console.log("API Response:", response.data);
                    setBlogs(response.data); // Directly setting the array
                })
                .catch(error => console.error('Error fetching filtered blogs:', error))
                .finally(() => setLoading(false));
        }
    }, [tagSlug]);

    // Fetch latest blogs
    useEffect(() => {
        myaxios.get("/all-blogs/?latest=3")
            .then(response => {
                console.log("Latest Blogs Response:", response.data);
                setLatest(response.data || []);
            })
            .catch(error => console.error("Error fetching latest blogs:", error));
    }, []);

    // Fetch categories
    useEffect(() => {
        myaxios.get("/categories/")
            .then(response => {
                console.log("Categories Response:", response.data);
                setCategories(response.data || []);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    // Fetch tags
    useEffect(() => {
        myaxios.get("/tags/")
            .then(response => {
                console.log("Tags Response:", response.data);
                setTags(response.data || []);
            })
            .catch(error => console.error("Error fetching tags:", error));
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blogs</h4>
                                    <h4>Tag-{tagSlug}</h4>
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
                                                            <li><a href="#">{blog.user}</a></li>
                                                            <li><a href="#">{blog.created_date}</a></li>
                                                            <li><a href="#">{blog.reviews.length} Comments</a></li>
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
                                        <p>No blogs found for this tag.</p>
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

export default TagBlogFilterPage;