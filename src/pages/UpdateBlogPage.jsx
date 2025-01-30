import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myaxios from "../utils/myaxios";

const UpdateBlogPage = () => {
    const { id } = useParams(); // Get the blog ID from the route
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        banner: null,
        description: "",
        tags: "",
    });

    const [categories, setCategories] = useState([]); // For fetching blog categories
    const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state

    // Fetch blog data and categories
    useEffect(() => {
        // Fetch blog details
        myaxios.get(`/blogs/${id}/`)
            .then((response) => {
                const { title, category, description, tag_title } = response.data;

                // Join the tags array into a comma-separated string
                const tagsString = tag_title ? tag_title.join(", ") : "";

                setFormData({
                    title,
                    category,
                    banner: null, // Banner won't be preloaded
                    description,
                    tags: tagsString,
                });
            })
            .catch((error) => console.error("Failed to fetch blog data:", error));

        // Fetch categories
        myaxios.get("/categories/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error("Failed to fetch categories:", error));
    }, [id]);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({ ...formData, banner: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true); // Set submitting state to true

        const updatedData = new FormData();
        updatedData.append("title", formData.title);
        updatedData.append("category", formData.category);
        if (formData.banner) updatedData.append("banner", formData.banner);
        updatedData.append("description", formData.description);
        updatedData.append("tags", formData.tags); // Tags as a comma-separated string

        myaxios.put(`/blogs/${id}/`, updatedData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                // alert("Blog updated successfully!");
                // navigate("/my-blogs/"); // Redirect to the blogs page
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            })
            .finally(() => {
                setIsSubmitting(false); // Reset the submitting state after request
            });
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

                                <div className="form-group">
                                    <label htmlFor="banner">Blog Banner</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="banner"
                                        onChange={handleFileChange}
                                    />
                                </div>

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
