import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Compass, MapPin, Menu } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Bottom Navigation">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        <div className="nav-icon-wrap">
          <Home size={18} />
        </div>
        <span>Home</span>
      </NavLink>

      <NavLink to="/days" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-wrap">
          <Calendar size={18} />
        </div>
        <span>Days</span>
      </NavLink>

      <NavLink to="/explore" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-wrap">
          <Compass size={18} />
        </div>
        <span>Explore</span>
      </NavLink>

      <NavLink to="/map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-wrap">
          <MapPin size={18} />
        </div>
        <span>Map</span>
      </NavLink>

      <NavLink to="/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-wrap">
          <Menu size={18} />
        </div>
        <span>More</span>
      </NavLink>
    </nav>
  );
}
