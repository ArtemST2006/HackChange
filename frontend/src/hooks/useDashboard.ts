import { useApi } from './useApi';
import { dashboardService } from '../services/api';
import { DashboardData, UserStatistics } from '../types';

export function useDashboard() {
  return useApi<DashboardData>(
    () => dashboardService.getDashboardData(),
    { autoFetch: true }
  );
}

export function useStatistics() {
  return useApi<UserStatistics>(
    () => dashboardService.getStatistics(),
    { autoFetch: true }
  );
}
