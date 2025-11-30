import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { mockCourses } from '../../utils/mockData';
import './Courses.css';

type TabType = 'all' | 'active' | 'completed';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'active') {
      return matchesSearch && course.isActive;
    } else if (activeTab === 'completed') {
      return matchesSearch && course.progress === 100;
    }
    return matchesSearch;
  });

  const activeCourses = mockCourses.filter(c => c.isActive);
  const completedCourses = mockCourses.filter(c => c.progress === 100);

  return (
    <div className="courses-page">
      <Header />
      <main className="courses-main">
        <div className="container">

          {/* Header секция */}
          <div className="page-header">
            <div className="page-title-section">
              <h1 className="page-title">Мои курсы</h1>
              <p className="page-subtitle">Управляйте своим обучением и отслеживайте прогресс</p>
            </div>

            {/* Статистика */}
            <div className="courses-stats">
              <div className="stat-item">
                <div className="stat-icon active-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="stat-number">{activeCourses.length}</span>
                <span className="stat-label">Активных</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon completed-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="stat-number">{completedCourses.length}</span>
                <span className="stat-label">Завершено</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon total-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 2H11L15 6V18H3V2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M11 2V6H15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 11H12M6 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="stat-number">{mockCourses.length}</span>
                <span className="stat-label">Всего</span>
              </div>
            </div>
          </div>

          {/* Поиск */}
          <div className="search-section">
            <div className="search-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                placeholder="Поиск по курсам..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Табы */}
          <div className="tabs-container">
            <button
              className={`tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              <span className="tab-text">Активные</span>
              <span className="tab-count">{activeCourses.length}</span>
            </button>
            <button
              className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <span className="tab-text">Завершенные</span>
              <span className="tab-count">{completedCourses.length}</span>
            </button>
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span className="tab-text">Все курсы</span>
              <span className="tab-count">{mockCourses.length}</span>
            </button>
          </div>

          {/* Список курсов */}
          <div className="courses-grid">
            {filteredCourses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="35" cy="35" r="25" stroke="currentColor" strokeWidth="4"/>
                    <path d="M55 55L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Курсы не найдены</h3>
                <p>Попробуйте изменить фильтры или поисковый запрос</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.id} hoverable onClick={() => navigate(`/courses/${course.id}`)} className="course-card">
                  <div className="course-card-header">
                    <div className="course-image-wrapper">
                      <img src={course.coverImage} alt={course.title} className="course-image" />
                      <div className="course-overlay"></div>
                    </div>
                    {course.isActive && <div className="course-status active">В процессе</div>}
                    {course.progress === 100 && <div className="course-status completed">Завершен</div>}
                  </div>
                  <div className="course-card-content">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-teacher">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8Z" fill="currentColor"/>
                        <path d="M8 10C4.69 10 2 12.69 2 16H14C14 12.69 11.31 10 8 10Z" fill="currentColor"/>
                      </svg>
                      <span>{course.teacherName}</span>
                    </div>

                    <div className="course-info-row">
                      {course.duration && (
                        <span className="info-badge">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span>{course.duration}ч</span>
                        </span>
                      )}
                      {course.rating && (
                        <span className="info-badge">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L10 6L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 6L8 1Z" fill="currentColor"/>
                          </svg>
                          <span>{course.rating}</span>
                        </span>
                      )}
                    </div>

                    <div className="course-progress-section">
                      <div className="progress-header">
                        <span className="progress-label">Прогресс</span>
                        <span className="progress-percentage">{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
};
