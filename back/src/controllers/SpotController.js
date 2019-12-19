const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async index(req, res){
    const filters = {};

    if (req.query.name) {
      filters.title = new RegExp(req.query.name, "i");
    }

    const spots = await Spot.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ["salesman"],
      sort: "-createdAt"
    });

    return res.json(spots);
  },

  async store(req, res){
    //const { filename } = req.file;
    const { company, techs, price } = req.body;
    console.log(req);
    const spot = await Spot.create({
      user: req.userId,
      //thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price
    })

    return res.json(spot);
  }
}