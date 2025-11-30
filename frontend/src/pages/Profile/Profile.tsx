import React, { useState } from 'react';
import { Header, Button, Input, Card } from '../../components/shared';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api/user.service';
import { authService } from '../../services/api/auth.service';
import { adaptUserToStudentProfile } from '../../utils/adapters';
import './Profile.css';

type TabType = 'personal' | 'security';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
    studentCard: (user as any)?.studentCard || '',
    course: (user as any)?.course || '',
    gpa: (user as any)?.gpa || 0,
    birthDate: user?.birthDate || '',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSavePersonal = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      // Create updated user object
      const updatedUser = {
        ...user,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        username: personalInfo.username,
        studentCard: personalInfo.studentCard,
        course: personalInfo.course,
        gpa: personalInfo.gpa,
        birthDate: personalInfo.birthDate,
      };

      // Convert to backend format
      const profileData = adaptUserToStudentProfile(updatedUser);

      // Send to API
      await userService.updateProfile(profileData);

      setSaveSuccess('Профиль успешно обновлен');
      setIsEditing(false);
    } catch (error: any) {
      setSaveError(error.message || 'Ошибка сохранения профиля');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    setPasswordError(null);
    setPasswordSuccess(null);

    // Validate passwords
    if (securityData.newPassword !== securityData.confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    if (securityData.newPassword.length < 8) {
      setPasswordError('Новый пароль должен содержать минимум 8 символов');
      return;
    }

    setIsChangingPassword(true);

    try {
      await authService.changePassword({
        email: user.email,
        old_password: securityData.currentPassword,
        new_password: securityData.newPassword,
      });

      setPasswordSuccess('Пароль успешно изменен');
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setPasswordError(error.message || 'Ошибка изменения пароля');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="profile-section">
            <div className="section-header">
              <div>
                <h2>Личная информация</h2>
                <p className="section-description">Управляйте своими персональными данными</p>
              </div>
              {!isEditing ? (
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              ) : (
                <div className="button-group">
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                    Отмена
                  </Button>
                  <Button variant="primary" onClick={handleSavePersonal} isLoading={isSaving}>
                    Сохранить
                  </Button>
                </div>
              )}
            </div>

            {saveError && <div className="error-message">{saveError}</div>}
            {saveSuccess && <div className="success-message">{saveSuccess}</div>}

            <div className="form-grid">
              <Input
                label="Имя"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Фамилия"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Имя пользователя"
                value={personalInfo.username}
                onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
            </div>

            <div className="form-grid">
              <Input
                label="Номер студенческого билета"
                value={personalInfo.studentCard}
                onChange={(e) => setPersonalInfo({ ...personalInfo, studentCard: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Курс обучения"
                value={personalInfo.course}
                onChange={(e) => setPersonalInfo({ ...personalInfo, course: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Средний балл (GPA)"
                type="number"
                value={personalInfo.gpa}
                onChange={(e) => setPersonalInfo({ ...personalInfo, gpa: parseFloat(e.target.value) || 0 })}
                disabled={!isEditing}
                fullWidth
              />
              <Input
                label="Дата рождения"
                type="date"
                value={personalInfo.birthDate}
                onChange={(e) => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="profile-section">
            <div className="section-header">
              <div>
                <h2>Безопасность</h2>
                <p className="section-description">Управление паролем и настройками безопасности</p>
              </div>
            </div>

            <Card className="security-card">
              <h3>Изменить пароль</h3>

              {passwordError && <div className="error-message">{passwordError}</div>}
              {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

              <div className="form-stack">
                <Input
                  label="Текущий пароль"
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  fullWidth
                />
                <Input
                  label="Новый пароль"
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  fullWidth
                  helperText="Минимум 8 символов"
                />
                <Input
                  label="Подтвердите пароль"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  fullWidth
                />
                <Button
                  variant="primary"
                  onClick={handleChangePassword}
                  isLoading={isChangingPassword}
                  disabled={!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword}
                >
                  Изменить пароль
                </Button>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <div className="container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'student'}&backgroundColor=2e1a7c`}
                  alt={user?.firstName}
                />
              </div>
              <div className="profile-header-info">
                <h1>{user?.firstName} {user?.lastName}</h1>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-role-badge">{user?.role === 'student' ? 'Студент' : 'Преподаватель'}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <span>Личные данные</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span>Безопасность</span>
            </button>
          </div>

          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};
