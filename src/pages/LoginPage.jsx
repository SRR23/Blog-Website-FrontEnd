
import myaxios from '../utils/myaxios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const LoginPage = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata);

        myaxios.post(
            '/login/',
            data,
        ).then(response => {
            // console.log(response.data);
            if(response.data.status === 'success') {
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                navigate('/');
            } else {
                alert('Login Failed');
            }
        }).catch(error => {
            console.error(error);
            alert('Login Failed');
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