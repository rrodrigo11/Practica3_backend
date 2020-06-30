"use script";
// ****************** 3 ********************* CREACION DE TOKEN
function token_usuario(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://users-dasw.herokuapp.com/api/tokenDASW");
  xhr.setRequestHeader('x-expediente',703011)
  xhr.send();
  xhr.onload = ()=> {
    if(xhr.status ==200){
      let token='';
      for (let i = 10; i < (xhr.response.length-2); i++) {
        token+=xhr.response[i]
      }
      localStorage.token = token;
      console.log("Se guardó el token en localStorage.");
    }
  event.preventDefault();
}}
token_usuario();

// ****************** 4 ********************* REGISTRO USUARIO
let formulario = document.querySelector('#registro');
formulario.addEventListener('change', function(e){
  if(formulario.querySelectorAll('input:invalid').length == 0 && document.getElementById('pass1').value == document.getElementById('pass2').value)
    document.getElementById('reg_form').disabled = false;
  else
    document.getElementById('reg_form').disabled = true;
  });

document.querySelector("#reg_form").onclick = (event)=>{
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://users-dasw.herokuapp.com/api/users");
  xhr.setRequestHeader('x-auth',localStorage.token)
  xhr.setRequestHeader('Content-Type','application/json')
  let nombre = formulario.querySelectorAll('input')[0].value;
  let apellido = formulario.querySelectorAll('input')[1].value;
  let correo = formulario.querySelectorAll('input')[2].value;
  let url = formulario.querySelectorAll('input')[8].value;
  let sexo;
  if(formulario.querySelectorAll('input')[6].checked)
     sexo = formulario.querySelectorAll('input')[6].value;
  else
    sexo = formulario.querySelectorAll('input')[7].value;
  let fecha = formulario.querySelectorAll('input')[5].value;
  let password = formulario.querySelectorAll('input')[3].value;
  xhr.send(JSON.stringify({nombre:nombre,apellido:apellido,correo:correo,url:url,sexo:sexo,fecha:fecha,password:password}));
  xhr.onload=()=>{
    if(xhr.status == 201 )
      console.log("Usuario Registrado");
    else
      alert(xhr.statusText)
  }
  event.preventDefault();
}

// ****************** 5 ********************* LOGIN
function login(){
    let correo = document.querySelector('#email_login').value;
    let password = document.querySelector('#password_login').value
    let formData = JSON.stringify({correo:correo, password:password })
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://users-dasw.herokuapp.com/api/login");
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.setRequestHeader('x-auth',localStorage.token)
    xhr.send(formData);
    xhr.onload = ()=> {
      if(xhr.status ==200){
        let token='';
        for (let i = 10; i < (xhr.response.length-2); i++) {
          token+=xhr.response[i]
        }
        localStorage.token_login = token;
        window.location.href = "./consulta.html"
      }else alert(xhr.statusText);
      }
    event.preventDefault();
}
// ****************** 7 *********************


