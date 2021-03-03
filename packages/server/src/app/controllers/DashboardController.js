const Spot = require("../models/Spot");

module.exports = {

  async show(req, res){
    const { user_id } = req.headers;

    const spots = await Spot.find({ user: user_id });

    if(!spots || spots.length === 0){
      res.json({message: "Nenhum spot do usuario"});
    }

    return res.json(spots);
  }
}