var fs = require("fs");
var path = require("path");
var RSVP = require("rsvp");


function generate(data,dataR) {
    // Here is a sample Fax Report
    /* globals Report, pipeStream, displayReport, faxImg */

    // Cache today's date
    
      var promise = new RSVP.Promise(function (resolve, reject) {

        var Report = require("fluentreports").Report;

        var Current_Date = new Date().toDateString();

        // Interesting Data Structure, but we can still use it.
        // This is your routine that gets run any time a header needs to be printed.
        var header = function (rpt, data) {
//                    if (fs.existsSync("./imagen/LogoCpio.PNG")) {
    rpt.image("./imagen/LogoEntidad.PNG");
//} else {
//    rpt.print("No se pudo encontrar la imagen");
//}
  rpt.newLine(2);
 
            rpt.print("Fecha de expedición: " +dataR["fechatrabajo"] 
                     , {
            align: "left"
            
        });
  
  rpt.newLine(3);
            
     
        rpt.print("COOPERATIVA DE AHORRO Y CRÉDITO PIO XII DE COCORNÁ LTDA", {
            align: "center"
        });
        rpt.print("NIT:" +dataR["nit"], {
            align: "center"
       });        
        rpt.newLine(1);
            
        rpt.print("CERTIFICADO ANUAL DE RETENCION EN LA FUENTE E INFORMACION ADICIONAL", {
            align: "center"
       });    
             rpt.newLine(1);
            
              rpt.print("Nombre: " + data["nombre"], {
            align: "left"
       }); 
               rpt.print("Numero de documento: " + data["cedulasociado"], {
            align: "left"
       });    
               rpt.print("Agencia: " +data["nombreagencia"]+". " + data["diragencia"], {
            align: "left"
       });    
               rpt.print("Año gravable: " +dataR["año"], {
            align: "left"
       });    
            rpt.newLine(2);
            
            rpt.band([     
                          {
                    data: 'Producto: ',
                    width: 400
            },
                {
                    data: "Ahorros",
                    width: 200,
                    align: "left"
            },      
        
        ]);
        
         rpt.band([     
                          {
                    data: 'Ahorros a la vista',
                    width: 410
            },
                {
                    data: data.saldo_av,
                    width: 80,
                    align: "right"
            },      
        
        ]);
                  rpt.band([     
                          {
                    data: 'Ahorros permanente',
                    width: 410
            },
                {
                    data: data.saldo_ap,
                    width: 80,
                    align: "right"
            },      
        
        ]);  
            
         rpt.band([     
                          {
                    data: 'Ahorros contractual',
                    width: 410
            },
                {
                    data: data.saldo_ac,
                    width: 80,
                    align: "right"
            },      
        
        ]);  
                 rpt.band([     
                          {
                    data: 'CDAT',
                    width: 410
            },
                {
                    data: data.saldo_at,
                    width: 80,
                    align: "right"
            },      
        
        ]);  
                             rpt.band([     
                          {
                    data: 'Saldo a Diciembre 31',
                    width: 410
            },
                {
                    data: data.saldo_31_ahorros,
                    width: 80,
                    align: "right"
            },      
        
        ]);  
          
               rpt.newLine(1);
             
             rpt.band([     
                          {
                    data: 'Producto:',
                    width: 400
            },
                {
                    data: "Aportes",
                    width: 200,
                    align: "left"
            },
        
        
        ]);
        rpt.band([     
                          {
                    data: 'Saldo a Diciembre 31',
                    width: 410
            },
                {
                    data: data.saldo_po,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
            
                  rpt.band([     
                          {
                    data: 'Revalorización',
                    width: 410
            },
                {
                    data: data.saldo_rev,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
   

        rpt.newLine(1);
             
                   rpt.band([     
                          {
                    data: 'Producto: ',
                    width: 400
            },
                {
                    data: "Cartera",
                    width: 200,
                    align: "left"
            },      
        
        ]);
            
         rpt.band([     
                          {
                    data: 'Saldo de crédito',
                    width: 410
            },
                {
                    data: data.saldo_cr,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
            
                rpt.band([     
                          {
                    data: 'Intereses pagados por vivienda ',
                    width: 410
            },
                {
                    data: data.interes_viv,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
                       rpt.band([     
                          {
                    data: 'Intereses pagados por otros créditos',
                    width: 410
            },
                {
                    data: data.interes_cr,
                    width: 80,
                    align: "right"
            },      
      
        ]);  


  
            
             rpt.newLine(1);
            
            
            rpt.band([     
                          {
                    data: 'Intereses pagados o abonados en cuenta:',
                    width: 410
            },
                {
                    data: data.interes_ah,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
            
                     rpt.band([     
                          {
                    data: 'Base retención:',
                    width: 410
            },
                {
                    data: data.base,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
                 rpt.band([     
                          {
                    data: 'Retención en la fuente:',
                    width: 410
            },
                {
                    data: data.retencion,
                    width: 80,
                    align: "right"
            },      
      
        ]); 
       
       
            rpt.newLine(1);
            
                                 rpt.band([     
                          {
                    data: 'Componente inflacionario de los rendimientos financieros',
                    width: 410
            },
                {
                    data: data.componente,
                    width: 80,
                    align: "right"
            },      
      
        ]); 
                                      rpt.band([     
                          {
                    data: 'Ingreso no constitutivo de la renta ni ganancia ocasional',
                    width: 410
            },
                {
                    data: data.ingreso,
                    width: 80,
                    align: "right"
            },      
      
        ]); 
               rpt.newPage(false);
            
                                if (fs.existsSync("./imagen/LogoCpio.PNG")) {
    imgLoc = "./imagen/LogoCpio.PNG";
    rpt.image(imgLoc);
} else {
    rpt.print("No se pudo encontrar la imagen");
}
            rpt.newLine(1);
            
        rpt.band([     
                          {
                    data: 'Base GMF:',
                    width: 410
            },
                {
                    data: data.base_gmf,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
                    rpt.band([     
                          {
                    data: 'Valor GMF:',
                    width: 410
            },
                {
                    data: data.gmf_aso,
                    width: 80,
                    align: "right"
            },      
      
        ]);  
            
            rpt.newLine(3);
            
           rpt.print("Recibe _____________________________________");
           rpt.print("Nombre y apellido: " +data["nombre"]);
           rpt.print("Identificación: "+data["cedulasociado"]);
         
            rpt.newLine(5);
        
            rpt.print("Este certificado no requiere firma autógrafa por expedirse por medio de computador ",{
                 align: "center"
            });          
            rpt.print("según el artículo 10 del decreto 836 de 1991. ",{
                 align: "center"
            });
            
            
             rpt.newLine(21);
        
            rpt.print("Dirección: " + dataR["direccion"] +"," + data["nombreagencia"],{
                 align: "center"
            });          
            rpt.print("PBX: " + dataR["telefono"] + " - Fax: 513 24 21",{
                 align: "center"
            });
             rpt.print("E-mail: " + dataR["email"] + " - Web: www.cooperativapioxii.com.co",{
                 align: "center"
            });          
 
 
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
            .margins(55)
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
