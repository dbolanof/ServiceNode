var thousandFormat = require("../Helpers/thousandFormat.js");
var fs = require("fs");
var path = require("path");
var RSVP = require("rsvp");
var dataset = require("../../../dataset")

function generate(dataR, dataRequest) {
    // Here is a sample Fax Report
    /* globals Report, pipeStream, displayReport, faxImg */
    // Cache today's date
    var promise = new RSVP.Promise(function (resolve, reject) {

        var Report = require("fluentreports").Report;

        // This is your routine that gets run any time a header needs to be printed.
        var header = function (rpt, data) {

            rpt.fontNormal();

            rpt.band([
                {
                    data: 'Línea: ',
                    width: 100
            },
                {
                    data: data.CodLinea,
                    width: 200,
                    align: "left"
            },
                {
                    data: 'Destino:',
                    width: 100
            },
                {
                    data: data.Coddestino,
                    width: 200,
                    align: "left"
            }
      ]);
           

            rpt.newLine();

            rpt.band([
                {
                    data: 'Capital: ',
                    width: 100
            },
                {
                    data: dataR[0].SOLICITADO,
                    width: 200,
                    align: "left"
            },
                {
                    data: 'Periodicidad: ',
                    width: 100
            },
                {
                    data: (dataR[0].PERIODICIDAD),
                    width: 200,
                    align: "left"
            },

      ]);
            
             rpt.newLine(); 
        rpt.band([
                {
                    data: 'Plazo: ',
                    width: 100
            },
                {
                    data: data.plazo,
                    width: 200,
                    align: "left"
            },
                       {
                    data: 'Tasa: ',
                    width: 100
            },
                {
                    data: data.TasaPeriodica,
                    width: 200,
                    align: "left"
            }
            ]);
            
               rpt.band([
                {
                    data: ('--------------------------------------------------------------------------------------------------------------------------------------'),
                    width: 2000
            },
             ]);
             rpt.newLine();

            console.log(dataR[0].Costo1)
            if (dataR[0].Costo1 !== "0"){ 
            
              rpt.band([
                {
                    data:  (dataR[0].NOMBRECOSTO1),
                    width: 150
            },
                {
                    data: (dataR[0].Costo1),
                    format: true,
                    width: 250,
                    align: "left"
            },    
                  
             ]);}
             if (dataR[0].Costo2 !== "0"){ 
            rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO2),
                    width: 150
            },
                {
                    data: (dataR[0].Costo2),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);}
            
             if (dataR[0].Costo3 !== "0"){ 
              rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO3),
                    width: 150
            },
                {
                    data: (dataR[0].Costo3),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);}
        
            if (dataR[0].Costo4 !== "0"){ 
                  rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO4),
                    width: 150
            },
                {
                    data: (dataR[0].Costo4),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);
            }
             if (dataR[0].Costo5 !== "0"){ 
                  rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO5),
                    width: 150
            },
                {
                    data: (dataR[0].Costo5),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);
            }
                 if (dataR[0].Costo6 !=="0"){ 
                  rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO6),
                    width: 150
            },
                {
                    data: (dataR[0].Costo6),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);
            }
                       if (dataR[0].Costo7 !== "0"){ 
                  rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO7),
                    width: 150
            },
                {
                    data: (dataR[0].Costo7),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);
            }
                if (dataR[0].Costo8 !== "0"){ 
                  rpt.band([
                {
                    data: (dataR[0].NOMBRECOSTO8),
                    width: 150
            },
                {
                    data: (dataR[0].Costo8),
                    format: true,
                    width: 250,
                    align: "left"
            },       
             ]);                    
            }
                   rpt.band([
                {
                    data: ('---------------------------------------------'),
                    width: 400
            },
                       ]);
            rpt.band([              {
                    data: 'Monto a financiar:',
                    width: 150
            },
                {
                    data: (dataR[0].TOTALCAPITAL),
                    format: true,
                    width: 250,
                    align: "left"
            },
                     ]);
            rpt.band([ 
                      {
                    data: 'Valor a entregar',
                    width: 150
            },
                {
                    data: (dataR[0].ENTREGADO),
                     format: true,
                    width: 250,
                    align: "left"
                }
             ]);
                   
                   
                    
                       
                        
            
            
            
            rpt.newLine();
            rpt.setCurrentY(rpt.getCurrentY() - 10);
            rpt.newLine();

            var dataReport = dataR;


            var propertyFilter = [{
                    prop: "NRO"
            }, {
                    prop: "FECHAPAGO",
            }, {
                    prop: "CUOTA",
                    format: true
            }, {
                    prop: "ABONOCAPITAL",
                    format: true
            }, {
                    prop: "ABONOINTERES",
                    format: true
            }, {
                    prop: "TOTALCAPITAL",
                    format: true
            }, {
                    prop: "TOTALINTERES",
                    format: true
            }

            ];
            
       var cabeceras = [
                {
                    data: '#',
                    width: 30
                  },
                {
                    data: 'Fecha Pago',
                    width: 80
                  },
                {
                    data: 'Cuota',
                    width: 80
                  },
                {
                    data: 'Abono Cap',
                    width: 80
                  },
                {
                    data: 'Abono Int',
                    width: 80
                  },
                {
                    data: 'Total Cap',
                    width: 80
                  },
                {
                    data: 'Total Int',
                    width: 80
                  },
            ];


            //cabeceras = cabeceras.concat(costosHeader);
            console.log(dataR[0].Costos.length);


            var totalCostos = [];
            rpt.fontBold();
            rpt.band(cabeceras, {
                border: 1,
                width: 0
            });

            rpt.fontNormal();

            var nro = 1;
            for (var i in dataR) {
                var output = [];
                for (var prop in propertyFilter) {
                    
                    output.push({
                        data: propertyFilter[prop].format ? thousandFormat(dataR[i][propertyFilter[prop].prop]) : dataR[i][propertyFilter[prop].prop],
                        width: prop == 0 ? 30 : 80,
                        align: "right",
                    });
                    
                }
                totalCostos.push(dataR[i].Costos);
             
                rpt.band(output, {
                    border: 1,
                    width: 0
                });
            
                nro++;
                if (nro === 63) {
                    rpt.newPage(false);
                    nro = 1;
                }

            }
          
            //Costos
           // rpt.newPage(false);
            rpt.newLine();
            rpt.print("Costos Adicionales", {
                align: "center"
            });
            
            
            
            rpt.newLine();
            var costosHeader = [{
                data: "#",
                with: 30,
                align: "left"
            }];
            rpt.fontBold();
            costosHeader = costosHeader.concat(addCostosHeader(dataR[0].Costos));

            rpt.band(costosHeader, {
                border: 1,
                width: 0
            });

            rpt.fontNormal();
            var nro = 0;
            for (var costosRow in totalCostos) {
                var amount = [{
                        data: String(costosRow),
                        width: 50,
                        align: "left"
                }];

                for (var col in totalCostos[costosRow]) {
                    amount.push({
                        data: thousandFormat(totalCostos[costosRow][col].Valor),
                        width: 130,
                        align: "right"
                    });
                }

                rpt.band(amount, {
                    border: 1,
                    width: 0
                });
            
                nro++;
             //   totalCostos.length
                if (nro === totalCostos.length) {
                   rpt.newPage(false);
                    nro = 1;
                }
            }
            
     rpt.newLine();
            rpt.print(" ", {
                align: "center"
            });
            
            
           
