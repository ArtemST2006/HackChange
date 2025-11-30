import React, { useState } from 'react';
import { Header, Button, Input, Card } from '../../components/shared';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

type TabType = 'personal' | 'security';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    bio: user?.bio || '',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSavePersonal = () => {
    console.log('Saving personal info:', personalInfo);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    console.log('Changing password:', securityData);
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Отмена
                  </Button>
                  <Button variant="primary" onClick={handleSavePersonal}>
                    Сохранить
                  </Button>
                </div>
              )}
            </div>

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
                label="Телефон"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                disabled={!isEditing}
                fullWidth
              />
            </div>

            <Input
              label="Город"
              value={personalInfo.city}
              onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
              disabled={!isEditing}
              fullWidth
            />

            <div className="form-field">
              <label className="field-label">О себе</label>
              <textarea
                className={`bio-textarea ${!isEditing ? 'disabled' : ''}`}
                value={personalInfo.bio}
                onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
                placeholder="Расскажите о себе..."
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
                />
                <Input
                  label="Подтвердите пароль"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  fullWidth
                />
                <Button variant="primary" onClick={handleChangePassword}>
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
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=student&backgroundColor=2e1a7c'}
                  alt={user?.firstName}
                />
              </div>
              <div className="profile-header-info">
                <h1>{user?.firstName} {user?.lastName}</h1>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-role-badge">{user?.role === 'student' ? 'Студент' : 'Преподаватель'}</span>
              </div>
            </div>
            <Button variant="outline">Загрузить фото</Button>
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

          {}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};
