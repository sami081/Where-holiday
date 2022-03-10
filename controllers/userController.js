const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};
module.exports.getOneUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password, -_id");
};

module.exports.modifyUser = async (req, res) => {
  UserModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).send(req.body))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteUser = async (req, res) => {
  UserModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User delete!" }))
    .catch((error) => res.status(400).json({ error }));
};



