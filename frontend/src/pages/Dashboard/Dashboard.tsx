import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card, Button, Slider } from '../../components/shared';
import { mockDashboardData, mockCourses, mockFeaturedCourses } from '../../utils/mockData';
import './Dashboard.css';

type SortOption = 'newest' | 'popular' | 'rating' | 'title';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { statistics, continueLearning } = mockDashboardData;
  const [selectedCategory, setSelectedCategory] = useState<string>('Все курсы');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const categories = ['Все курсы', 'Программирование', 'Дизайн', 'Бизнес', 'Маркетинг', 'Data Science'];

  const filteredCourses = mockCourses
    .filter((course) => {
      // Поиск
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Категория
      const matchesCategory = selectedCategory === 'Все курсы' || course.category === selectedCategory;

      // Продолжительность
      let matchesDuration = true;
      if (durationFilter === 'short') matchesDuration = (course.duration || 0) < 30;
      else if (durationFilter === 'medium') matchesDuration = (course.duration || 0) >= 30 && (course.duration || 0) <= 60;
      else if (durationFilter === 'long') matchesDuration = (course.duration || 0) > 60;

      // Сложность
      const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDuration && matchesDifficulty;
    })
    .sort((a, b) => {
      // Сортировка
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'popular':
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-main">
        <div className="container">

          {/* Статистика */}
          <div className="stats-grid">
            <Card className="stat-card stat-card-1">
              <div className="stat-card-content">
                <p className="stat-label">Активных курсов</p>
                <h3 className="stat-value">{statistics.activeCourses}</h3>
                <div className="stat-trend positive">
                  <span className="trend-arrow">↗</span>
                  <span className="trend-text">+2 в этом месяце</span>
                </div>
              </div>
            </Card>
            <Card className="stat-card stat-card-2">
              <div className="stat-card-content">
                <p className="stat-label">Выполнено заданий</p>
                <h3 className="stat-value">{statistics.completedHomeworks}<span className="stat-total">/{statistics.totalHomeworks}</span></h3>
                <div className="stat-progress-mini">
                  <div className="stat-progress-bar" style={{ width: `${(statistics.completedHomeworks / statistics.totalHomeworks) * 100}%` }}></div>
                </div>
              </div>
            </Card>
            <Card className="stat-card stat-card-3">
              <div className="stat-card-content">
                <p className="stat-label">Средний балл</p>
                <h3 className="stat-value">{statistics.averageGrade}<span className="stat-unit">%</span></h3>
                <div className="stat-trend positive">
                  <span className="trend-arrow">↗</span>
                  <span className="trend-text">+5% за неделю</span>
                </div>
              </div>
            </Card>
            <Card className="stat-card stat-card-4">
              <div className="stat-card-content">
                <p className="stat-label">Учебная серия</p>
                <h3 className="stat-value">{statistics.streak}<span className="stat-unit"> дней</span></h3>
                <div className="stat-trend neutral">
                  <span className="trend-text">Не прерывайте серию!</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Продолжить обучение */}
          {continueLearning && (
            <section className="section">
              <h2>Продолжить обучение</h2>
              <Card className="continue-card" onClick={() => navigate(`/courses/${continueLearning.id}`)}>
                <img src={continueLearning.coverImage} alt={continueLearning.title} className="course-cover" />
                <div className="course-info">
                  <h3>{continueLearning.title}</h3>
                  <p>Модуль 3: Функции и классы</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${continueLearning.progress}%` }} />
                  </div>
                  <p className="progress-text">{continueLearning.progress}% пройдено</p>
                  <Button variant="secondary">Продолжить обучение →</Button>
                </div>
              </Card>
            </section>
          )}

          {/* Слайдер лучших курсов */}
          <section className="section">
            <h2>Лучшие курсы</h2>
            <Slider items={mockFeaturedCourses} onItemClick={(item) => navigate(`/courses/${item.id}`)} />
          </section>

          {/* Каталог курсов */}
          <section className="section">
            <div className="catalog-header">
              <h2>
                Каталог курсов
                <span className="catalog-results-count">{filteredCourses.length} курсов</span>
              </h2>

              {/* Поиск */}
              <div className="catalog-search-wrapper">
                <input
                  type="search"
                  placeholder="Поиск курсов..."
                  className="catalog-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Категории */}
              <div className="catalog-categories">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Фильтры и сортировка */}
              <div className="catalog-controls">
                <div className="filter-group">
                  <label>Сортировка</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="filter-select">
                    <option value="popular">Популярные</option>
                    <option value="newest">Новые</option>
                    <option value="rating">По рейтингу</option>
                    <option value="title">По названию</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Длительность</label>
                  <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value as DurationFilter)} className="filter-select">
                    <option value="all">Все</option>
                    <option value="short">До 30 ч</option>
                    <option value="medium">30-60 ч</option>
                    <option value="long">Более 60 ч</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Сложность</label>
                  <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)} className="filter-select">
                    <option value="all">Все уровни</option>
                    <option value="beginner">Начальный</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>

                {(sortBy !== 'popular' || durationFilter !== 'all' || difficultyFilter !== 'all' || selectedCategory !== 'Все курсы' || searchQuery !== '') && (
                  <button
                    className="clear-filters-btn"
                    onClick={() => {
                      setSortBy('popular');
                      setDurationFilter('all');
                      setDifficultyFilter('all');
                      setSelectedCategory('Все курсы');
                      setSearchQuery('');
                    }}
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            </div>
            <div className="courses-grid">
              {filteredCourses.map((course) => {
                const isNew = course.createdAt && new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                const isTop = (course.rating || 0) >= 4.8;

                return (
                  <Card key={course.id} hoverable onClick={() => navigate(`/courses/${course.id}`)} className="course-card">
                    <div className="course-image-wrapper">
                      {isNew && <div className="course-badge new">Новинка</div>}
                      {!isNew && isTop && <div className="course-badge top">Топ курс</div>}
                      <img src={course.coverImage} alt={course.title} className="course-image" />
                      <div className="course-overlay"></div>
                    </div>

                    <div className="course-content">
                      <div className="course-header">
                        <h3>{course.title}</h3>
                        <p className="course-author">{course.teacherName}</p>
                      </div>

                      {/* Метаданные */}
                      <div className="course-meta">
                        {course.duration && (
                          <div className="course-meta-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span>{course.duration}ч</span>
                          </div>
                        )}
                        {course.rating && (
                          <div className="course-meta-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 1L10.163 5.38L15 6.12L11.5 9.545L12.326 14.36L8 12.09L3.674 14.36L4.5 9.545L1 6.12L5.837 5.38L8 1Z" fill="currentColor"/>
                            </svg>
                            <span>{course.rating}</span>
                          </div>
                        )}
                        {course.studentsCount && (
                          <div className="course-meta-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M11 7C12.1046 7 13 6.10457 13 5C13 3.89543 12.1046 3 11 3C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M11 9C9.67392 9 8.40215 9.52678 7.46447 10.4645C6.52678 11.4021 6 12.6739 6 14H16C16 12.6739 15.4732 11.4021 14.5355 10.4645C13.5979 9.52678 12.3261 9 11 9Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M5 9C3.67392 9 2.40215 9.52678 1.46447 10.4645C0.526784 11.4021 0 12.6739 0 14H5" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <span>{course.studentsCount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {course.isActive && course.progress !== undefined && (
                        <div className="course-progress-section">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                          </div>
                          <p className="progress-text">{course.progress}% завершено</p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
