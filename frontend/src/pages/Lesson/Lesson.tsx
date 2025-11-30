import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { Quiz } from '../../components/Quiz';
import { mockCourses, mockModules } from '../../utils/mockData';
import {
  module1_lesson1_content,
  module1_lesson2_content,
  module1_lesson3_content,
  module2_lesson1_content,
  module2_lesson2_content,
  module2_lesson3_content,
  module2_lesson4_content,
  module3_lesson1_content,
  module3_lesson2_content,
  module3_lesson3_content,
  module3_lesson4_content,
  module4_lesson1_content,
  module4_lesson2_content,
  module4_lesson3_content,
  module5_lesson1_content,
  module5_lesson2_content,
  module5_lesson3_content,
  module5_lesson4_content,
  module6_lesson1_content,
  module6_lesson2_content,
  module6_lesson3_content,
  module6_lesson4_content
} from '../../data/pythonCourseFull';
import {
  quiz1_basics,
  quiz3_oop,
  exercise1_calculator,
  exercise2_list_functions,
  exercise3_class
} from '../../data/pythonCourse';
import {
  webLessonContentMap,
  webLessonQuizMap
} from '../../data/webCourseFull';
import {
  sqlLessonContentMap,
  sqlLessonQuizMap
} from '../../data/sqlCourseFull';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { QuizAttempt } from '../../types';
import './Lesson.css';

