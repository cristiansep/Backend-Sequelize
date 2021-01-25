const nodeMailer = require('nodemailer');
const moment = require('moment');
require('moment/locale/es.js');

const sendEmail = (reserva, doctor, paciente, especialidad)  => {

    const {fecha, hora, status} = reserva;
    const {name} = especialidad


    const fechaMoment = moment(fecha).toDate();
    const horaMoment = moment(hora).toDate();

    const fechaFormat = moment(fechaMoment).format('LL');
    const horaFormat = moment(horaMoment).format('HH:mm');
   

    contentHtml =  // html 
    `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
            <title>ReservoSalud</title>
        </head>
        <body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                            style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td bgcolor="#2196f3" style="padding: 10px 30px 10px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 30px 10px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <h3 style="color: #2196f3; font-size: 24px;">ReservoSalud</h3>
                                            <td align="right" width="25%">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family:Times, serif,Arial, sans-serif; font-size: 24px;
                                            background-color: #2196f3; border-radius: 10px;text-align: center;padding: 5px; ">
                                                <span style="color: #fff;">Comprobante de Reserva</span>
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td style="color: #153643; font-family: Times, serif,Arial, sans-serif; font-size: 15px;
                                            text-align: center;padding: 5px; ">
                                                <p style="color:gray;">Estimado paciente, te recordamos que tienes la siguiente hora reservada:</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Estado:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 60px;">${status}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family: Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px;">
                                                <span style="color: #2196f3; font-size: 20px;">Paciente:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 50px;">${paciente.nombre} ${paciente.apellidoP}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Fecha cita:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 36px;">${fechaFormat}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Hora cita:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 45px;">${horaFormat}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Profesional:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 30px;">${doctor.nombre} ${doctor.apellidoP}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family: Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Especialidad:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 20px;">${name}</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Lugar:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 75px;">Centro Médico Osorno</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Direccion:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 45px;">Cristóbal Colón 781, Osorno, Los Lagos</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style=" font-family:  Times, serif,Arial, sans-serif; 
                                            border: 2px solid #2196f3; border-radius: 10px;padding: 5px; ">
                                                <span style="color: #2196f3; font-size: 20px;">Call Center:</span>
                                                <span style="color: gray; text-align: right; font-size: 20px; margin-left: 35px;">600 850 850</span>
                                            </td>
                                        
                                        </tr>
                                        <tr><td><br></td></tr>
                                        <tr>
                                            <td style="color: #153643; font-family:Times, serif,Arial, sans-serif; font-size: 15px;
                                            border-radius: 10px;text-align: center;padding: 5px; ">
                                                <span style="color: #fff; background-color: #2196f3; border-radius: 10px;text-align: center;padding: 5px; ">Mejor salud para osorno</span>
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td>
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td width="260" valign="top">

                                                        </td>
                                                        <td style="font-size: 0; line-height: 0;" width="20">
                                                            &nbsp;
                                                        </td>
                                                        <td width="260" valign="top">

                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f2f2f2" style="padding: 30px 30px 30px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td width="75%">
        
                                                <span style="color: #2196f3; font-size: 24px; text-decoration: underline;">www.reservosalud.cl</span>
                                                
                                            </td>
                                            <td align="right" width="25%">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                    
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                        <td>
                                            
                                                            <a href="http://www.facebook.com/">
                                                                <i class="fab fa-facebook" style="font-size:30px;color:#2196f3 ;"></i>
                    
                                                            </a>
                                            
                                                        </td>
                                            
                                                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                            
                                                        <td>
                                            
                                                            <a href="http://www.twitter.com/">
                                            
                                                    
                                                                <i class="fab fa-twitter" style="font-size:30px;color:#2196f3 ;"></i>
                                                            </a>
                                            
                                                        </td>
                                                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                        <td>
                                            
                                                            <a href="http://www.youtube.com/">
                                            
                                                                <i class="fab fa-youtube" style="font-size:30px;color:#2196f3 ;"></i>
                                                            </a>
                                            
                                                        </td>
                                            
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
       

     `;


    const transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: 'reservo.salud@gmail.com',
            pass: 'ReservoSalud'
          },
          tls: {
              rejectUnauthorized: false
          }
    });


    const mailOptions = {
        // from: `Portafolio web <${email}>`,
        from: 'ReservoSalud <noreply@reservosalud.com>',
        // to :'cristiansepulvedamendez@gmail.com',
        to :'rgodoy12@gmail.com',
        subject: 'Reserva de hora médica',
        html: contentHtml
        
    };


    transport.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err)
        
        } else {
            console.log(info)
        }
           
    });

};

module.exports = {
    sendEmail 
}