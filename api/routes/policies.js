const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const AccessControl = require("accesscontrol");
let grants = {
  admin: {
    clients: {
      "read:any": ["*"],
    },
    policies: {
      "read:any": ["*"],
    },
  },
};

const ac = new AccessControl();
ac.setGrants(grants);
console.log(ac.getGrants());

const permissionAdmin = ac.can("admin").readAny("policies");

const url_policies = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

let data = [];
fetch(url_policies)
  .then((response) => response.json())
  .then((responseJson) => {
    data = responseJson;
  })
  .catch((error) => {
    console.log(error);
  });

router.get("/", (req, res) => {
  res.status(200).json({
    name: data,
  });
});
router.get("/clientId", (req, res) => {
  if (permissionAdmin.granted) {
    for (value of data.policies) {
      response = {
        clientId: value.clientId,
      };
      res.end(JSON.stringify(response));
      console.log(response);
    }
  }
});

router.get("/id", (req, res) => {
  if (permissionAdmin.granted) {
    for (value of data.policies) {
      response = {
        id: value.id,
      };
      res.end(JSON.stringify(response));
      console.log(response);
    }
  }
});

module.exports = router;