export const Lesson: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();

  const course = mockCourses.find(c => c.id === courseId);
  const courseModules = mockModules.filter(m => m.courseId === courseId);

  // Find the lesson across all modules
  let lesson = null;
  let moduleTitle = '';
  for (const module of courseModules) {
    const foundLesson = module.lessons.find(l => l.id === lessonId);
    if (foundLesson) {
      lesson = foundLesson;
      moduleTitle = module.title;
      break;
    }
  }

  if (!course || !lesson) {
    return (
      <div className="lesson-page">
        <Header />
        <main className="lesson-main">
          <div className="container">
            <h1>Урок не найден</h1>
          </div>
        </main>
      </div>
    );
  }

  // Map lesson IDs to content from pythonCourseFull.ts
  const lessonContentMap: Record<string, any> = {
    // Модуль 1: Основы Python
    'l1': module1_lesson1_content,
    'l2': module1_lesson2_content,
    'l3': module1_lesson3_content,
    // Модуль 2: Переменные и типы данных
    'l4': module2_lesson1_content,
    'l5': module2_lesson2_content,
    'l6': module2_lesson3_content,
    'l7': module2_lesson4_content,
    // Модуль 3: Условия и циклы
    'l8': module3_lesson1_content,
    'l9': module3_lesson2_content,
    'l10': module3_lesson3_content,
    'l11': module3_lesson4_content,
    // Модуль 4: Функции
    'l12': module4_lesson1_content,
    'l13': module4_lesson2_content,
    'p2': module4_lesson3_content,
    // Модуль 5: Структуры данных
    'l15': module5_lesson1_content,
    'l16': module5_lesson2_content,
    'l17': module5_lesson3_content,
    'l18': module5_lesson4_content,
    // Модуль 6: ООП
    'l19': module6_lesson1_content,
    'l20': module6_lesson2_content,
    'l21': module6_lesson3_content,
    'l14': module6_lesson4_content,
    // Web-разработка lessons
    ...webLessonContentMap,
    // SQL lessons
    ...sqlLessonContentMap,
  };

  // Map lesson IDs to quizzes
  const lessonQuizMap: Record<string, any> = {
    'q1': quiz1_basics,
    'l14': quiz3_oop,
    // Web-разработка quizzes
    ...webLessonQuizMap,
    // SQL quizzes
    ...sqlLessonQuizMap,
  };

  // Map lesson IDs to exercises
  const lessonExerciseMap: Record<string, any> = {
    'p1': exercise1_calculator,
    'p2': exercise2_list_functions,
    'p3': exercise3_class,
  };

  const lessonContent = lessonContentMap[lessonId || ''];
  const lessonQuiz = lessonQuizMap[lessonId || ''];
  const lessonExercise = lessonExerciseMap[lessonId || ''];

  // Find previous and next lessons
  let prevLesson = null;
  let nextLesson = null;
  let currentLessonFound = false;

  for (const module of courseModules) {
    for (let i = 0; i < module.lessons.length; i++) {
      if (currentLessonFound && !nextLesson) {
        nextLesson = module.lessons[i];
        break;
      }

      if (module.lessons[i].id === lessonId) {
        currentLessonFound = true;
        if (i > 0) {
          prevLesson = module.lessons[i - 1];
        }
      } else if (!currentLessonFound) {
        prevLesson = module.lessons[i];
      }
    }
    if (nextLesson) break;
  }

  const handleQuizComplete = (attempt: QuizAttempt) => {
    console.log('Quiz completed:', attempt);
    // TODO: Send to backend when real API is ready
    // await quizService.submitAttempt(lessonQuiz.id, attempt);
  };

  // Note: Code submission will be implemented when backend is ready
  // const handleCodeSubmit = async (code: string) => {
  //   console.log('Code submitted:', code);
  //   const result = await exerciseService.runCode(lessonExercise.id, code);
  //   return result;
  // };

  return (
    <div className="lesson-page">
      <Header />
      <main className="lesson-main">
        <div className="container">
          {/* Lesson Header */}
          <div className="lesson-header">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(`/courses/${courseId}`)}
              data-testid="lesson-back-button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Назад к курсу</span>
            </button>
            <div className="lesson-breadcrumb">
              <span>{course.title}</span>
              <span className="separator">›</span>
              <span>{moduleTitle}</span>
            </div>
            <h1 className="lesson-title">{lesson.title}</h1>
            {lesson.duration && (
              <div className="lesson-meta">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{lesson.duration}</span>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="lesson-content">
            {lessonContent && (
              <Card className="theory-card">
                <div className="theory-content">
                  <ReactMarkdown
                    components={{
                      code(props) {
                        const { children, className } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {lessonContent.theory}
                  </ReactMarkdown>

                  {lessonContent.keyPoints && lessonContent.keyPoints.length > 0 && (
                    <div className="key-points">
                      <h3>Ключевые моменты</h3>
                      <ul>
                        {lessonContent.keyPoints.map((point: string, index: number) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lessonContent.codeExamples && lessonContent.codeExamples.length > 0 && (
                    <div className="code-examples">
                      <h3>Примеры кода</h3>
                      {lessonContent.codeExamples.map((example: any, index: number) => (
                        <div key={index} className="code-example">
                          <h4>{example.title}</h4>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language="python"
                            PreTag="div"
                          >
                            {example.code}
                          </SyntaxHighlighter>
                          <p className="example-explanation">{example.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {lessonQuiz && (
              <Quiz quiz={lessonQuiz} onComplete={handleQuizComplete} />
            )}

            {lessonExercise && (
              <Card className="practice-card">
                <div className="practice-content">
                  <h3>{lessonExercise.title}</h3>
                  <p>{lessonExercise.description}</p>

                  <div className="exercise-requirements">
                    <h4>Требования:</h4>
                    <ul>
                      {lessonExercise.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {lessonExercise.starterCode && (
                    <div className="starter-code">
                      <h4>Шаблон кода:</h4>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language="python"
                        PreTag="div"
                      >
                        {lessonExercise.starterCode}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  <div className="test-cases">
                    <h4>Примеры тест-кейсов:</h4>
                    {lessonExercise.testCases
                      .filter((tc: any) => !tc.hidden)
                      .map((testCase: any, index: number) => (
                        <div key={index} className="test-case">
                          <div className="test-input">
                            <strong>Ввод:</strong> {testCase.input}
                          </div>
                          <div className="test-expected">
                            <strong>Ожидаемый результат:</strong> {testCase.expected}
                          </div>
                        </div>
                      ))}
                  </div>

                  {lessonExercise.hints && lessonExercise.hints.length > 0 && (
                    <div className="hints">
                      <h4>Подсказки:</h4>
                      <ul>
                        {lessonExercise.hints.map((hint: string, index: number) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="practice-note">
                    <p>
                      💡 Для выполнения этого задания используйте свою локальную среду разработки Python.
                      После завершения вы сможете загрузить решение или отправить код для проверки.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {!lessonContent && !lessonQuiz && !lessonExercise && (
              <Card className="empty-content">
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2"/>
                    <path d="M32 20V32L40 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>Контент находится в разработке</h3>
                  <p>Материалы для этого урока скоро будут добавлены.</p>
                </div>
              </Card>
            )}
          </div>

          {/* Lesson Navigation */}
          {(prevLesson || nextLesson) && (
            <div className="lesson-navigation">
              {prevLesson && (
                <button
                  type="button"
                  className="nav-button nav-prev"
                  onClick={() => navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="nav-button-text">
                    <span className="nav-label">Предыдущий урок</span>
                    <span className="nav-title">{prevLesson.title}</span>
                  </div>
                </button>
              )}

              {nextLesson && (
                <button
                  type="button"
                  className="nav-button nav-next"
                  onClick={() => navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
                >
                  <div className="nav-button-text">
                    <span className="nav-label">Следующий урок</span>
                    <span className="nav-title">{nextLesson.title}</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
