const Spot = require('../models/Spot');

module.exports = {
  async show(req, res){
    const spot = await Spot.findById(req.params.id);

    return res.json(spot);
  }
}