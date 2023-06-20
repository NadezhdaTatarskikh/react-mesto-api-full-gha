import React from "react";

const Footer = ({ loggedIn }) => {
  return (
    <footer className= {loggedIn ? 'footer' : 'footer_invisible'}>
      <p className="footer__text" lang="en">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
