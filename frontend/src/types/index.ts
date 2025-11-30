// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  patronymic?: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  bio?: string;
  role: 'student' | 'teacher' | 'admin';
  registeredAt: string;

  // Backend-specific fields (from StudentData)
  studentCard?: string; // student_card
  course?: string; // cource (typo in backend)
  gpa?: number; // grade point average
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  isActive: boolean;
  startDate: string;
  averageGrade?: number;
  category?: string;
  duration?: number; // продолжительность в часах
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  rating?: number;
  studentsCount?: number;
  createdAt?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
  isExpanded?: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'text' | 'practice' | 'test' | 'homework';
  duration?: string;
  status: 'completed' | 'in-progress' | 'locked';
  order: number;
  videoUrl?: string;
  content?: string;
  materials?: Material[];
}

export interface Material {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  url: string;
  size?: string;
}

// Homework Types
export interface Homework {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  deadline: string;
  maxGrade: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt?: string;
  attempts: number;
  maxAttempts?: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  textAnswer?: string;
  files: UploadedFile[];
  submittedAt: string;
  version: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Grade Types
export interface Grade {
  id: string;
  homeworkId: string;
  homeworkTitle: string;
  courseId: string;
  courseName: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  gradedAt: string;
  feedback?: string;
}

export interface CourseGrades {
  courseId: string;
  courseName: string;
  teacherName: string;
  progress: number;
  averageGrade: number;
  homeworks: Grade[];
  tests: Grade[];
}

// Statistics Types
export interface UserStatistics {
  activeCourses: number;
  completedCourses: number;
  totalHomeworks: number;
  completedHomeworks: number;
  totalTests: number;
  completedTests: number;
  averageGrade: number;
  streak: number;
  totalStudyTime: number;
  registeredAt: string;
}

export interface ProgressDataPoint {
  week: string;
  value: number;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

// Activity Types
export interface Activity {
  id: string;
  type: 'homework_submitted' | 'lesson_completed' | 'course_started' | 'grade_received';
  title: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;

  // Backend required fields
  username: string;
  studentCard: string;
  dateOfBirth: string;
  course: string;
  gpa: number;
}

// Dashboard Types
export interface DashboardData {
  user: User;
  statistics: UserStatistics;
  continueLearning?: Course;
  upcomingDeadlines: Homework[];
  myCourses: Course[];
  recommendedCourses: Course[];
  recentActivity: Activity[];
}

// Notification Types (for toast notifications)
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Filter and Sort Types
export type CourseFilter = 'all' | 'active' | 'completed';
export type CourseSortBy = 'alphabet' | 'progress' | 'startDate' | 'lastActivity';
export type HomeworkFilter = 'all' | 'pending' | 'submitted' | 'graded' | 'overdue';
export type HomeworkSortBy = 'deadline' | 'course' | 'grade';

// Theme Types
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'ru' | 'en';

// Settings Types
export interface UserSettings {
  theme: Theme;
  language: Language;
  timezone: string;
  emailDigest: 'instant' | 'daily' | 'weekly' | 'never';
  showProfile: boolean;
  showOnlineStatus: boolean;
  showGrades: boolean;
}

// Quiz/Test Types
export interface QuizQuestion {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'true-false' | 'code' | 'text';
  question: string;
  code?: string; // Optional code snippet to display
  options?: QuizOption[]; // For choice questions
  correctAnswer: string | string[]; // For auto-grading
  explanation?: string; // Shown after answering
  points: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean; // Used for checking answers
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
  passingScore: number; // percentage
  maxAttempts: number;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // in seconds
  attemptNumber: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
}

// Code Exercise Types
export interface CodeExercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  language: 'python' | 'javascript' | 'java' | 'cpp';
  testCases: TestCase[];
  hints?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean; // Hidden test cases are not shown to student
  points: number;
}

export interface CodeSubmission {
  id: string;
  exerciseId: string;
  userId: string;
  code: string;
  result: CodeExecutionResult;
  submittedAt: string;
}

export interface CodeExecutionResult {
  success: boolean;
  passedTests: number;
  totalTests: number;
  testResults: TestResult[];
  executionTime: number; // in ms
  error?: string;
  score: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}
