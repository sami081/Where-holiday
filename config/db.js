const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS + "@cluster0.e1tyb.mongodb.net/Projet1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    }
  )
  .then(() => console.log("connect"))
  .catch((err) => console.log("no connect" ,err));
