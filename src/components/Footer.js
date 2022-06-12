import React from "react";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Around The U.S.</p>
    </footer>
  );
}

export default Footer;
