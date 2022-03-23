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
  }).select("-password");
};

module.exports.modifyUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

try {
  await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        bio: req.body.bio,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err }));
} catch (err) {
  return res.status(500).json({ message: err });
}
};

module.exports.deleteUser = async (req, res) => {
  UserModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User delete!" }))
    .catch((error) => res.status(400).json({ error }));
};



