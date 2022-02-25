const GrowzConfig = require("../models/GrowzConfig");
const UserInput = require("../models/UserInput");

module.exports.home = (req, res) => {
  res.status(201).send("Your api is working, Happy hacking!");
};

module.exports.getBid = async (req, res) => {
  let results = await GrowzConfig.find({ id: req.params.id }).exec();
  if (!results || results.length == 0) {
    console.log("Error finding record");
    res.json({ msg: "error finding record", code: "errFinding" });
  } else {
    console.log(results);
    res.json({ msg: results, code: "ok" });
  }
};

module.exports.updateBid = async (req, res) => {
  console.log(">>>>>>", req.body);
  let updatedData = await GrowzConfig.findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        "config_type.update_bid_to": req.body.update_bid_to,
        "config_user_has_to_input.update_bid_to":
          req.body.config_user_has_to_input,
      },
    },
    { returnDocument: true }
  ).exec();

  if (!updatedData) {
    console.log("Not updated");
    res.json({ msg: "Cannot update! invalid ID", code: "invalidId" });
  } else {
    console.log("Data  xxx----------------->", updatedData);
    res.json({ msg: updatedData, code: "updated" });
  }
};
module.exports.createGrowz = async (req, res) => {
  console.log("Body,", req.body);
  GrowzConfig.findOne({ id: req.body.id }, async (err, fetchResults) => {
    if (err) {
      console.log("errors creating", err);
      res.status(201).send({ msg: "Error in finding", errors: err });
    }

    if (fetchResults != null || "") {
      res.status(201).send("Data Already present");
    } else {
      console.log("CreatingItem");
      let obj = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        config_user_has_to_input: {
          update_bid_to: req.body.user_update_bid_to,
        },
        config_type: { update_bid_to: req.body.update_bid_to },
      };
      GrowzConfig.create(obj, (err, item) => {
        if (err) {
          console.log(err);
          res.json({ msg: "Data Uploaded ERROR!", error: err });
        } else {
          res.status(201).json({ msg: "Data Uploaded", data: item });
        }
      });
    }
  });
};
module.exports.createUserInput = async (req, res) => {
  console.log("Body,", req.body);
  UserInput.findOne(
    { userId: req.body.userId },

    async (err, fetchResults) => {
      if (err) res.json({ msg: "Error finding results!", code: "noResults" });
      console.log("Exec---------->\n", fetchResults);
      if (fetchResults != null || "")
        res.json({ msg: "Data already present", code: "duplicate" });
      else {
        console.log("CreatingItem");
        let obj = {
          goalId: req.body.goalId,
          userId: req.body.userId,
          config_user_entered: { update_bid_to: req.body.update_bid_to },
        };
        UserInput.create(obj, (err, item) => {
          if (err) res.json({ msg: "Cant create!", code: "errorCreating" });
          else {
            res.json({ msg: "Data Uploaded", code: "uploaded" });
          }
        });
      }
    }
  );
};
