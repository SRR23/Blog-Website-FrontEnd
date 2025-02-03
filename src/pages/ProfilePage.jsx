import React, { useEffect, useState } from "react";
import myaxios from "../utils/myaxios";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await myaxios.get("/profile/");
                // console.log("Fetched data:", response.data);
    
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProfile(response.data[0]); // Set the first profile data
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfile();
    }, []);

    // Handle change in form fields
    const handleChange = ({ target: { name, value } }) => {
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profile.id) return; // Prevent request if profile ID is missing

        setIsSubmitting(true);

        try {
            await myaxios.put(`/profile/${profile.id}/`, profile);
            // Optionally, show a success message or update state if needed
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    // Debugging line to check loading state before rendering
    // console.log('Loading state:', loading);

    // Show a loading message while the data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="heading-page header-text"></div>
                <section className="contact-us">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="down-contact">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="sidebar-item contact-form">
                                                <div className="sidebar-heading">
                                                    <h2>My Profile</h2>
                                                </div>
                                                <div className="content">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <label htmlFor="title">Username:</label>
                                                                    <input
                                                                        name="username"
                                                                        type="text"
                                                                        id="username"
                                                                        value={profile.username || 'Not available'}
                                                                        placeholder="Username"
                                                                        readOnly
                                                                    />
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <label htmlFor="title">First Name:</label>
                                                                    <input
                                                                        name="first_name"
                                                                        type="text"
                                                                        id="first_name"
                                                                        value={profile.first_name || 'Not available'}
                                                                        placeholder="First Name"
                                                                        onChange={handleChange} // Use the handleChange function
                                                                    />
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <label htmlFor="title">Last Name:</label>
                                                                    <input
                                                                        name="last_name"
                                                                        type="text"
                                                                        id="last_name"
                                                                        value={profile.last_name || 'Not available'}
                                                                        placeholder="Last Name"
                                                                        onChange={handleChange} // Use the handleChange function
                                                                    />
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <label htmlFor="title">Email:</label>
                                                                    <input
                                                                        name="email"
                                                                        type="email"
                                                                        id="email"
                                                                        value={profile.email || 'Not available'}
                                                                        placeholder="Email"
                                                                        readOnly
                                                                    />
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <button type="submit" id="submit" className="main-button" disabled={isSubmitting}>
                                                                        {isSubmitting ? 'Updating...' : 'Update'}
                                                                    </button>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </form>
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

export default ProfilePage;
