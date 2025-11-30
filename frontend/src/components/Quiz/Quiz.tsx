import React, { useState, useEffect } from 'react';
import type { Quiz as QuizType, QuizQuestion, QuizAnswer, QuizAttempt } from '../../types';
import './Quiz.css';

interface QuizProps {
  quiz: QuizType;
  onComplete: (attempt: QuizAttempt) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | string[]>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, answer);
    setAnswers(newAnswers);
  };

  const handleSingleChoice = (optionId: string) => {
    handleAnswer(currentQuestion.id, optionId);
  };

  const handleMultipleChoice = (optionId: string) => {
    const currentAnswers = (answers.get(currentQuestion.id) as string[]) || [];
    const newAnswers = currentAnswers.includes(optionId)
      ? currentAnswers.filter(id => id !== optionId)
      : [...currentAnswers, optionId];
    handleAnswer(currentQuestion.id, newAnswers);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    const quizAnswers: QuizAnswer[] = quiz.questions.map(question => {
      const userAnswer = answers.get(question.id);
      const isCorrect = checkAnswer(question, userAnswer);
      const pointsEarned = isCorrect ? question.points : 0;

      return {
        questionId: question.id,
        answer: userAnswer || '',
        isCorrect,
        pointsEarned,
      };
    });

    const totalPoints = quizAnswers.reduce((sum, ans) => sum + ans.pointsEarned, 0);
    const maxPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((totalPoints / maxPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      userId: 'current-user', // Should come from auth context
      answers: quizAnswers,
      score: totalPoints,
      percentage,
      passed,
      startedAt: new Date(startTime).toISOString(),
      completedAt: new Date().toISOString(),
      timeSpent,
      attemptNumber: 1, // Should be tracked
    };

    setShowResults(true);
    onComplete(attempt);
  };

  const checkAnswer = (
    question: QuizQuestion,
    userAnswer: string | string[] | undefined
  ): boolean => {
    if (!userAnswer) return false;

    if (Array.isArray(question.correctAnswer)) {
      if (!Array.isArray(userAnswer)) return false;
      const correctSet = new Set(question.correctAnswer);
      const userSet = new Set(userAnswer);
      return correctSet.size === userSet.size &&
        [...correctSet].every(ans => userSet.has(ans));
    }

    return userAnswer === question.correctAnswer;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  if (showResults) {
    const totalPoints = quiz.questions.reduce((total, q) => total + q.points, 0);
    const earnedPoints = quiz.questions.reduce((total, q) => {
      const answer = answers.get(q.id);
      return total + (checkAnswer(q, answer) ? q.points : 0);
    }, 0);
    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    return (
      <div className="quiz-results">
        <h2>Результаты теста</h2>
        <div className="results-summary">
          <div className={`result-badge ${passed ? 'passed' : 'failed'}`}>
            {passed ? '✅ Тест пройден!' : '❌ Тест не пройден'}
          </div>
          <div className="result-stats">
            <div className="stat">
              <span className="label">Набрано баллов:</span>
              <span className="value">{earnedPoints} / {totalPoints}</span>
            </div>
            <div className="stat">
              <span className="label">Процент:</span>
              <span className="value">{percentage}%</span>
            </div>
            <div className="stat">
              <span className="label">Проходной балл:</span>
              <span className="value">{quiz.passingScore}%</span>
            </div>
            <div className="stat">
              <span className="label">Время:</span>
              <span className="value">{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>

        {quiz.showCorrectAnswers && (
          <div className="answers-review">
            <h3>Разбор ответов</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = answers.get(question.id);
              const isCorrect = checkAnswer(question, userAnswer);

              return (
                <div key={question.id} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="question-header">
                    <span className="question-number">Вопрос {index + 1}</span>
                    <span className={`result-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <p className="question-text">{question.question}</p>
                  {question.code && (
                    <pre className="code-block">{question.code}</pre>
                  )}
                  {question.explanation && (
                    <div className="explanation">
                      <strong>Объяснение:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <div className="quiz-info">
          <span>Вопрос {currentQuestionIndex + 1} из {quiz.questions.length}</span>
          <span>Время: {formatTime(timeSpent)}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-container">
        <h3 className="question-text">{currentQuestion.question}</h3>

        {currentQuestion.code && (
          <pre className="code-block">{currentQuestion.code}</pre>
        )}

        <div className="options-container">
          {currentQuestion.type === 'single-choice' && (
            <>
              {currentQuestion.options?.map(option => (
                <label key={option.id} className="option">
                  <input
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={answers.get(currentQuestion.id) === option.id}
                    onChange={() => handleSingleChoice(option.id)}
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </>
          )}

          {currentQuestion.type === 'multiple-choice' && (
            <>
              {currentQuestion.options?.map(option => {
                const currentAnswers = (answers.get(currentQuestion.id) as string[]) || [];
                return (
                  <label key={option.id} className="option">
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={currentAnswers.includes(option.id)}
                      onChange={() => handleMultipleChoice(option.id)}
                    />
                    <span>{option.text}</span>
                  </label>
                );
              })}
            </>
          )}

          {currentQuestion.type === 'true-false' && (
            <>
              {currentQuestion.options?.map(option => (
                <label key={option.id} className="option">
                  <input
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={answers.get(currentQuestion.id) === option.id}
                    onChange={() => handleSingleChoice(option.id)}
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="quiz-actions">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Назад
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!answers.has(currentQuestion.id)}
        >
          {isLastQuestion ? 'Завершить тест' : 'Далее →'}
        </button>
      </div>
    </div>
  );
};
