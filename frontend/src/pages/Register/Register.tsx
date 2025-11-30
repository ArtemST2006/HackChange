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
<<<<<<< HEAD
    email: '',
    password: '',
    confirmPassword: '',
=======
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentCard: '',
    dateOfBirth: '',
    course: '',
    gpa: 0,
>>>>>>> origin/Front_bombas
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

<<<<<<< HEAD
=======
    if (formData.password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return;
    }

>>>>>>> origin/Front_bombas
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
<<<<<<< HEAD
    } catch (err) {
      setError('Ошибка регистрации');
=======
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
>>>>>>> origin/Front_bombas
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
<<<<<<< HEAD
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
=======
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
          </div>

          <Input
            label="Имя пользователя"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            fullWidth
            required
            helperText="Уникальное имя для входа"
>>>>>>> origin/Front_bombas
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

<<<<<<< HEAD
=======
          <Input
            label="Номер студенческого билета"
            value={formData.studentCard}
            onChange={(e) => setFormData({ ...formData, studentCard: e.target.value })}
            fullWidth
            required
            helperText="Например: СТУ-12345"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              type="date"
              label="Дата рождения"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              fullWidth
              required
            />

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Курс обучения
              </label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">Выберите курс</option>
                <option value="1">1 курс</option>
                <option value="2">2 курс</option>
                <option value="3">3 курс</option>
                <option value="4">4 курс</option>
                <option value="5">5 курс</option>
                <option value="6">6 курс</option>
              </select>
            </div>
          </div>

          <Input
            type="number"
            label="Средний балл (GPA)"
            value={formData.gpa}
            onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
            fullWidth
            required
            helperText="От 0.0 до 5.0"
            min="0"
            max="5"
            step="0.01"
          />

>>>>>>> origin/Front_bombas
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
