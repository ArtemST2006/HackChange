/**
 * Data Adapters
 * Convert backend types to frontend types
 */

import type { StudentProfile, CourseDB } from '../types/backend.types';
import type { User, Course } from '../types';

/**
 * Convert backend StudentProfile to frontend User
 */
export function adaptStudentProfileToUser(profile: StudentProfile): User {
  // Parse full name into firstName and lastName
  const nameParts = profile.student_data.name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: String(profile.student.id),
    email: profile.student.email,
    firstName: firstName,
    lastName: lastName,
    username: profile.student.username,
    birthDate: profile.student_data.date_of_birth || undefined,
    role: 'student',
    registeredAt: new Date().toISOString(),

    // Backend-specific fields
    studentCard: profile.student_data.student_card,
    course: profile.student_data.cource, // Note: typo in backend
    gpa: profile.student_data.gpa || undefined,
  };
}

/**
 * Convert frontend User to backend StudentProfile (for updates)
 */
export function adaptUserToStudentProfile(user: User): StudentProfile {
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return {
    student: {
      id: parseInt(user.id),
      username: user.username || user.email.split('@')[0],
      email: user.email,
    },
    student_data: {
      name: fullName,
      student_card: (user as any).studentCard || '',
      date_of_birth: user.birthDate || null,
      cource: (user as any).course || '', // Note: typo in backend
      gpa: (user as any).gpa || null,
    },
  };
}

/**
 * Convert backend CourseDB to frontend Course
 */
export function adaptCourseDBToCourse(courseDB: CourseDB): Course {
  return {
    id: courseDB.name, // Backend uses name as identifier
    title: courseDB.name,
    description: courseDB.description,
    teacherName: courseDB.professor,
    category: courseDB.type,
    coverImage: '/default-course-cover.jpg', // No image in backend
    teacherId: '0', // Not provided by backend
    progress: 0,
    totalModules: 0,
    completedModules: 0,
    isActive: true,
    startDate: new Date().toISOString(),
  };
}

/**
 * Convert array of backend courses to frontend courses
 */
export function adaptCoursesDBToCourses(coursesDB: CourseDB[]): Course[] {
  return coursesDB.map(adaptCourseDBToCourse);
}
