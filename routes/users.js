const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user.js");
const Resv = require("../models/reservation");
router.use(cors());

var jwtToken = process.env.SECRET_KEY || "random";

router.post("/register", (req, res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    secQues: req.body.secQues,
    secAns: req.body.secAns,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          let token = jwt.sign(payload, jwtToken, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          // Passwords don't match
          res.json("Password does not match");
        }
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/securityQues", (req, res) => {
  const secQues = req.body.secQues;
  const secAns = req.body.secAns;
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (secQues === user.secQues) {
          // Passwords match
          if (secAns === user.secAns) {
            res.json({ msg: "Proceed" });
          } else {
            res.send({ msg: "Security Answer does not Match" });
          }
        } else {
          // Passwords don't match
          res.send({ error: "Security Question does not match" });
        }
      } else {
        res.send({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/changePassword", async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  await User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        bcrypt.hash(newPassword, 10, async (err, hash) => {
          user.password = hash;
          await user
            .save()
            .then(() => res.json({ msg: "Password Changed Successfully" }))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      } else {
        res.json({ msg: "user does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/profile", async (req, res) => {
  const id = req.query.id;
  const user = await User.findById(id);
  await Resv.find()
    .then((resv) => {
      var result = resv.filter((res) => {
        return res.id === user._id.toString();
      });
      res.json(result);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/profile/:id/add", (req, res) => {
  const id = req.body.userid;
  const empID = req.body.empID;
  const empName = req.body.empName;
  const empSal = req.body.empSal;

  const newResv = new Resv({ id, empID, empName, empSal });

  newResv
    .save()
    .then(() => res.json("Resv Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/profile/:id", (req, res) => {
  Resv.findByIdAndDelete(req.params.id)
    .then(() => res.json("Resv Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Resv.findById(req.params.id)
    .then((resv) => res.json(resv))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/profile/update/:id", async (req, res) => {
  try {
    await Resv.findById(req.params.id)
      .then((resv) => {
        (resv.empName = req.body.empName), (resv.empSal = req.body.empSal);

        resv.empID = req.body.empID;

        resv
          .save()
          .then(() => res.json("Resv UpempIDd"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
