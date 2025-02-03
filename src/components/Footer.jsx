

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <div>

        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="social-icons">
                            <li><a href="http://www.linkedin.com/in/shaidur-rahman-09475b2b3">Linkedin</a></li>
                            <li><a href="https://github.com/SRR23">Github</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-12">
                        <div className="copyright-text">
                            <p>Copyright {currentYear} Stand Blog Co. | Developed by 
                                <a href="http://www.linkedin.com/in/shaidur-rahman-09475b2b3" 
                                target="_blank" rel="noopener noreferrer"> Shaidur Rahman</a></p>
                        </div>
                    </div>
                </div>
            </div>
            </footer>
            
        </div>
    );
};

export default Footer;