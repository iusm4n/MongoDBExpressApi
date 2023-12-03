const express = require("express");
const moongose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");

moongose.connect("mongodb://localhost:27017/Users");

moongose.connection.once("open", () => {
  console.log("connected to database");
});

moongose.connection.on("error", (err) => {
  console.log("error", err);
});

const app = express();


app.use(bodyParser.json());



app.get("/", async (req, res) => {
  try {
    const Users = await User.find();
  res.json(Users);

  } catch (err) {
    console.log(err);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const User = await User.find({_id:id});
  res.json(User);

  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
    const User = new User({
        name: req.body.name,
        email:req.body.email,
        address: req.body.address,
    });
    try {
        await User.save();
        res.json(User);

    } catch (err) {
        res.json(err);
    }
    
});
app.put('/:id', async (req, res) => {
    try {
      const User = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(User);
    } catch (err) {
      res.send(err);
    }
  });
  
  app.delete('/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.send(err);
    }
  });

app.listen(3000, () => {
  console.log("server started at 3000 port");
});
