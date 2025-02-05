import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import myaxios from "../utils/myaxios";
import OwlCarousel from "react-owl-carousel"; // Import Owl Carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]); // Initialize as an array
    const [categories, setCategories] = useState([]); // For fetching blog categories
    const [tags, setTags] = useState([]); // For fetching blog categories
    const [loading, setLoading] = useState(true); // Loading state

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
                setBlogs(blogsRes.data || []);
                setCategories(categoriesRes.data || []);
                setTags(tagsRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>


            <div className="main-banner header-text">
                <div className="container-fluid">
                    <OwlCarousel
                        className="owl-theme owl-banner"
                        loop
                        margin={10}
                        nav
                        dots={true}
                        autoplay
                        autoplayTimeout={3000}
                        responsive={{
                            0: { items: 1 },
                            600: { items: 2 },
                            1000: { items: 3 }
                        }}
                    >
                        {blogs.map((blog) => (
                            <div className="item" key={blog.id}>
                                <img src={blog.banner} alt="banner" />
                                <div className="item-content">
                                    <div className="main-content">
                                        <div className="meta-category">
                                            <span>{blog.category_title}</span>
                                        </div>
                                        <Link to={`/blog-details/${blog.slug}/`}>
                                            <h4>{blog.title}</h4>
                                        </Link>
                                        <ul className="post-info">
                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.user}</Link></li>
                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.created_date}</Link></li>
                                            <li><Link to={`/blog-details/${blog.slug}/`}>{blog.reviews.length} Comments</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>


            <section className="blog-posts">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="all-blog-posts">
                                <div className="row">

                                {blogs.map((blog) => (
                                    <div className="col-lg-12" key={blog.id}>
                                        <div className="blog-post">
                                            <div className="blog-thumb">
                                                <img style={{ height: "300px"}}
                                                    src={blog.banner}
                                                    alt="Blog banner"
                                                />

                                            </div>
                                            <div className="down-content">
                                            <span>{blog.category_title}</span>
                                            <Link to={`/blog-details/${blog.slug}/`}><h4>{blog.title}</h4></Link>
                                            <ul className="post-info">
                                                <li><Link to={`/blog-details/${blog.slug}/`}>{blog.user}</Link></li>
                                                <li><Link to={`/blog-details/${blog.slug}/`}>{blog.created_date}</Link></li>
                                                <li><Link to={`/blog-details/${blog.slug}/`}>{blog.reviews.length} Comments</Link></li>
                                            </ul>
                                            {/* <p>{blog.description}</p> */}
                                            <div className="post-options">
                                                <div className="row">
                                                <div className="col-6">
                                                    <ul className="post-tags">

                                                        <li><i className="fa fa-tags"></i></li>
                                                        <li>{blog.tag_title.join(", ")}</li>{/* Convert the tags array to a comma-separated string */}
                                                        
                                                    </ul>
                                                </div>
                                                <div className="col-6">
                                                    <ul className="post-share">
                                                        {/* <li><i className="fa fa-share-alt"></i></li>
                                                        <li><a href="#">Facebook</a>,</li>
                                                        <li><a href="#"> Twitter</a></li> */}
                                                    </ul>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                    
                                    <div className="col-lg-12">
                                        <div className="main-button">
                                            <Link to="/blogs/">View All Blogs</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        
                        </div>

                        {/* side bar */}
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="row">
                                    
                                    <div className="col-lg-12">
                                        <div className="sidebar-item recent-posts">
                                            <div className="sidebar-heading">
                                                <h2>Recent Blogs</h2>
                                            </div>
                                            <div className="content">
                                            
                                                <ul>
                                                {blogs.map((blog) => (
                                                    <li key={blog.id}><Link to={`/blog-details/${blog.slug}/`}>
                                                    <h5>{blog.title}</h5>
                                                    <span>{blog.created_date}</span>
                                                    </Link></li>
                                                ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                    <div className="sidebar-item categories">
                                        <div className="sidebar-heading">
                                        <h2>Categories</h2>
                                        </div>
                                        <div className="content">
                                            <ul>
                                                {categories.map(category => (
                                                    <li key={category.id}>
                                                        <Link to={`/category-blogs/?category=${category.id}`}>
                                                            - {category.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-12">
                                    <div className="sidebar-item tags">
                                        <div className="sidebar-heading">
                                        <h2>Tag Clouds</h2>
                                        </div>
                                        <div className="content">
                                            <ul>
                                                {tags.map(tag => (
                                                    <li key={tag.id}>
                                                        <Link to={`/tag-blogs/?tags=${tag.slug}`}>{tag.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* side bar end */}

                    </div>
                </div>
            </section>



        </div>
    );
};

export default HomePage;