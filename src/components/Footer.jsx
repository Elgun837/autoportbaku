
import "../assets/styles/Footer.scss";


export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="triangle_decor triangle_decor_top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="55" viewBox="0 0 1920 55" fill="none">
                        <path d="M1920 0.654785L0 54.3096V0.654785H1920Z" fill="white" />
                    </svg>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="footer_content">

                            <div className="logo_menu_wrapper ">
                                <div className="mobile_visible mobile_visible__logo">
                                    <div className="logo_wrapper">
                                        <div className="logo">
                                            <img src="/logo_big.svg" alt="Logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="logo mobile_hidden">
                                    <img src="/logo_big.svg" alt="Logo" />
                                </div>
                                <div className="footer_menu">
                                    <h3 className="footer_menu_title">Company</h3>
                                    <ul className="footer_menu_list">
                                        <li><a href="#" className="footer_link">Book a trip</a></li>
                                        <li><a href="#" className="footer_link">Short distances</a></li>
                                        <li><a href="#" className="footer_link">Services</a></li>
                                        <li><a href="#" className="footer_link">Vehicle Fleet</a></li>
                                        <li><a href="#" className="footer_link">About Us</a></li>
                                    </ul>
                                </div>
                                <div className="footer_menu">
                                    <h3 className="footer_menu_title">Contacts</h3>
                                    <ul className="footer_menu_list">
                                        <li><a href="#" className="footer_link">Azure Business Center, 15 Nobel Avenue</a></li>
                                        <li><a href="tel:(+994) 50 -481-00-81" className="footer_link">(+994) 50 -481-00-81</a></li>
                                        <li><a href="tel:(+994) 12-488-67-98" className="footer_link">(+994) 12-488-67-98</a></li>
                                        <li><a href="mailto:info@bakutransfers.com" className="footer_link">info@bakutransfers.com</a></li>
                                    </ul>
                                </div>
                                <div className="footer_menu">
                                    <h3 className="footer_menu_title">Social Media</h3>
                                    <ul className="footer_menu_list">
                                        <li><a href="#" className="footer_link">Facebook</a></li>
                                        <li><a href="#" className="footer_link">Instagram</a></li>
                                        <li><a href="#" className="footer_link">Tik Tok</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="copyright_wrapper">
                                <div className="copyright_text">© 2024 Baku Transfers. All rights reserved.</div>
                                <div className="design_text">
                                    <span>Made by:</span>
                                    <div className="design_link">
                                        <a href="#"><img src="/amiroff.svg" alt="Amiroff Logo" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="triangle_decor triangle_decor_bottom">
                    <svg width="1920" height="54" viewBox="0 0 1920 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 53.9644L1920 0.30957V53.9644H0Z" fill="white" />
                    </svg>
                </div>
            </footer>
        </>
    );
}