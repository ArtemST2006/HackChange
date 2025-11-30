import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { mockHomework, mockCourses } from '../../utils/mockData';
import './Homework.css';

type FilterType = 'all' | 'pending' | 'submitted' | 'overdue';

export const Homework: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('pending');

  const now = new Date();

  const filteredHomework = mockHomework.filter((hw) => {
    const deadline = new Date(hw.deadline);
    const isOverdue = deadline < now && hw.status !== 'graded';

    if (activeFilter === 'pending') {
      return hw.status === 'not-started' || hw.status === 'in-progress';
    } else if (activeFilter === 'submitted') {
      return hw.status === 'submitted' || hw.status === 'graded';
    } else if (activeFilter === 'overdue') {
      return isOverdue;
    }
    return true;
  });

  const pendingCount = mockHomework.filter(hw => hw.status === 'not-started' || hw.status === 'in-progress').length;
  const submittedCount = mockHomework.filter(hw => hw.status === 'submitted' || hw.status === 'graded').length;
  const overdueCount = mockHomework.filter(hw => {
    const deadline = new Date(hw.deadline);
    return deadline < now && hw.status !== 'graded';
  }).length;

  const getStatusInfo = (hw: typeof mockHomework[0]) => {
    const deadline = new Date(hw.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (hw.status === 'graded') {
      return {
        label: `Оценка: ${hw.grade}%`,
        color: 'success',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6.4 12L2.4 8L3.52 6.88L6.4 9.76L12.48 3.68L13.6 4.8L6.4 12Z" fill="currentColor"/>
          </svg>
        )
      };
    } else if (hw.status === 'submitted') {
      return {
        label: 'На проверке',
        color: 'info',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      };
    } else if (deadline < now) {
      return {
        label: 'Просрочено',
        color: 'danger',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L0 14H16L8 0Z" fill="currentColor"/>
            <path d="M7 6H9V10H7V6ZM7 11H9V13H7V11Z" fill="white"/>
          </svg>
        )
      };
    } else if (daysLeft <= 1) {
      return {
        label: `Осталось ${daysLeft} день`,
        color: 'warning',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L9.5 6L14 6.5L10.5 10L11.5 14.5L8 12L4.5 14.5L5.5 10L2 6.5L6.5 6L8 2Z" fill="currentColor"/>
          </svg>
        )
      };
    } else if (daysLeft <= 3) {
      return {
        label: `Осталось ${daysLeft} дня`,
        color: 'warning',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      };
    } else {
      return {
        label: `Осталось ${daysLeft} дней`,
        color: 'default',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="homework-page">
      <Header />
      <main className="homework-main">
        <div className="container">

          {/* Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h1 className="page-title">Домашние задания</h1>
              <p className="page-subtitle">Отслеживайте свои задания и дедлайны</p>
            </div>

            {/* Quick Stats */}
            <div className="homework-quick-stats">
              <div className="quick-stat pending">
                <div className="quick-stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="quick-stat-info">
                  <span className="quick-stat-number">{pendingCount}</span>
                  <span className="quick-stat-label">К выполнению</span>
                </div>
              </div>
              <div className="quick-stat success">
                <div className="quick-stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="currentColor"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="quick-stat-info">
                  <span className="quick-stat-number">{submittedCount}</span>
                  <span className="quick-stat-label">Сдано</span>
                </div>
              </div>
              {overdueCount > 0 && (
                <div className="quick-stat danger">
                  <div className="quick-stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 20H22L12 2Z" fill="currentColor"/>
                      <path d="M11 10H13V14H11V10ZM11 15H13V17H11V15Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="quick-stat-info">
                    <span className="quick-stat-number">{overdueCount}</span>
                    <span className="quick-stat-label">Просрочено</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              <span>К выполнению</span>
              <span className="filter-badge">{pendingCount}</span>
            </button>
            <button
              className={`filter-tab ${activeFilter === 'submitted' ? 'active' : ''}`}
              onClick={() => setActiveFilter('submitted')}
            >
              <span>Сданные</span>
              <span className="filter-badge">{submittedCount}</span>
            </button>
            {overdueCount > 0 && (
              <button
                className={`filter-tab ${activeFilter === 'overdue' ? 'active' : ''}`}
                onClick={() => setActiveFilter('overdue')}
              >
                <span>Просроченные</span>
                <span className="filter-badge danger">{overdueCount}</span>
              </button>
            )}
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <span>Все задания</span>
              <span className="filter-badge">{mockHomework.length}</span>
            </button>
          </div>

          {/* Homework List */}
          <div className="homework-list">
            {filteredHomework.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="4"/>
                    <path d="M30 40L37 47L52 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Нет заданий</h3>
                <p>Отличная работа! У вас нет заданий в этой категории</p>
              </div>
            ) : (
              filteredHomework.map((hw) => {
                const statusInfo = getStatusInfo(hw);
                return (
                  <Card key={hw.id} hoverable onClick={() => navigate(`/homework/${hw.id}`)} className="homework-card">
                    <div className="homework-card-layout">
                      <div className="homework-course-image">
                        <img
                          src={mockCourses.find(c => c.id === hw.courseId)?.coverImage || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400'}
                          alt={hw.courseName}
                        />
                        <div className="course-image-overlay"></div>
                      </div>
                      <div className="homework-card-content">
                        <div className="homework-header">
                          <div className="homework-title-section">
                            <h3 className="homework-title">{hw.title}</h3>
                            <div className="homework-course">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4L8 2L14 4V10C14 12.5 11 14.5 8 16C5 14.5 2 12.5 2 10V4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              </svg>
                              <span>{hw.courseName}</span>
                            </div>
                          </div>
                          <div className={`homework-status ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </div>
                        </div>

                        <p className="homework-description">{hw.description}</p>

                        <div className="homework-footer">
                          <div className="homework-meta">
                            <span className="meta-item">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              <span>Дедлайн: {formatDate(hw.deadline)}</span>
                            </span>
                          </div>
                          <button className="homework-action-btn">
                            {hw.status === 'not-started' ? 'Начать выполнение' : 'Подробнее'} →
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

        </div>
      </main>
    </div>
  );
};
