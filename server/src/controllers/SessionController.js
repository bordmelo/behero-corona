const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
  async store(req, res){
    const { email, password } = req.body;

    const needer = await connection('needers')
      .where('email', email)
      .select('*')
      .first();

    if (!needer) {
      return res.status(400).json({
        error: 'No needer found with this e-mail.'
      });
    }

    const auth = await bcrypt.compare(password, needer.password);

    if (!auth) {
      return res.status(401).json({
        error: 'Credentials not valid.'
      })
    }

    return res.json(needer);
  }
}