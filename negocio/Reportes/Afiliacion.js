var fs = require("fs");
var path = require("path");
var RSVP = require("rsvp");

function generate(data) {
    // Here is a sample Fax Report
    /* globals Report, pipeStream, displayReport, faxImg */

    // Cache today's date
      var promise = new RSVP.Promise(function (resolve, reject) {
    var Report = require("fluentreports").Report;

    // This is your routine that gets run any time a header needs to be printed.
    var header = function (rpt, data) {
//          if (fs.existsSync("./imagen/LogoCpio.PNG")) {
//    imgLoc = "./imagen/LogoEntidad.PNG";
    rpt.image("./imagen/LogoEntidad.PNG");
//
//    } else {
//    rpt.print("No se pudo encontrar la imagen");
//}
//              
  rpt.newLine(2);
               
       // console.log(data["#FECHAACTUAL#"]);
        
           rpt.print("Fecha de expedición: " + data["#FECHAACTUAL#"]
                     , {
            align: "left"
            
        });
  
       rpt.newLine(4);
   
        rpt.print("LA COOPERATIVA DE AHORRO Y CRÉDITO PIO XII DE COCORNÁ LTDA", {
            align: "center"
        });
        rpt.print("CERTIFICA:", {
            align: "center"
       });        
        rpt.newLine(3);
 
        
        rpt.print("Que " + data["#NOMBRE#"] + ", identificado(a) con " + data["#TIPODOCUMENTO#"] + " número "+data["#CEDULA#"]+" de "+data["#CIUDAD#"]+", es Asociado (a) de la COOPERATIVA DE AHORRO Y CRÉDITO PIO XII DE COCORNÁ LTDA y se encuentra vinculado desde " + data["#FECHA#"] + ".",{
            align: "left"
           });
        
         rpt.newLine(4);
        rpt.print("Este certificado se expide por solicitud de el (la) interesado (a)",{
            align: "left"
        });

        rpt.newLine(7);
        
             rpt.print("________________________________________________");
             rpt.print("COOPERATIVA DE AHORRO Y CRÉDITO PIO XII DE COCORNÁ");
             rpt.print("OFICINA:" + data["#NOMREAGENCIA#"] );

        
           rpt.newLine(6);
    

             rpt.print("Dirección: " + data["direccion"] +"," + data["#NOMREAGENCIA#"],{
                 align: "center"
            });          
            rpt.print("PBX: " + data["telefono"] + " - Fax: 513 24 21",{
                 align: "center"
            });
             rpt.print("E-mail: " + data["email"] + " - Web: www.cooperativapioxii.com.co",{
                 align: "center"
            });         
 

    };

    // Create a new Report Engine
    // pipeStream is predefined in this report to make it display in the browser
    var rpt = new Report(path.join(__dirname, "../../../temp/myreportAfiliacion.pdf"));

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
}

module.exports = generate;