import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import myaxios from "../utils/myaxios";

const MyFavouritePage = () => {
    
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        myaxios.get("/favourites/")
            .then(response => {
                console.log("Fetched data:", response.data);
                if (response.data && response.data.length > 0) {
                    setBlogs(response.data); // Set the entire array of blogs
                }
            })
            .catch(error => {
                console.error("Error fetching favourite blog:", error);
            });
    }, []);


    // Delete the blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            myaxios
                .delete(`/favourites/${id}/`)
                .then(() => {
                    setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove the deleted blog
                    alert("Blog deleted successfully.");
                })
                .catch((error) => {
                    console.error("Error deleting the blog:", error);
                    alert("Failed to delete the blog. Please try again.");
                });
        }
    };

    return (
        <div>

            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blogs</h4>
                                    <h2>List of favourite blogs</h2>
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
                                            <Link className="btn btn-link px-2 ml-auto" to="#">
                                                
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

export default MyFavouritePage;