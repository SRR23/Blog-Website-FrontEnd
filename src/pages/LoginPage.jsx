
import myaxios from '../utils/myaxios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const LoginPage = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = Object.fromEntries(new FormData(e.target));
    
        try {
            const { data: response } = await myaxios.post('/login/', data);
    
            if (response.status === 'success') {
                ['username', 'token', 'refresh_token'].forEach(key =>
                    localStorage.setItem(key, response[key])
                );
                navigate('/');
            } else {
                alert('Login Failed');
            }
        } catch (error) {
            console.error(error);
            alert('Login Failed');
        }
    };


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
                                <h2>Login to your account</h2>
                            </div>
                            <div className="content">
                                <form onSubmit={handleSubmit}>
                            
                                    <div className="row">
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
                                                <button type="submit" id="submit" className="main-button">Login</button>
                                            </fieldset>
                                        </div>
                                        <br /><br /><br />
                                        <h3>Don't have an account? <Link to="/register/">Register </Link>here</h3>.
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

export default LoginPage;