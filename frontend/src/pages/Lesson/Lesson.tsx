import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { Quiz } from '../../components/Quiz';
import { mockCourses, mockModules } from '../../utils/mockData';
import {
  module1_lesson1_content,
  module1_lesson2_content,
  module1_lesson3_content
} from '../../data/pythonCourseFull';
import {
  quiz1_basics,
  quiz3_oop,
  exercise1_calculator,
  exercise2_list_functions,
  exercise3_class
} from '../../data/pythonCourse';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { QuizAttempt } from '../../types';
import './Lesson.css';

export const Lesson: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'practice'>('theory');

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
    'l1': module1_lesson1_content,
    'l2': module1_lesson2_content,
    'l3': module1_lesson3_content,
  };

  // Map lesson IDs to quizzes
  const lessonQuizMap: Record<string, any> = {
    'q1': quiz1_basics,
    'l14': quiz3_oop,
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
            <button className="back-button" onClick={() => navigate(`/courses/${courseId}`)}>
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

          {/* Lesson Tabs */}
          {(lessonContent || lessonQuiz || lessonExercise) && (
            <div className="lesson-tabs">
              {lessonContent && (
                <button
                  className={`tab ${activeTab === 'theory' ? 'active' : ''}`}
                  onClick={() => setActiveTab('theory')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4H16M4 8H16M4 12H12M4 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Теория</span>
                </button>
              )}
              {lessonQuiz && (
                <button
                  className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quiz')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Тест</span>
                </button>
              )}
              {lessonExercise && (
                <button
                  className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
                  onClick={() => setActiveTab('practice')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Практика</span>
                </button>
              )}
            </div>
          )}

          {/* Lesson Content */}
          <div className="lesson-content">
            {activeTab === 'theory' && lessonContent && (
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

            {activeTab === 'quiz' && lessonQuiz && (
              <Quiz quiz={lessonQuiz} onComplete={handleQuizComplete} />
            )}

            {activeTab === 'practice' && lessonExercise && (
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
        </div>
      </main>
    </div>
  );
};
