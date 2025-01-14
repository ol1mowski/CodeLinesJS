import { AuthError } from '../utils/errors.js';

class DashboardController {
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
  }

  getDashboardData = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      if (!userId) {
        throw new AuthError('Brak autoryzacji');
      }

      const data = await this.dashboardService.getDashboardData(userId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default DashboardController; 