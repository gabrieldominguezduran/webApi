const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const AccessControl = require("accesscontrol");
let grants = {
  user: {
    clients: {
      "read:any": ["id"],
      "read:any": ["name"],
    },
  },
  admin: {
    clients: {
      "read:any": ["*"],
    },
  },
};

const ac = new AccessControl();
ac.setGrants(grants);
console.log(ac.getGrants());

const permissionAdmin = ac.can("admin").readAny("clients");
const permissionUser = ac.can("user").readAny("clients");

const url_clients = "http://www.mocky.io/v2/5808862710000087232b75ac";

let data = [];
fetch(url_clients)
  .then((response) => response.json())
  .then((responseJson) => {
    data = responseJson;
  })
  .catch((error) => {
    console.log(error);
  });

router.get("/", (req, res) => {
  res.status(200).json({
    clients: data.clients,
  });
});

router.get("/id", (req, res) => {
  if (permissionAdmin.granted || permissionUser.granted) {
    for (value of data.clients) {
      response = {
        id: value.id,
      };
      res.end(JSON.stringify(response));
      console.log(response);
    }
  }
});

router.get("/names", (req, res) => {
  if (permissionAdmin.granted || permissionUser) {
    for (value of data.clients) {
      response = {
        name: value.name,
      };
      res.end(JSON.stringify(response));
      console.log(response);
    }
  }
});

module.exports = router;
