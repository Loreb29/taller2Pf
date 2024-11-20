const rol = "";

async function llaveres(resultado){
  
  try{
    const transformado = JSON.parse(resultado)
    console.log(transformado.Rol)
    console.log(transformado.publickey)
    const admin = String(transformado.Rol)
    const publickey = String(transformado.publickey)
    const random = Math.random().toString(36).substring(2,12)  
    const certificadoB64 = prompt("Ingresa el certificado con el mensaje " + random);
    try{
      if( await verificarCertificado(publickey,certificadoB64,random)){  
        console.log("entraste")        
        document.getElementById("body-show").style.setProperty("display","block");
          if(admin=="0"){
          rol= "adm"
          document.getElementById("est-ad1").style.setProperty("display","none");
          document.getElementById("est-ad2").style.setProperty("display","none");
          document.getElementById("est-ad3").style.setProperty("display","none");
          document.getElementById("prof-ad1").style.setProperty("display","none");
          document.getElementById("prof-ad2").style.setProperty("display","none");
          document.getElementById("prof-ad3").style.setProperty("display","none");
          document.getElementById("curs-ad1").style.setProperty("display","none");
          document.getElementById("curs-ad2").style.setProperty("display","none");
          document.getElementById("curs-ad3").style.setProperty("display","none");
          document.getElementById("cursest-ad1").style.setProperty("display","none");
          document.getElementById("cursest-ad2").style.setProperty("display","none");
          document.getElementById("cursest-ad3").style.setProperty("display","none");
          }else{
            rol = "est"
          } 
          
        }else{
          console.log("adios")
          //document.getElementById("body-show").style.setProperty("display","none");
          alert("Credenciales incorrectas")
        }  } catch(err){
          console.log(err);
          //document.getElementById("body-show").style.setProperty("display","none");
          alert("Ha ocurrido un error: ")
        }


  }catch {
    alert("Usuario incorrecto")
  }

  

}

//Encriptar

function doubleEncryptData(data) {
  //llave pública en texto
  key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwfBzBQAEE/N3IAZYGHoFEwEcwlYCcb7xgIGIonuSi/RdXP4rnpVQmClO0QbyhKbvzg2EznyUn/2HcB17uzbNO0XlUrpPC6NEGxQvnRKH5AMbKdHZ60mhOTO3jsipH4BdWHCuKhQm2WpAjX4hp35dyJyyU1bCrgqzlD0nf7FyxAFK9+YJ9xLLUOcwswbVhRI6ztgSVz6X3h7XRHWqmjcRR1zjDfi9jXboEszlq6Aj66p9AI9RSeL5naWVKlBL3cIC86MIDGTf2FjP5OJ6ltaEk66tN0+D3Ihd1iyTXqkyfl8SsQgXB1myRmAlIMtPs1vxo8b/6+lG/P4FdvfQIxE49QIDAQAB"
  //encriptamos un mensaje
  data = stringToArrayBuffer(data);
  //importamos la llave pública
  return importPublic(key,"RSA-OAEP","encrypt",2048).then(function(Ikey){
  
    return crypto.subtle.encrypt(
      {name: "RSA-OAEP",},
      Ikey, 
      data 
      ).then(function(secret){
        //descomponemos y sumamos rol
        secret = arrayBufferToString(secret);
        secret = secret + rol
        //segunda llave
        let keyTwo = "7jHuxxFW66rpq1KSYMtpHm1zIQRjbRxGu0FakFUK9Ww="
          //importamos llave de encriptación y desencriptación
        return importKeyFromString(keyTwo).then(function(Tkey){
          secret = stringToArrayBuffer(secret)
          //Utilizamos el counter en string y lo transformamos
          num = stringToArrayBuffer("«÷Â��¤�ûtó��éjßê")  
          //encripamos por segunda vez
          return crypto.subtle.encrypt(
          {name: "AES-CTR",
          counter: num,
          length: 64,},
          Tkey, 
          secret 
          ).then(function(message){
            const mensaje = arrayBufferToString(message)
            return message
          })
        }) 
      })
    }
  )
}


function importPublic(pem,algoritmo,funcion,num) {
  const binaryDerString = window.atob(pem);
  const binaryDer = str2ab(binaryDerString);
  const publi = window.crypto.subtle.importKey(
    "spki",
    binaryDer,
      
    {
      name: "RSA-OAEP",
      modulusLength: num,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {name: "SHA-256"}
    },
    true,
    [funcion],
    );
    return publi;
}

