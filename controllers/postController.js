const postModel = require("../models/postModel");
const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPostAll = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :" + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  const { posterId, title, description, city, country } = req.body;

  try {
    const post = await PostModel.create({
      posterId,
      title,
      description,
      city,
      country,
    });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.modifyPost = async (req, res) => {
  PostModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  ) 
    .then(() => res.status(200).send(req.body))
    .catch((error) => res.status(400).json({ error }));
};
module.exports.modifyComment = (req, res) => {
  PostModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id },
   
  )
  
    .then(() => res.status(200).send(req.body))
    .catch((error) => res.status(400).json({ error }));
};
module.exports.deletePost = async (req, res) => {
  PostModel.deleteOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).send("post deleted"))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findOneAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(400).send(err);
      }
    );
    await UserModel.findOneAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findOneAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(400).send(err);
      }
    );
    await UserModel.findOneAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findOneAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs).exec();
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// module.exports.editCommentPost = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//     return PostModel.findOne(req.params.id, (err, docs) => {
//       const theComment = docs.comments.find((comment) =>
//         comment._id.equals(req.body.commentId)
//       );

//       if (!theComment) return res.status(404).send("Comment not found");
//       theComment.text = req.body.text;

//       return docs.save((err) => {
//         if (!err) return res.status(200).send(docs);
//         return res.status(500).send(err);
//       });
//     });
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return PostModel.findByIdAndDelete(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}; 
