import "./Navbar.css";
import logo1 from '../../assets/logo1.jpeg'
import { useEffect, useState } from "react";
import {Link} from "react-scroll";
import menu_icon from "../../assets/menu-icon.png"

const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false)
    })
  }, []);


  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className={`container ${sticky? 'dark-nav': ''}`}>
        {/* <img src={logo1} alt="" className="logo"/> */}
        <Link to="hero" smooth={true} offset={0} duration={500}>
        <img src={logo1} alt="Logo" className="logo" />
      </Link>
        {/* <h1>LOGO</h1> */}
        <ul className={mobileMenu? '': 'hide-mobile-menu'}>
            <li><Link to= 'hero' smooth = {true} offset={0} duration={500}>Home</Link></li>
            <li><Link to= 'program' smooth = {true} offset={-320} duration={500}>Program</Link></li>
            <li><Link to= 'about' smooth = {true} offset={-160} duration={500}>About us</Link></li>
            <li><Link to= 'campus' smooth = {true} offset={-260} duration={500}>Campus</Link></li>
            <li><Link to= 'course' smooth = {true} offset={-260} duration={500}>Course</Link></li>
            <li><Link to= 'fees' smooth = {true} offset={-290} duration={500}>Fees</Link></li>
            <li><Link to="contact" smooth = {true} offset={-320} duration={500} className="btn">Contact us</Link></li>
        </ul>

      <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu} />

    </nav>
  )
}

export default Navbar
