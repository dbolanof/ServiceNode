var sql = require('mssql');
var path = require("path");
var fs = require("fs");
var log = require("../negocio/Helpers/log.js");
var queryCorreo = "select rtrim(ltrim(servidorsaliente)) as servidorsaliente,rtrim(ltrim(puerto)) as puerto,rtrim(ltrim(usuario)) as usuario,rtrim(ltrim(CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),contrasena)))) as contrasena,rtrim(ltrim(ssl)) as ssl from CorreosalienteOpaMovil";
var config = require("../config.json");
//var Moment = require('moment-timezone');
//Moment.locale('es');
////var date = Moment('es').tz('America/Bogota').format();
//var date = new Date;
////a = 
//console.log(date);   



function connect() {
    var connection = new sql.Connection(config);
    return connection

        .connect()
        .then(function () {
            var request = new sql.Request(connection);

            request
                .query("Select TOP 1 'conectado...' as Fine")
                .then(log.bind(null, "Success"))
                .catch(log.bind(null, "Error"));

            return request
            
                .query(queryCorreo)
                .then(function (dataset) {

                    if (dataset[0]) {
                        config.emailConfig = {
                            host: dataset[0].servidorsaliente,
                            port: dataset[0].puerto,
                            secure: dataset[0].ssl === "SI",
                            user: dataset[0].usuario,
                            pass: dataset[0].contrasena

                        };
                    }

                    console.log(config.emailConfig);
                    return true;
                }).then(function () {

                    return {
                        SP: SP,
                        consulta: consulta
                    };
                });
        
            function SP(params, SPname) {

                var request = new sql.Request(connection);
                for (var i in params) {
                    request.input(i, params[i]);
                }
                return request.execute(SPname);
            }

            function consulta(params, SPname) {

                var request = new sql.Request(connection);
                for (var i in params) {
                    request.input(i, params[i]);
                }
                return request.query(SPname);
            }
        }).catch(log.bind(null, "Error"));


}

module.exports = {
    connect: connect,
    log: log
};