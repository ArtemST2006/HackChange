import { apiClient } from './client';
import { userService } from './user.service';
import { adaptCoursesDBToCourses, adaptStudentProfileToUser } from '../../utils/adapters';
import type { CourseDB } from '../../types/backend.types';
import type { DashboardData, UserStatistics, Course, User } from '../../types';

/**
 * Dashboard Service
 * Note: Backend /dashboard endpoint is not implemented yet
 * Using combination of available endpoints
 */
export const dashboardService = {
  /**
   * Get all available courses
   * GET /courses (Public)
   */
  async getAllCourses(): Promise<CourseDB[]> {
    const response = await apiClient.get<CourseDB[]>('/courses');
    return response;
  },

  /**
   * Build dashboard data by composing user profile, statistics and courses
   */
  async getDashboardData(): Promise<DashboardData> {
    // Fetch user profile (may fail if not authenticated)
    let user = undefined;
    try {
      const profile = await userService.getProfile();
      user = adaptStudentProfileToUser(profile);
    } catch (e) {
      // ignore - dashboard may be shown for anonymous users
      user = undefined as any;
    }

  // Fetch enrolled courses for the user
  let myCourses: Course[] = [];
    try {
      const coursesDB = await userService.getEnrolledCourses();
      myCourses = adaptCoursesDBToCourses(coursesDB);
    } catch (e) {
      myCourses = [];
    }

    // Fetch all available courses as recommendations
  let recommendedCourses: Course[] = [];
    try {
      const allCoursesDB = await this.getAllCourses();
      recommendedCourses = adaptCoursesDBToCourses(allCoursesDB).slice(0, 6);
    } catch (e) {
      recommendedCourses = [];
    }

    // Minimal statistics derived from available data
    const statistics: UserStatistics = {
      activeCourses: myCourses.length,
      completedCourses: myCourses.filter(c => c.progress === 100).length,
      totalHomeworks: 0,
      completedHomeworks: 0,
      totalTests: 0,
      completedTests: 0,
      averageGrade: myCourses.length > 0 ? myCourses.reduce((acc, c) => acc + (c.averageGrade || 0), 0) / myCourses.length : 0,
      streak: 0,
      totalStudyTime: 0,
      registeredAt: (user as User | undefined)?.registeredAt || new Date().toISOString(),
    };

    const dashboardData: DashboardData = {
      user,
      statistics,
      continueLearning: myCourses.find(c => c.progress > 0 && c.progress < 100) || myCourses[0],
      upcomingDeadlines: [],
      myCourses,
      recommendedCourses,
      recentActivity: [],
    };

    return dashboardData;
  },

  /**
   * Return simplified user statistics for widgets
   */
  async getStatistics(): Promise<UserStatistics> {
    const data = await this.getDashboardData();
    return data.statistics;
  }
};
