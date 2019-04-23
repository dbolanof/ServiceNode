var express = require('express');
var router = express.Router();
sql = require("../model/mssql.js"),
  config = require("../config.json"),
  /* GET users listing. */


  sql.connect()
    .then(function (model) {

      router.get('/', function (req, res, next) {
        res.send('respond with a resource');
      });

      router.get('/', function (req, res, next) {
        res.send('respond with a resource');
      });

      router.get("/nits",
        function (req, res) {
          // console.log(req.body);
          model
            .SP(req.body, "PA_nits")
            .then(function (recordsets) {
              // if (recordsets[0][0].CodigoError.replace(/ /g, "") == '000') {
              //   //  EnviarMsm(recordsets,AutLogin,res);
              // }
              res.json(recordsets);
            })
            .catch(function (err) {
              console.dir(err);
              config.env !== "pro" && res.send(err).end();
              var message = "\n\nBody\n\n" + JSON.stringify(req.body, null, 4) + "\n\nMessage Error\n\n" + JSON.stringify(err, null, 4);
              sql.log("Error", message);
            });
        });
    });


module.exports = router;
