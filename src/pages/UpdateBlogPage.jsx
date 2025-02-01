import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myaxios from "../utils/myaxios";

const UpdateBlogPage = () => {
    const { id } = useParams(); // Get the blog ID from the route
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        banner: null, // For new file
        bannerUrl: "", // To display existing banner
        description: "",
        tags: "",
    });
    
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Fetch blog data and categories
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const { data } = await myaxios.get(`/blogs/${id}/`);
                setFormData({
                    title: data.title,
                    category: data.category,
                    banner: null, // Prevent preloading files
                    bannerUrl: data.banner || "", // Store banner URL
                    description: data.description,
                    tags: data.tag_title?.join(", ") || "",
                });
            } catch (error) {
                console.error("Failed to fetch blog data:", error);
            }
        };
    
        const fetchCategories = async () => {
            try {
                const { data } = await myaxios.get("/categories/");
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
    
        fetchBlogData();
        fetchCategories();
    }, [id]);
    
    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    
    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            banner: file, // Store new file
            bannerUrl: URL.createObjectURL(file), // Show preview
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const updatedData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "bannerUrl" && value) updatedData.append(key, value);
            });
    
            await myaxios.put(`/blogs/${id}/`, updatedData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            // alert("Blog updated successfully!");
            // navigate("/my-blogs/");
        } catch (error) {
            console.error("Error updating blog:", error);
        } finally {
            setIsSubmitting(false);
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
                                    <h2>Update your blog</h2>
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
                                
                                {/* Blog Title */}
                                <div className="form-group">
                                    <label htmlFor="title">Blog Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Blog Category */}
                                <div className="form-group">
                                    <label htmlFor="category">Blog Category</label>
                                    <select
                                        className="form-control"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Blog Banner (with preview) */}
                                <div className="form-group">
                                    <label htmlFor="banner">Blog Banner</label>
                                    
                                    {/* Show existing banner or new preview */}
                                    {formData.bannerUrl && (
                                        <div className="mb-3">
                                            <img
                                                src={formData.bannerUrl}
                                                alt="Blog Banner"
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "300px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </div>
                                    )}
                                    
                                    {/* File input */}
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="banner"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Blog Description */}
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="6"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* Blog Tags */}
                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="Enter comma-separated tags (e.g., travel, lifestyle)"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="form-group my-2">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                                        {isSubmitting ? 'Updating...' : 'Update'}
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

export default UpdateBlogPage;
