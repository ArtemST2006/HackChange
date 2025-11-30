import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card, Button, Slider } from '../../components/shared';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api/user.service';
import { coursesService } from '../../services/api/courses.service';
import { adaptCourseDBToCourse } from '../../utils/adapters';
import type { Course } from '../../types';
import './Dashboard.css';

type SortOption = 'newest' | 'popular' | 'rating' | 'title';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('Все курсы');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingCourse, setEnrollingCourse] = useState<string | null>(null);

  // Mock statistics - replace with real API when available
  const statistics = {
    activeCourses: myCourses.length,
    completedCourses: myCourses.filter(c => c.progress === 100).length,
    totalHomeworks: 24,
    completedHomeworks: 18,
    averageGrade: 85,
    streak: 7,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user's enrolled courses
        const coursesDB = await userService.getEnrolledCourses();
        const adaptedCourses = coursesDB.map(adaptCourseDBToCourse);
        setMyCourses(adaptedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setMyCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId: string, courseName: string) => {
    if (!user?.email) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    try {
      setEnrollingCourse(courseId);
      await coursesService.enrollInCourse(courseName, user.email);
      alert('Вы успешно записались на курс!');
      // Refresh courses
      const coursesDB = await userService.getEnrolledCourses();
      const adaptedCourses = coursesDB.map(adaptCourseDBToCourse);
      setMyCourses(adaptedCourses);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Ошибка при записи на курс. Возможно, вы уже записаны.');
    } finally {
      setEnrollingCourse(null);
    }
  };

  const categories = ['Все курсы', ...Array.from(new Set(myCourses.map(c => c.category).filter(Boolean)))];

  const filteredCourses = myCourses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все курсы' || course.category === selectedCategory;
      let matchesDuration = true;
      if (durationFilter === 'short') matchesDuration = (course.duration || 0) < 30;
      else if (durationFilter === 'medium') matchesDuration = (course.duration || 0) >= 30 && (course.duration || 0) <= 60;
      else if (durationFilter === 'long') matchesDuration = (course.duration || 0) > 60;
      const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDuration && matchesDifficulty;
    })
    .sort((a, b) => {
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

  const continueLearning = myCourses.find(c => c.progress > 0 && c.progress < 100) || myCourses[0];

  if (isLoading) {
    return (
      <div className="dashboard">
        <Header />
        <main className="dashboard-main">
          <div className="container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Загрузка...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-main">
        <div className="container">

          {/* Приветствие */}
          {user && (
            <div className="welcome-section">
              <h1>Добро пожаловать, {user.firstName}!</h1>
              <p>Продолжайте обучение и достигайте новых целей</p>
            </div>
          )}

          {/* Статистика */}
          <div className="stats-grid">
            <Card className="stat-card stat-card-1">
              <div className="stat-card-content">
                <p className="stat-label">Активных курсов</p>
                <h3 className="stat-value">{statistics.activeCourses}</h3>
                <div className="stat-trend positive">
                  <span className="trend-arrow">↗</span>
                  <span className="trend-text">Ваши курсы</span>
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
                  <span className="trend-text">Отлично!</span>
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
                  <p>{continueLearning.description}</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${continueLearning.progress}%` }} />
                  </div>
                  <p className="progress-text">{continueLearning.progress}% пройдено</p>
                  <Button variant="secondary">Продолжить обучение →</Button>
                </div>
              </Card>
            </section>
          )}

          {/* Мои курсы слайдер */}
          {myCourses.length > 0 && (
            <section className="section">
              <h2>Мои курсы</h2>
                {/* Map Course -> SliderItem (Slider expects `image` property) */}
                <Slider
                  items={myCourses.map(c => ({
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    image: c.coverImage || '/default-course-cover.jpg',
                  }))}
                  onItemClick={(item) => navigate(`/courses/${item.id}`)}
                />
            </section>
          )}

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
              {categories.length > 1 && (
                <div className="catalog-categories">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat || 'Все курсы')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

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

                {(sortBy !== 'popular' || selectedCategory !== 'Все курсы' || searchQuery !== '') && (
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

            {/* Пустое состояние */}
            {myCourses.length === 0 && (
              <div className="empty-state">
                <h3>У вас пока нет курсов</h3>
                <p>Запишитесь на курсы чтобы начать обучение</p>
              </div>
            )}

            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <Card key={course.id} hoverable onClick={() => navigate(`/courses/${course.id}`)} className="course-card">
                  <div className="course-image-wrapper">
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
                      {course.category && (
                        <div className="course-meta-item">
                          <span>{course.category}</span>
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

                    {/* Enroll button if not yet enrolled */}
                    {!course.isActive && (
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(course.id, course.title);
                        }}
                        disabled={enrollingCourse === course.id}
                        style={{ width: '100%', marginTop: '12px' }}
                      >
                        {enrollingCourse === course.id ? 'Записываюсь...' : 'Записаться'}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
