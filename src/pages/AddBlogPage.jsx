import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myaxios from "../utils/myaxios";

const AddBlogPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await myaxios.get("/categories/");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // Get form data

        try {
            const response = await myaxios.post("/blogs/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) { // Assuming 201 indicates success
                navigate("/my-blogs/");
            } else {
                alert("Failed to add blog. Please try again.");
            }
        } catch (error) {
            // console.error("Error adding blog:", error);
            alert("Failed to add blog. Please try again.");
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
                                    <h2>Add your blog</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="add-blog">
                
                <div className="container">
                    <div className="row py-5 justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="title">Blog Title</label>
                                    <input className="form-control" type="text" name="title" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Blog Category</label>
                                    <select className="form-control" name="category" required>
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="banner">Blog Banner</label>
                                    <input className="form-control" type="file" name="banner" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="6"
                                        placeholder="Write your blog description here..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tags"
                                        placeholder="Enter comma-separated tags (e.g., travel, lifestyle)"
                                    />
                                </div>

                                <div className="form-group my-2">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default AddBlogPage;
