const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const needers = await connection('needers').select('*');

    return res.json(needers);
  },

  async store(req, res) {
    const { name, email, whatsapp, city, state } = req.body;
    let { password } = req.body;

    password = await bcrypt.hash(password, 10);

    const [id] = await connection('needers').insert({
      name,
      email,
      password,
      whatsapp,
      city,
      state
    })

    return res.json({ id });
  }
}