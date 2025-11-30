import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/shared';
import { homeworkDetails } from '../../data/homeworkDetails';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './HomeworkDetail.css';

export const HomeworkDetail: React.FC = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const homework = homeworkDetails.find(hw => hw.id === homeworkId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!homework) {
    return (
      <div className="homework-detail-page">
        <Header />
        <main className="homework-detail-main">
          <div className="container">
            <h1>Домашнее задание не найдено</h1>
          </div>
        </main>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (homework.status) {
      case 'graded':
        return (
          <div className="status-badge graded">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="currentColor"/>
              <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Проверено: {homework.grade}%</span>
          </div>
        );
      case 'submitted':
        return (
          <div className="status-badge submitted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>На проверке</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="status-badge in-progress">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M8 5V8L10.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>В процессе</span>
          </div>
        );
      default:
        return (
          <div className="status-badge not-started">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span>Не начато</span>
          </div>
        );
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

  const getDaysLeft = () => {
    const now = new Date();
    const deadline = new Date(homework.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (homework.status === 'graded' || homework.status === 'submitted') {
      return null;
    }

    if (daysLeft < 0) {
      return <span className="deadline-overdue">Просрочено на {Math.abs(daysLeft)} дней</span>;
    } else if (daysLeft === 0) {
      return <span className="deadline-urgent">Сегодня последний день!</span>;
    } else if (daysLeft === 1) {
      return <span className="deadline-urgent">Остался 1 день</span>;
    } else if (daysLeft <= 3) {
      return <span className="deadline-warning">Осталось {daysLeft} дня</span>;
    } else {
      return <span className="deadline-normal">Осталось {daysLeft} дней</span>;
    }
  };

  return (
    <div className="homework-detail-page">
      <Header />
      <main className="homework-detail-main">
        <div className="container">
          {/* Back button */}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate('/homework')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Назад к заданиям</span>
          </button>

          {/* Header */}
          <div className="homework-detail-header">
            <div className="header-top">
              <div className="title-section">
                <h1 className="homework-title">{homework.title}</h1>
                <div className="homework-breadcrumb">
                  <span>{homework.courseName}</span>
                  <span className="separator">›</span>
                  <span>{homework.moduleName}</span>
                </div>
              </div>
              {getStatusBadge()}
            </div>

            <div className="homework-meta-info">
              <div className="meta-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div className="meta-content">
                  <span className="meta-label">Дедлайн</span>
                  <span className="meta-value">{formatDate(homework.deadline)}</span>
                  {getDaysLeft()}
                </div>
              </div>

              <div className="meta-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18 8.5L14 13L15 18.5L10 15.5L5 18.5L6 13L2 8.5L7.5 7.5L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <div className="meta-content">
                  <span className="meta-label">Максимум баллов</span>
                  <span className="meta-value">{homework.maxGrade}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Teacher Feedback (if graded) */}
          {homework.status === 'graded' && homework.grade !== undefined && (
            <Card className="feedback-card">
              <div className="feedback-header">
                <div className="grade-display">
                  <div className={`grade-circle ${homework.grade >= 85 ? 'excellent' : homework.grade >= 70 ? 'good' : 'average'}`}>
                    <span className="grade-number">{homework.grade}</span>
                    <span className="grade-max">/{homework.maxGrade}</span>
                  </div>
                  <div className="grade-info">
                    <h3>Ваша оценка</h3>
                    <p>
                      {homework.grade >= 85 ? 'Отлично!' : homework.grade >= 70 ? 'Хорошо' : 'Удовлетворительно'}
                    </p>
                  </div>
                </div>
                {homework.gradedAt && (
                  <div className="graded-date">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>Проверено {formatDate(homework.gradedAt)}</span>
                  </div>
                )}
              </div>

              {homework.teacherComment && (
                <div className="teacher-comment">
                  <h4>Комментарий преподавателя:</h4>
                  <ReactMarkdown>{homework.teacherComment}</ReactMarkdown>
                </div>
              )}

              {homework.testCases && homework.testCases.length > 0 && (
                <div className="test-results">
                  <h4>Результаты тестов:</h4>
                  <div className="test-cases-list">
                    {homework.testCases.map((testCase, index) => (
                      <div key={index} className={`test-case ${testCase.passed ? 'passed' : 'failed'}`}>
                        <div className="test-case-icon">
                          {testCase.passed ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" fill="#10b981"/>
                              <path d="M6 10L9 13L14 8" stroke="white" strokeWidth="2"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" fill="#ef4444"/>
                              <path d="M7 7L13 13M7 13L13 7" stroke="white" strokeWidth="2"/>
                            </svg>
                          )}
                        </div>
                        <div className="test-case-info">
                          <span className="test-name">{testCase.name}</span>
                          <span className="test-expected">{testCase.expectedOutput}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Submitted status */}
          {homework.status === 'submitted' && homework.submittedAt && (
            <Card className="submission-info-card">
              <div className="submission-info">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#3b82f6" strokeWidth="3" fill="none"/>
                  <path d="M24 12V24L32 28" stroke="#3b82f6" strokeWidth="3"/>
                </svg>
                <div>
                  <h3>Работа отправлена на проверку</h3>
                  <p>Отправлено {formatDate(homework.submittedAt)}</p>
                  <p className="info-text">Преподаватель проверит вашу работу в ближайшее время</p>
                </div>
              </div>
            </Card>
          )}

          {/* Assignment Description */}
          <Card className="assignment-card">
            <h2>Описание задания</h2>
            <div className="assignment-content">
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
                      <code className={className}>{children}</code>
                    );
                  },
                }}
              >
                {homework.fullDescription}
              </ReactMarkdown>
            </div>

            {homework.requirements && homework.requirements.length > 0 && (
              <div className="requirements">
                <h3>Требования к выполнению</h3>
                <ul>
                  {homework.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

          </Card>

          {/* Starter Code */}
          {homework.starterCode && (
            <Card className="code-card">
              <h3>Шаблон для начала работы</h3>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language="python"
                PreTag="div"
                showLineNumbers
              >
                {homework.starterCode}
              </SyntaxHighlighter>
            </Card>
          )}

          {/* Submitted Code */}
          {homework.submittedCode && (homework.status === 'submitted' || homework.status === 'graded') && (
            <Card className="code-card">
              <h3>Ваше решение</h3>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language="python"
                PreTag="div"
                showLineNumbers
              >
                {homework.submittedCode}
              </SyntaxHighlighter>
              {homework.submittedAt && (
                <p className="submission-date">Отправлено: {formatDate(homework.submittedAt)}</p>
              )}
            </Card>
          )}

          {/* File Upload Section */}
          {(homework.status === 'not-started' || homework.status === 'in-progress') && (
            <Card className="file-upload-card">
              <h3>Загрузка файлов</h3>
              <p className="upload-description">
                Загрузите ваше решение. Принимаются файлы: {homework.acceptedFileTypes?.join(', ') || '.py'}
              </p>

              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept={homework.acceptedFileTypes?.join(',') || '.py'}
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M24 20V32M18 26L24 20L30 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="upload-text">Нажмите для выбора файлов или перетащите сюда</span>
                  <span className="upload-hint">Максимальный размер файла: 10 МБ</span>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="uploaded-files-list">
                  <h4>Загруженные файлы ({uploadedFiles.length}):</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="uploaded-file-item">
                      <div className="file-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{formatFileSize(file.size)}</span>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={() => removeFile(index)}
                        aria-label="Удалить файл"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Action Buttons */}
          <div className="homework-actions">
            {homework.status === 'not-started' && (
              <button className="btn-primary btn-large">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 4L14 10L6 16V4Z" fill="currentColor"/>
                </svg>
                Начать выполнение
              </button>
            )}

            {homework.status === 'in-progress' && (
              <>
                <button className="btn-primary btn-large">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10L8 15L17 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  Отправить на проверку
                </button>
                <button className="btn-secondary btn-large">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 7L8 14L4 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  Сохранить черновик
                </button>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};
