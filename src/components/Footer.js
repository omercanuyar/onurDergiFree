import React from "react";
import "./Footer.css";
import twitterIcon from "../assets/png/twitterIcon.png";
import instagramIcon from "../assets/png/instagramIcon.png";
import facebookIcon from "../assets/png/facebookIcon.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://x.com/190tibbiyeli?s=11" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="footer-icon" />
        </a>
        <a href="https://www.instagram.com/190tibbiyelidergisi?igsh=MTJld3N4cDMwNzRrZg%3D%3D" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="footer-icon" />
        </a>
        <a href="https://www.facebook.com/checkpoint/828281030927956/?next=https%3A%2F%2Fwww.facebook.com%2F190TIBBIYELIDERGISI#" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="footer-icon" />
        </a>
      </div>
    </footer>
  );
} 