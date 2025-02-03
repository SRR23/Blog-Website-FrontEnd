
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import myaxios from "../utils/myaxios";

const MyBlogsPage = () => {
    const [blogs, setBlogs] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await myaxios.get("/blogs/");
                if (Array.isArray(data) && data.length > 0) {
                    setBlogs(data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBlogs();
    }, []);
    
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
        try {
            await myaxios.delete(`/blogs/${id}/`);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id)); // Remove the deleted blog
            alert("Blog deleted successfully.");
        } catch (error) {
            // console.error("Error deleting the blog:", error);
            alert("Failed to delete the blog. Please try again.");
        }
    };

    // Show a loading message while the data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blogs</h4>
                                    <h2>List of my blogs</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="my-blogs">
                <div className="container-fluid">
                    <div className="row py-5">

                        {blogs.map((blog) => (
                            <div className="col-md-4 my-2" key={blog.id}>
                                <div className="card">
                                    <img
                                        className="card-img-top img-fluid"
                                        style={{ width: "100%", height: "320px", objectFit: "cover" }}
                                        src={blog.banner}
                                        alt="Blog banner"
                                    />
                                    <div className="card-body">
                                        <p className="card-text d-flex flex-row">
                                            <Link to={`/blog-details/${blog.slug}/`}>{blog.title}</Link>
                                            <Link className="btn btn-link px-2 ml-auto" to={`/update-blog/${blog.id}/`}>
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <button
                                                className="btn btn-link px-2 text-danger"
                                                onClick={() => handleDelete(blog.id)}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyBlogsPage;
