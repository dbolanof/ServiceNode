var fs = require("fs");
var path = require("path");
var RSVP = require("rsvp");


function generate(data) {
    // Here is a sample Fax Report
    /* globals Report, pipeStream, displayReport, faxImg */

    // Cache today's date

    var promise = new RSVP.Promise(function (resolve, reject) {





        var Report = require("fluentreports").Report;

        var Current_Date = new Date().toDateString();

        // Interesting Data Structure, but we can still use it.
        // This is your routine that gets run any time a header needs to be printed.
        var header = function (rpt, data) {
            rpt.setCurrentY(14);
            rpt.setCurrentY(rpt.getCurrentY() - 10);

            rpt.setCurrentY(50);
            rpt.print("CERTIFICADO PARA LA DECLARACION DE RENTA AÑO GRAVABLE", {
                align: "center"
            });
            rpt.print(data["#ENTIDAD#"], {
                align: "center"
            });
            rpt.print("NIT" + data["#NIT#"], {
                align: "center"
            });
            rpt.print("HACE CONSTAR QUE:", {
                align: "center"
            });
            rpt.newLine();

            rpt.print("Que el asociado(a) :  " + data["#NOMBREASOCIADO#"] + " con documento " + data["#CEDULA#"] +
                " presentaba al cierre de año " + data["#ANO#"] + "  la siguiente informacion:");

            rpt.newLine();
            rpt.print("Saldos a favor del asociado(a):");
            rpt.newLine()
            rpt.fontNormal();
            rpt.band([
                {
                    data: "APORTES",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#AP#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });
            rpt.band([
                {
                    data: "AHORROS",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#AD#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });

            rpt.band([
                {
                    data: "INTERESES POR PAGAR AHORROS",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#IAH#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });

            rpt.newLine();
            rpt.print("Saldos por cobrar al asociado(a):")
            rpt.newLine();
            rpt.band([
                {
                    data: "CREDITOS",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#CR#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });
            rpt.band([
                {
                    data: "INTERESES POR COBRAR CREDITOS",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#ICR#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });

            rpt.newLine();
            rpt.print("Movimiento anual:");
            rpt.newLine();
            rpt.band([
                {
                    data: "INTERESES CREDITOS DURANTE EL AÑO",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#ICRA#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });

            rpt.band([
                {
                    data: "INTERESES AHORROS DURANTE EL AÑO:",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#IHA#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });

            rpt.band([
                {
                    data: "RETENCION EN LA FUENTE",
                    width: 250,
                    align: 1
                },
                {
                    data: data["#REF#"],
                    width: 250,
                    align: 1
                }
            ], {
                border: 1,
                width: 0
            });
            rpt.newLine(2);

            rpt.print("LA  PORCION  NO  GRAVADA  DE  LOS  INTERESES PAGADOS  O  ABONADOS  AL  ASOCIADO" +
                "ES " + data["#IPNA#"] + " CORRESPONDE AL " + data["#IPNAPORCENTAJE#"] + "%");
            rpt.print("DECRETO 629  DE MARZO 26 DE 2014");

            rpt.newLine(5);
        };

        // And this is the function that runs anytime a footer needs to get run.
        var footer = function (rpt) {
            rpt.print(['This material is for the intended recipient.'], {
                fontBold: true,
                fontSize: 8,
                y: 740
            });
        };

        // Create a new Report Engine
        // pipeStream is predefined in this report to make it display in the browser
        var rpt = new Report(path.join(__dirname, "../../../temp/myreportRetencion.pdf"));

        // Configure the Defaults
        rpt
            .margins(40)
            .header(header)
            .data(data);

        // Run the Report
        // displayReport is predefined to make it display in the browser
        rpt.render(function (err, reportName) {
            if (err) return reject(err);
            var stream = fs.createReadStream(reportName);
            resolve(stream);
        });

    });


    return promise;
    // Run the Report
    // displayReport is predefined to make it display in the browser
}


module.exports = generate;
