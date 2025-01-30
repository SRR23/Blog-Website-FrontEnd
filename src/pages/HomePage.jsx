import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import myaxios from "../utils/myaxios";

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

            
            {/* <div className="main-banner header-text">
                <div className="container-fluid">
                    <div className="owl-banner owl-carousel">
                    <div className="item">
                        <img src="/images/banner-item-01.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Fashion</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="/images/banner-item-02.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Nature</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="/images/banner-item-03.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Lifestyle</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="/images/banner-item-04.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Fashion</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="/images/banner-item-05.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Nature</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="/images/banner-item-06.jpg" alt="" />
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Lifestyle</span>
                            </div>
                            <Link to="post-details.html"><h4>Morbi dapibus condimentum</h4></Link>
                            <ul className="post-info">
                            <li><Link to="#">Admin</Link></li>
                            <li><Link to="#">May 12, 2020</Link></li>
                            <li><Link to="#">12 Comments</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> */}


            <div className="heading-page header-text">
                {/* <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="text-content">
                                <h4>Recent Posts</h4>
                                <h2>Our Recent Blog Entries</h2>
                            </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
    
            

            <section className="call-to-action">
                {/* <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="main-content">
                        <div className="row">
                            <div className="col-lg-8">
                            <span>Stand Blog HTML5 Template</span>
                            <h4>Creative HTML Template For Bloggers!</h4>
                            </div>
                            <div className="col-lg-4">
                            <div className="main-button">
                                <a rel="nofollow" href="https://templatemo.com/tm-551-stand-blog" target="_parent">Download Now!</a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> */}
            </section>


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
                                                <li><a href="#">{blog.user}</a></li>
                                                <li><a href="#">{blog.created_date}</a></li>
                                                <li><a href="#">{blog.reviews.length} Comments</a></li>
                                            </ul>
                                            <p>{blog.description}</p>
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


                    </div>
                </div>
            </section>



        </div>
    );
};

export default HomePage;