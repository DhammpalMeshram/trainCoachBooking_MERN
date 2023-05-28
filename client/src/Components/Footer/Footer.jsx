import React from 'react';
import "./Footer.css";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import HelpIcon from '@mui/icons-material/Help';
import HandymanIcon from '@mui/icons-material/Handyman';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';

const Footer = ()=>{
    return (
        <div id="footer">
            <div id="copywrite">
            <h4 className="headingClass activeLink"><i>BookMySeat.com</i></h4>
                <p>Copyright ©2023 Dhammpal Meshram. 
                    <br/>All rights reserved.
                </p>
            </div>
            <div id="community">
                <h4 className="headingClass">Community</h4>
                <a href="https://www.linkedin.com/in/dhammpal-meshram-0b8558250/"><LinkedInIcon/>Linkedin</a>
                <a href="https://github.com/DhammpalMeshram"><GitHubIcon/>Github</a>
                <a href="/"><FacebookIcon/>Facebook</a>
                <a href="/"><TwitterIcon/>Twitter</a>
            </div>
            <div id="contact-us">
                <h4 className="headingClass">Contact-Us</h4>
                <p><PhoneIcon/><span>+91 7720888034</span></p>
                <p><MailIcon/><span>dhammpal123321@gmail.com</span></p>
            </div>
            <div id="help">
                <h4 className="headingClass">Help</h4>
                <a href="/"><HelpIcon/>Support</a>
                <a href="/"><HandymanIcon/>Troublshooting</a>
                <a href="/"><GavelIcon/>Terms and Conditions</a>
                <a href="/"><PolicyIcon/>Policy</a>
            </div>
                
        </div>
    )
}

export default Footer;

