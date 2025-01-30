import myaxios from '../utils/myaxios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RegisterPage = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata);

        myaxios.post(
            '/register/',
            data,
        ).then(response => {
            console.log(response.data);
            if(response.data.status === 'success') {
                navigate('/login/');
            } else {
                alert('Register Failed');
            }
        }).catch(error => {
            console.error(error);
            alert('Register Failed');
        });
    }


    return (
        <div>


            <div className="heading-page header-text">
       
            </div>
 
 
            <section className="contact-us">
                <div className="container">
                    <div className="row">
                    
                        <div className="col-lg-12">
                        <div className="down-contact">
                            <div className="row">
                            <div className="col-lg-8">
                                <div className="sidebar-item contact-form">
                                <div className="sidebar-heading">
                                    <h2>Register to create your account</h2>
                                </div>
                                <div className="content">
                                    <form onSubmit={handleSubmit}>
                                        
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="username" type="text" id="username" placeholder="Username" />
                                                    
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="first_name" type="text" id="first_name" placeholder="First Name" />
                                                    
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="last_name" type="text" id="last_name" placeholder="Last Name" />
                                                    
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="email" type="email" id="email" placeholder="Email" />
                                                    
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="password" type="password" id="password" placeholder="Password" />
                                                    
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <input name="confirm_password" type="password" id="confirm_password" placeholder="Confirm Password" />
                                                    
                                                </fieldset>
                                            </div>
                                            
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <button type="submit" id="submit" className="main-button">Register</button>
                                                </fieldset>
                                            </div>
                                            <h3>Already have an account!! <Link to="/login">Login </Link>here.</h3>
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

export default RegisterPage;