function importKeyFromString(base64Key) {
  const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
  const cryptoKey = crypto.subtle.importKey(
      "raw",                
      rawKey.buffer,       
      { name: "AES-CTR" },  
      true,                 
      ["encrypt", "decrypt"] 
  );
  return cryptoKey;
}



function stringToArrayBuffer(str){
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function arrayBufferToString(str){
    var byteArray = new Uint8Array(str);
    var byteString = '';
    for(var i=0; i < byteArray.byteLength; i++) {
        byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}


function encryptDataWithPublicKey(data) {
  key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA40koIpvIiRar5eEHZAY79AMRw2BwT469knZS4Tq7s8YpcdwBh1k+VkYYdItQoId5DwPjIt8NxvJrM6XrP/D3siGz7FAkIzq+eviDBu5giGMM5wlJSG4sWoXP62njYWrLH3g72yAv1n93iuazboqhQXvtn3zCeoGJbA0UtS0+Via+bPQ+hNiED8x49jslJEKNjfjHGn4IacQQluBEX+qil3+DhuJj/wqrwQ59KCy8EIsYuIttS6vqdhJa1ozFLQBeXaIDSSRBpx6jxRbxMWi2g4+h/LqGc4YX8fkPJP3y6YrDZY04tNh4imPuXDVp014Wxn+RSJePCur536eysVCSCQIDAQAB"
  return importPublicKey(key,"RSA-OAEP","encrypt").then(function(Ikey){

    data = stringToArrayBuffer(data);
  return crypto.subtle.encrypt(
  {
      name: "RSA-OAEP",
      //label: Uint8Array([...]) //optional
  },
  Ikey, //from generateKey or importKey above
  data //ArrayBuffer of data you want to encrypt
).then(function(secret){
  
  keyTwo = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1lu/iToe141j/dZ9Dukc+Ss7Hr3XtnsDIZsq24PQoc7LGDmy+H5zDfzXCGG7FOl3wxu/flLrBGh+Csz6ITJtNI121AAqUsOYJvnE/OpaN93KGF4LkgpVmUPDGLxCo5tP9Z7bPVqMv7QkqCoh5a85OZEC0lcDsH1r7ilyk0DrzUvH6kNpFrALWF5sT540DUqbHjOZ1QsP5qTnTdOxeyJfB7z4nWGJS/qGceCGDDjt0r68HwM4t0Edhi9fi6jMikklp8fk9rcj5EjjUqNDRGLbqYPlfJIqat5myv8BfoTQwlH0ZxNDzFhWLplFfS8lv9AFcwx42lL44bk6LV3pwAygDwIDAQAB"
  console.log(secret)
  return crypto.subtle.encrypt(
    {
        name: "RSA-OAEP",
        //label: Uint8Array([...]) //optional
    },
    keyTwo, //from generateKey or importKey above
    secret //ArrayBuffer of data you want to encrypt
  )
})

  }
)
  
;
}


function decryptDataWithPrivateKey(data, key) {
  data = stringToArrayBuffer(data);
  return crypto.subtle.decrypt(
      {
          name: "RSA-OAEP",
          //label: Uint8Array([...]) //optional
      },
      key, //from generateKey or importKey above
      data //ArrayBuffer of data you want to encrypt
  );
}



//Fin de encriptar




async function main(){
  console.log("esconde")
  //document.getElementById("body-show").style.setProperty("display","none");
  console.log("esconde")
  const user = prompt("Ingresa el nombre de usuario");
  

  const raw = user;

  const requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://localhost:8888/.netlify/functions/keys", requestOptions)
  .then((response) => response.text())
  .then((result) =>
    llaveres(result))
  .catch((error) =>
      console.error(error));


  


  
}

//Parte de autentificación

async function verificarCertificado(llavepublicaB64,certificadoB64, random) {
  

  const llavepublica = await importPublicKey(llavepublicaB64,"Ed25519","verify");
  const firma = importFirma(certificadoB64);

  //verifica el certificado
  return verificar(llavepublica,firma,random);


}

async function importPublicKey(pem,algoritmo,funcion) {
      // base64 decode the string to get the binary data
      const binaryDerString = window.atob(pem);
      // convert from a binary string to an ArrayBuffer
      const binaryDer = str2ab(binaryDerString);


      const publi = await window.crypto.subtle.importKey(
          "spki",
          binaryDer,
          
          {
          name: algoritmo,
          },
      true,
      [funcion],
      );
      
      return publi;
  }

  function importFirma(pem){
      // base64 decode the string to get the binary data
      const binaryDerString = window.atob(pem);
      // convert from a binary string to an ArrayBuffer
      return binaryDer = str2ab(binaryDerString);
  }

  async function verificar(publicKey,signature,random) {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(random)


      return verifyResult = await crypto.subtle.verify(
      {
       name: "Ed25519",
      },
      publicKey,
      signature,
      encodedData,
      );

  }

  function str2ab(str) {
      const buf = new ArrayBuffer(str.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
      }
      return buf;
  }

  function ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  //Final de autentificación




function guardarest(){
    let nota=0.0;
    let apellidos='';

    let datoingresado = document.getElementById("correo").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();

    let raw = JSON.stringify({
      dni: document.getElementById("dni").value,
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      email: document.getElementById("correo").value
    });
    console.log(raw);

      
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: encryptDataWithPublicKey(raw),
      redirect: "follow"
    };
    
    fetch("http://localhost:8888/.netlify/functions/estudiantes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    
}
//eje
function cargar(resultado){
    let transformado = JSON.parse(resultado);
    var salida="";
    var elemento="";

    for (let vc in transformado){
        elemento = "ID: " + transformado[vc].id;
        elemento = elemento + "<br>Documento de identidad: " + transformado[vc].dni;
        elemento = elemento + "<br>Nombres: " + transformado[vc].nombre;
        elemento = elemento + "<br>Apellidos: " + transformado[vc].apellidos;
        elemento = elemento + "<br>Correo electrónico: " + transformado[vc].email;
        salida = salida  + elemento + "<br><br>";
    }
    document.getElementById("rta").innerHTML = salida;
}

function listarest(){
    let raw = "h"
    event.preventDefault();
    encryptDataWithPublicKey(raw).then(function(raw){
      console.log(raw)
    console.log("clave")
    const requestOptions = {
      
      method: "GET",
      redirect: "follow"
    };
    fetch("http://localhost:8888/.netlify/functions/estudiantes", requestOptions)
      .then((response) =>
        response.text())
      .then((result) =>
        cargar(result))
      .catch((error) =>
        console.error(error));
    })
    

}

function respuesta_actualizar(resultado){
    document.getElementById("rtaA").innerHTML = resultado;
}

function actualizarest(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();

    let raw = JSON.stringify({
      dni: document.getElementById("dniA").value,
      nombre: document.getElementById("nombreA").value,
      apellidos: document.getElementById("apellidosA").value,
      email: document.getElementById("correoA").value
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    let elid=document.getElementById("idA").value;
    fetch("http://localhost:8888/.netlify/functions/estudiantes/"+elid, requestOptions)
      .then((response) =>
            response.text())
      .then((result) =>
            respuesta_actualizar(result))
      .catch((error) =>
            console.error(error));
}

function cargarLE(resultado){
    let transformado = JSON.parse(resultado);
    var salida="";
    var elemento="";
    elemento = "ID: " + transformado.id;
    elemento = elemento + "<br>Documento de identidad: " + transformado.dni;
    elemento = elemento + "<br>Nombres: " + transformado.nombre;
    elemento = elemento + "<br>Apellidos: " + transformado.apellidos;
    elemento = elemento + "<br>Correo electrónico: " + transformado.email;
    salida = salida  + elemento + "<br><br>";
    document.getElementById("rtaLE").innerHTML = salida;
}

function listar_estudiante(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();
    console.log("UNO")
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    let elid=document.getElementById("idLE").value;
    fetch("http://localhost:8888/.netlify/functions/estudiantes/"+elid, requestOptions)
      .then((response) =>
        response.text())
      .then((result) =>
        cargarLE(result))
      .catch((error) =>
        console.error(error));
}

function cargarEE(resultado){
    let transformado = JSON.parse(resultado);
    document.getElementById("rtaEE").innerHTML = transformado.respuesta;
}

function eliminar_estudiante(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    let elid=document.getElementById("idEE").value;
    console.log(elid)
    fetch("http://localhost:8888/.netlify/functions/estudiantes/"+elid, requestOptions)
      .then((response) =>
        response.text())
      .then((result) =>
        cargarEE(result))
      .catch((error) =>
        console.error(error));
}


function guardarprof(){
  let nota=0.0;
  let apellidos='';

  let datoingresado = document.getElementById("correoprof").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    dni: document.getElementById("dniprof").value,
    nombre: document.getElementById("nombreprof").value,
    apellidos: document.getElementById("apellidosprof").value,
    profesion: document.getElementById("profesion").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("correoprof").value
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8888/.netlify/functions/profesores", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
//eje
function cargarprof(resultado){
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";

  for (let vc in transformado){
      elemento = "ID: " + transformado[vc].id;
      elemento = elemento + "<br>Documento de identidad: " + transformado[vc].dni;
      elemento = elemento + "<br>Nombres: " + transformado[vc].nombre;
      elemento = elemento + "<br>Apellidos: " + transformado[vc].apellidos;
      elemento = elemento + "<br>Profesion: " + transformado[vc].profesion;
      elemento = elemento + "<br>Telefono: " + transformado[vc].telefono;
      elemento = elemento + "<br>Correo electrónico: " + transformado[vc].email;
      salida = salida  + elemento + "<br><br>";
  }
  document.getElementById("rtaprof").innerHTML = salida;
}

function listarprof(){
  event.preventDefault();
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://localhost:8888/.netlify/functions/profesores", requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarprof(result))
    .catch((error) =>
      console.error(error));

}

function respuesta_actualizarprof(resultado){
  document.getElementById("rtaAprof").innerHTML = resultado;
}

function actualizarprof(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    dni: document.getElementById("dniAprof").value,
    nombre: document.getElementById("nombreAprof").value,
    apellidos: document.getElementById("apellidosAprof").value,
    profesion: document.getElementById("profesionA").value,
    telefono: document.getElementById("telefonoA").value,
    email: document.getElementById("correoAprof").value
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  let elid=document.getElementById("idAprof").value;
  fetch("http://localhost:8888/.netlify/functions/profesores/"+elid, requestOptions)
    .then((response) =>
          response.text())
    .then((result) =>
          respuesta_actualizarprof(result))
    .catch((error) =>
          console.error(error));
}

function cargarLEprof(resultado){
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";
  elemento = "ID: " + transformado.id;
  elemento = elemento + "<br>Documento de identidad: " + transformado.dni;
  elemento = elemento + "<br>Nombres: " + transformado.nombre;
  elemento = elemento + "<br>Apellidos: " + transformado.apellidos;
  elemento = elemento + "<br>Profesion: " + transformado.profesion;
  elemento = elemento + "<br>Telefono: " + transformado.telefono;
  elemento = elemento + "<br>Correo electrónico: " + transformado.email;
  salida = salida  + elemento + "<br><br>";
  document.getElementById("rtaLEprof").innerHTML = salida;
}

function listar_profesor(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idLEprof").value;
  fetch("http://localhost:8888/.netlify/functions/profesores/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarLEprof(result))
    .catch((error) =>
      console.error(error));
}

function cargarEEprof(resultado){
  let transformado = JSON.parse(resultado);
  document.getElementById("rtaEEprof").innerHTML = transformado.respuesta;
}

function eliminar_profesor(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idEEprof").value;
  fetch("http://localhost:8888/.netlify/functions/profesores/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarEEprof(result))
    .catch((error) =>
      console.error(error));
}











function guardarcurs(){
  let nota=0.0;
  let apellidos='';

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    nombre: document.getElementById("nombrecurs").value,
    descripcion: document.getElementById("descripcion").value,
    profesores_id: document.getElementById("idprof").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8888/.netlify/functions/cursos", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
//eje
function cargarcurs(resultado){
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";

  for (let vc in transformado){
      elemento = "ID: " + transformado[vc].id;
      elemento = elemento + "<br>Nombre: " + transformado[vc].nombre;
      elemento = elemento + "<br>Descripcion: " + transformado[vc].descripcion;
      elemento = elemento + "<br>ID profesor: " + transformado[vc].profesores_id;
      salida = salida  + elemento + "<br><br>";
  }
  document.getElementById("rtacurs").innerHTML = salida;
}

function listarcurs(){
  event.preventDefault();
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://localhost:8888/.netlify/functions/cursos", requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarcurs(result))
    .catch((error) =>
      console.error(error));

}

function respuesta_actualizarcurs(resultado){
  document.getElementById("rtaAcurs").innerHTML = resultado;
}

function actualizarcurs(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    nombre: document.getElementById("nombreAcurs").value,
    descripcion: document.getElementById("descripcionCurs").value,
    profesores_id: document.getElementById("idprofA").value,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  let elid=document.getElementById("idAcurs").value;
  fetch("http://localhost:8888/.netlify/functions/cursos/"+elid, requestOptions)
    .then((response) =>
          response.text())
    .then((result) =>
          respuesta_actualizarcurs(result))
    .catch((error) =>
          console.error(error));
}

function cargarLEcurs(resultado){
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";
  elemento = "ID: " + transformado.id;
  elemento = elemento + "<br>Nombre: " + transformado.nombre;
  elemento = elemento + "<br>Descripcion: " + transformado.descripcion;
  elemento = elemento + "<br>ID profesor: " + transformado.profesores_id;
  salida = salida  + elemento + "<br><br>";
  document.getElementById("rtaLEcurs").innerHTML = salida;
}

function listar_curso(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idLEcurs").value;
  fetch("http://localhost:8888/.netlify/functions/cursos/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarLEcurs(result))
    .catch((error) =>
      console.error(error));
}

function cargarEEcurs(resultado){
  let transformado = JSON.parse(resultado);
  document.getElementById("rtaEEcurs").innerHTML = transformado.respuesta;
}

function eliminar_curso(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idEEcurs").value;
  fetch("http://localhost:8888/.netlify/functions/cursos/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarEEcurs(result))
    .catch((error) =>
      console.error(error));
}




function guardarestincurs(){
  let nota=0.0;
  let apellidos='';

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    curso_id: document.getElementById("idcursAA").value,
    estudiante_id: document.getElementById("IDestAA").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8888/.netlify/functions/cursos/registraEstudiante", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function cargarestcurs(resultado){
  console.log(resultado)
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";

  for (let vc in transformado){
      elemento = elemento + "<br>ID curso: " + transformado[vc].curso_id;
      elemento = elemento + "<br>ID estudiante: " + transformado[vc].estudiante_id;
      salida = salida  + elemento + "<br><br>";
  }
  document.getElementById("rtaestcurs").innerHTML = salida;
}

function listarestcurs(){
  event.preventDefault();
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://localhost:8888/.netlify/functions/cursos/registraEstudiante", requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarestcurs(result))
    .catch((error) =>
      console.error(error));

}

function respuesta_actualizarestcurs(resultado){
  document.getElementById("rtaAestcurs").innerHTML = resultado;
}

function actualizarestcurs(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    estudiante_id: document.getElementById("nombreAestcurs").value,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  let elid=document.getElementById("idAestcurs").value;
  fetch("http://localhost:8888/.netlify/functions/cursos/registraEstudiante/"+elid, requestOptions)
    .then((response) =>
          response.text())
    .then((result) =>
          respuesta_actualizarestcurs(result))
    .catch((error) =>
          console.error(error));
}

function cargarLEestcurs(resultado){
  let transformado = JSON.parse(resultado);
  var salida="";
  var elemento="";
  elemento = "ID curso: " + transformado.curso_id;
  elemento = elemento + "<br>ID estudiante: " + transformado.estudiante_id;
  salida = salida  + elemento + "<br><br>";
  document.getElementById("rtaEestcurs").innerHTML = salida;
}

function listar_estudiantecurso(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idLEestcurs").value;
  fetch("http://localhost:8888/.netlify/functions/cursos/registraEstudiante/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarLEestcurs(result))
    .catch((error) =>
      console.error(error));
}

function cargarEEestcurs(resultado){
  console.log(resultado)
  let transformado = JSON.parse(resultado);
  document.getElementById("rtaEEestcurs").innerHTML = transformado.respuesta;
}

function eliminar_estudiantecurso(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  let elid=document.getElementById("idEEestcurs").value;
  console.log(elid)
  fetch("http://localhost:8888/.netlify/functions/cursos/registraEstudiante/"+elid, requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargarEEestcurs(result))
    .catch((error) =>
      console.error(error));
}


