import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/shared';
import './Login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password, rememberMe });
      navigate('/dashboard');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1 className="logo-title">Академия ПСБ</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            placeholder="example@student.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            label="Пароль"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            }
          />

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Запомнить меня</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Забыли пароль?
            </Link>
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
            Войти
          </Button>
        </form>

        <div className="auth-footer">
          <p>Нет аккаунта?</p>
          <Link to="/register" className="auth-link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};
