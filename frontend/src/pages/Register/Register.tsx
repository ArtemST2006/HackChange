import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/shared';
import '../Login/Login.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Необходимо согласиться с условиями использования');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1 className="logo-title">Академия ПСБ</h1>
          <p className="logo-subtitle">Регистрация нового аккаунта</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Имя"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            fullWidth
            required
          />

          <Input
            label="Фамилия"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            fullWidth
            required
          />

          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            required
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            label="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            fullWidth
            required
            helperText="Минимум 8 символов"
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            label="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            fullWidth
            required
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
            />
            <span>Я согласен с условиями использования</span>
          </label>

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
            Зарегистрироваться
          </Button>
        </form>

        <div className="auth-footer">
          <p>Уже есть аккаунт?</p>
          <Link to="/login" className="auth-link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
