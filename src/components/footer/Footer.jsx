import React from "react";
import "./style.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = ({ noFooter }) => {
  return (
    noFooter || (
      <div className="footer">
        <ul className="terms">
          <li className="term">Term of Use</li>
          <li className="term">Privacy Policy</li>
          <li className="term">About</li>
          <li className="term">Blog</li>
          <li className="term">FAQ</li>
        </ul>
        <div className="description">
          FilmFlare, your ultimate companion for an immersive and personalized
          movie-watching experience. At FilmFlare, we believe that every movie
          enthusiast deserves a seamless platform to explore, discover, and
          enjoy their favorite films.Explore an extensive library of movies from
          various genres, including classics, blockbusters, and hidden gems.
        </div>
        <div className="icons">
          <span className="icon">
            <FaFacebookF></FaFacebookF>
          </span>
          <span className="icon">
            <FaInstagram></FaInstagram>
          </span>
          <span className="icon">
            <FaTwitter></FaTwitter>
          </span>
          <span className="icon">
            <FaLinkedin></FaLinkedin>
          </span>
        </div>
      </div>
    )
  );
};

export default Footer;
