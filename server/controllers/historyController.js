const { History } = require("../models");

class HistoryController {
  static async showHistory(request, response, next) {
    try {
      const data = await History.findAll({
        order: [
          ['id', 'DESC']
        ],
      });

      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
