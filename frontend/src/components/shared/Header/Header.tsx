import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => handleNavigation('/dashboard')}>
          <img src="/psb-bank-logo.png" alt="ПСБ" className="logo-image" />
          <span className="logo-text">Академия ПСБ</span>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('/dashboard')}
          >
            <span className="nav-text">Главная</span>
          </button>
          <button
            className={`nav-button ${location.pathname === '/courses' ? 'active' : ''}`}
            onClick={() => handleNavigation('/courses')}
          >
            <span className="nav-text">Мои курсы</span>
          </button>
          <button
            className={`nav-button ${location.pathname === '/homework' ? 'active' : ''}`}
            onClick={() => handleNavigation('/homework')}
          >
            <span className="nav-text">Домашние задания</span>
          </button>
        </nav>

        <div className="header-right">
          <div
            className="header-profile"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="profile-name">
              {user?.firstName} {user?.lastName?.[0]}.
            </span>
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=student&backgroundColor=2e1a7c'}
              alt={user?.firstName}
              className="profile-avatar"
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8Z" fill="currentColor"/>
                    <path d="M8 10C4.69 10 2 12.69 2 16H14C14 12.69 11.31 10 8 10Z" fill="currentColor"/>
                  </svg>
                  Личный кабинет
                </button>
                <button onClick={handleLogout} className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 11L14 8L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
