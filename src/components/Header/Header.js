import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/foodItems">Food Items</Link>
            <Link to="/students-list">Student List</Link>
            <Link to="/addstudent">Add Student</Link>
            <Link to="/addfood">Add Food</Link>
            <Link to="/distribution">Distribution</Link>
            <Link to="/login">Login</Link>
            <Link to="/status">Check Status</Link>
        </div>
    );
};

export default Header;