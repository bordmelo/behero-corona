const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const needer_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .where('needer_id', needer_id)
      .select('*');

    return res.json(incidents);
  }
}