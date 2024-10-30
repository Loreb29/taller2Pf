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

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
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
    event.preventDefault();
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


