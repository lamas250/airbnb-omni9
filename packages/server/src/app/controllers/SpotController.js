const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res){
    const {tech} = req.query;

    const spots = await Spot.find({ techs: tech });
    
    if(!spots || spots.length === 0){
      return res.json({message: "Nenhum spot encontrado"});
    }

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id); 
    if(!user){
      return res.status(400).json({error: "User does not exists"});
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(techs => techs.trim()),
      price
    })

    return res.json(spot);
  }
}