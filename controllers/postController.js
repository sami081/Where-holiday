const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");
const { uploadErrors } = require("../utils/errorsUtils");
const ObjectID = require("mongoose").Types.ObjectId;
const multer = require("multer");
const fs = require ('fs')


//stokage image
const Storage = multer.diskStorage({
  destination: "./client/public/uploads/imagesPost",

  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_');
 
    cb(null,  Date.now() + name);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

const upload2 = multer ({
  storage: Storage,
}).single('testImage2')

module.exports.readPostAll = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :" + err);
  }).sort({ createdAt: -1 });
};
module.exports.readPostOne = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password, -_id");
};

module.exports.createPost = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newPost = new PostModel({
        posterId: req.body.posterId,
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
        images: ` ${req.file.filename}`
      });
      newPost
        .save()
        .then(() => res.send(newPost))
        .catch((err) => console.log(err));
    }
  });
  // const { posterId, title, description, city, country } = req.body;

  // try {
  //   const post = await PostModel.create({
  //     posterId,
  //     title,
  //     description,
  //     city,
  //     country,
  //   });
  //   return res.status(201).json(post);
  // } catch (err) {
  //   return res.status(400).send(err);
  // }
};

module.exports.modifyPost = async (req, res) => {
  upload2(req, res,(err) => {
    if (err) {
      console.log(err);
    } else{
      const postObject = req.file ? 
      {
        // ...JSON.parse(req.body),
        images : `${req.protocol}://${req.get('host')}./client/public/uploads/imagesPost ${req.file.filename}`
      } : {...req.body};
       PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id },
      
     
    )
      .then(() => res.status(200).send(req.body))
      .catch((error) => res.status(400).json({ error }))}
   
  })}
 

module.exports.modifyComment = (req, res) => {
  PostModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )

    .then(() => res.status(200).send(req.body))
    .catch((error) => res.status(400).json({ error }));
};
module.exports.deletePost = async (req, res) => {
PostModel.findOne({_id: req.params.id})
.then (post => {
  const filename = post.images.split('./client/public/uploads/imagesPost')[0];
  console.log(filename);
  fs.unlink(`./client/public/uploads/imagesPost/${filename}`, () => {
    PostModel.deleteOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then(() => res.status(200).send("post deleted"))
      .catch((error) => res.status(400).json({ error })); 
  });
  
})
.catch(error => res.status(400).json({error}))
};

module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
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
    await PostModel.findbyIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
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

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
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
        if (!err) return res.send(docs.comments).exec();
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return PostModel.findByIdAndUpdate(
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
