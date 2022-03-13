const UserModel = require("../models/userModel");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errorsUtils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    // if (
    //   req.file.detectedMimeType != "image/jpg" &&
    //   req.file.detectedMimeType != "image/jpeg" &&
    //   req.file.detectedMimeType != "image/png"
    // )
    //   throw Error("invalid file");

      if(req.file.size > 500000) throw Error("max size")
  } catch (err){
    const errors = uploadErrors(err)
     return res.status(201).json({ errors })};

  const fileName = req.body.name + ".jpg";

  await pipeline (
    req.file.stream,
    fs.writeStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  )
};