//             
//             rpt.newLine();
      
//            
//             rpt.print("Dirección: " + data["direccion"] +"," + data["#NOMREAGENCIA#"],{
//                 align: "center"
//            });          
//            rpt.print("PBX: " + data["telefono"] + " - Fax: 513 24 21",{
//                 align: "center"
//            });
//             rpt.print("E-mail: " + data["email"] + " - Web: www.cooperativapioxii.com.co",{
//                 align: "center"
//            });    
        };

        // Create a new Report Engine
        // pipeStream is predefined in this report to make it display in the browser
        var rpt = new Report(path.join(__dirname, "../../../temp/myreportSimuladorCredito.pdf"));
       

        // Configure the Defaults
        rpt
            .margins(40)
            .header(header)
            .data(JSON.parse(dataRequest.objeto));
        // cambios

        // Run the Report
        // displayReport is predefined to make it display in the browser
        rpt.render(function (err, reportName) {
            if (err) {
                console.log(err)
                return reject(err);
            }
            console.log("Done")
            var stream = fs.createReadStream(reportName);
            resolve(stream);
        });



    });


    return promise;
}


function addCostosHeader(costos) {

    return costos.reduce(function (array, next) {
        array.push({
            data: next.Nombre.trim(),
            width: 130
        });

        return array;
    }, []);
}




module.exports = generate;
