import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { mockCourses, mockModules } from '../../utils/mockData';
import './CourseDetail.css';

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = mockCourses.find(c => c.id === courseId);
  const courseModules = mockModules.filter(m => m.courseId === courseId);

  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(courseModules.filter(m => m.isExpanded).map(m => m.id))
  );

  if (!course) {
    return (
      <div className="course-detail-page">
        <Header />
        <main className="course-detail-main">
          <div className="container">
            <h1>Курс не найден</h1>
          </div>
        </main>
      </div>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V16C14 17.1046 13.1046 18 12 18H4C2.89543 18 2 17.1046 2 16V4Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M14 7L18 5V15L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'text':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4H16M4 8H16M4 12H12M4 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case 'practice':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'test':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case 'homework':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 6H16M4 10H16M4 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 14L16 16L18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="#34C759"/>
            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'in-progress':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#007AFF" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="10" r="4" fill="#007AFF"/>
          </svg>
        );
      case 'locked':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="5" y="9" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="course-detail-page">
      <Header />
      <main className="course-detail-main">
        <div className="container">
          {/* Course Hero */}
          <div className="course-hero">
            <div className="course-hero-content">
              <button className="back-button" onClick={() => navigate('/courses')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Назад к курсам</span>
              </button>
              <h1 className="course-hero-title">{course.title}</h1>
              <p className="course-hero-description">{course.description}</p>

              <div className="course-hero-meta">
                <div className="hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C10 2 10 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 2C10 2 10 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z M10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6ZM14 14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14Z" fill="currentColor"/>
                  </svg>
                  <span>{course.teacherName}</span>
                </div>
                <div className="hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{course.duration}ч</span>
                </div>
                <div className="hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12 7L17 7.5L13.5 11L14.5 16L10 13.5L5.5 16L6.5 11L3 7.5L8 7L10 2Z" fill="currentColor"/>
                  </svg>
                  <span>{course.rating}</span>
                </div>
                <div className="hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 11C12.2091 11 14 9.20914 14 7C14 4.79086 12.2091 3 10 3C7.79086 3 6 4.79086 6 7C6 9.20914 7.79086 11 10 11Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 17C3 13.6863 5.68629 11 9 11H11C14.3137 11 17 13.6863 17 17" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{course.studentsCount} студентов</span>
                </div>
              </div>

              <div className="course-progress-block">
                <div className="progress-info">
                  <span className="progress-label">Прогресс прохождения</span>
                  <span className="progress-value">{course.progress}%</span>
                </div>
                <div className="progress-bar-large">
                  <div className="progress-fill-large" style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="progress-stats">
                  <span>{course.completedModules} из {course.totalModules} модулей завершено</span>
                </div>
              </div>
            </div>
            <div className="course-hero-image">
              <img src={course.coverImage} alt={course.title} />
              <div className="hero-image-overlay"></div>
            </div>
          </div>

          {/* Course Content */}
          <div className="course-content">
            <h2 className="content-title">Содержание курса</h2>

            <div className="modules-list">
              {courseModules.map((module, index) => (
                <Card key={module.id} className="module-card">
                  <div className="module-header" onClick={() => toggleModule(module.id)}>
                    <div className="module-info">
                      <div className="module-number">Модуль {index + 1}</div>
                      <h3 className="module-title">{module.title}</h3>
                      <div className="module-meta">
                        <span>{module.completedLessons} / {module.totalLessons} уроков</span>
                        <span className="module-progress">{Math.round((module.completedLessons / module.totalLessons) * 100)}%</span>
                      </div>
                    </div>
                    <div className={`module-toggle ${expandedModules.has(module.id) ? 'expanded' : ''}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {expandedModules.has(module.id) && (
                    <div className="lessons-list">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`lesson-item ${lesson.status}`}
                          onClick={() => lesson.status !== 'locked' && navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                        >
                          <div className="lesson-icon">{getLessonIcon(lesson.type)}</div>
                          <div className="lesson-info">
                            <div className="lesson-title">{lesson.title}</div>
                            {lesson.duration && <div className="lesson-duration">{lesson.duration}</div>}
                          </div>
                          <div className="lesson-status">{getStatusIcon(lesson.status)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
