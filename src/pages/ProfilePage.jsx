import React, { useEffect, useState } from "react";
import myaxios from "../utils/myaxios";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state

    useEffect(() => {
        myaxios.get('/profile/')
            .then(response => {
                console.log('Fetched data:', response.data);
                if (response.data && response.data.length > 0) {
                    setProfile(response.data[0]); // Set the first profile data, because response is an array
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
            .finally(() => {
                // console.log('Data fetching finished.');
                setLoading(false); // Update loading state
            });
    }, []);

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value, // Dynamically set the profile field
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        setIsSubmitting(true); // Set submitting state to true

        // Make a PUT request to update the profile data
        myaxios.put(`/profile/${profile.id}/`, profile)
            .then(response => {
                // console.log('Profile updated:', response.data);
                // Optionally, show a success message or do something else after updating
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            })
            .finally(() => {
                setIsSubmitting(false); // Reset the submitting state after request
            });
    };

    // Debugging line to check loading state before rendering
    console.log('Loading state:', loading);

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
                                                                <input
                                                                    name="email"
                                                                    type="email"
                                                                    id="email"
                                                                    value={profile.email || 'Not available'}
                                                                    placeholder="Email"
                                                                    onChange={handleChange} // Use the handleChange function
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
