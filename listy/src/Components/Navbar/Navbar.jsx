import React from 'react';
import './Navbar.css';
import logo from '../Asset/logo.png'; // Assuming you have a logo image
import cart from '../Asset/cart_logo.png'; // Assuming you have a cart image
import favorite from '../Asset/favorite_logo.png'; // Assuming you have a favorite image
import message from '../Asset/message_logo.png'; // Assuming you have a message image
import profile from '../Asset/profile_logo.png'; // Assuming you have an orders image

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="Logo" />
        <h1>Listy</h1>
      </div>

      <div className="navbar_search">
        <input type="text" placeholder="Search..." className="search_input" /><hr/>
        <select className="search_category">
          <option value="all">All Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          </select>
        <button type="submit" className="search_button">Search</button>
      </div>

      <ul className="navbar_links">
        <li>
          <img src={profile} alt="" />
          <a href="#profile">Profile</a>
          </li>
        <li><img src={message} alt="" /><a href="#message">Message</a></li>
        <li><img src={favorite} alt="" /><a href="#orders">Orders</a></li>
        <li><img src={cart} alt="" /><a href="#mycart">My cart</a></li>
      </ul>
    
    <div className="navbar_underneth">
      <ul className="navbar_links_underneth">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      </div>
      </div>
  );
}

export default Navbar;