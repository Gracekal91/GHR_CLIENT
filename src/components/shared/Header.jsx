import '../../assets/scss/header.scss'
import {BsArrowBarLeft} from "react-icons/bs";
import {RxHamburgerMenu} from "react-icons/rx";
import axios from 'axios';

const Header = ({isHome, isDashboard}) => {
    const authenticate = localStorage.getItem("token");
    const BASE_URL = "http://localhost:8000";
    const handleLogout = async () => {
        try {
                await axios.post(`${BASE_URL}/api/auth/logout`);
                localStorage.clear();
                sessionStorage.setItem('refreshToken', null);
                window.location.href = '/login'

        } catch (e) {
            console.error("Couldn't log out")
        }
    }
    return (
        <>
            <div className="header_container">
                {
                   isHome && <>
                        <div className="header_content">
                            <a href="/" className="logo">CLIENT</a>

                            <ul>
                                <a href="/" className="home_links_item">Home</a>
                                <a href="/" className="home_links_item">Infos</a>
                                <a href="/" className="home_links_item">Peoples</a>
                                <a href="/" className="home_links_item">Files</a>
                                <a href="/" className="link_item">
                                    {
                                        authenticate &&
                                        <>
                                            <div className="link_icon">
                                                <BsArrowBarLeft/>
                                            </div>
                                            <li onClick={handleLogout}>Logout</li>
                                        </>
                                    }
                                </a>
                                <a href="#">
                                    <div className="profile_picture"></div>
                                </a>
                                <a href="/" className="link_item hamburger">
                                    <div className="link_icon">
                                        <RxHamburgerMenu/>
                                    </div>
                                </a>
                            </ul>
                        </div>
                    </>
                }
                {
                    isDashboard && <>
                        <div className="header_content">
                            <a href="/" className="logo">GHR</a>
                            <ul>
                                <a href="/" className="link_item">
                                    {
                                        authenticate &&
                                        <>
                                            <div className="link_icon">
                                                <BsArrowBarLeft/>
                                            </div>
                                            <li onClick={handleLogout}>Logout</li>
                                        </>
                                    }

                                </a>
                                <a href="/" className="link_item hamburger">
                                    <div className="link_icon">
                                        <RxHamburgerMenu/>
                                    </div>
                                </a>
                            </ul>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Header