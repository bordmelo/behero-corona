const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('needers', 'needers.id', 'incidents.needer_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'needers.name', 'needers.email', 'needers.city', 'needers.state']);

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents);
  },
  
  async store(req, res) {
    const { title, description, category, value } = req.body;
    const needer_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      category,
      value,
      needer_id
    })

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const needer_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('needer_id')
      .first();

    if (incident.needer_id != needer_id) {
      return res.status(401).json({ 
        error: 'Operation not permitted.'
      });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}