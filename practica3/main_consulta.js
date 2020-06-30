"use script";
// ****************** 6 ********************* CARGAR USUARIOS REGISTRADOS
function load_users(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://users-dasw.herokuapp.com/api/users");
  xhr.setRequestHeader('x-auth',localStorage.token)
  xhr.setRequestHeader('x-user-token',localStorage.token_login)
  xhr.send();
  xhr.onload = ()=> {
    if(xhr.status ==200){
        let listado =JSON.parse( xhr.response); 
        document.getElementById('lista').innerHTML='';
        for (let i = 0; i < listado.length; i++) {
            document.getElementById('lista').innerHTML += `
            <div class="media col-8 mt-2" id=${listado.correo}>
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" src=${listado[i].url}>
            </div>
            <div class="media-body align-self-center">
                <h4>${listado[i].nombre} ${listado[i].apellido}</h4>
                <p name="correo">Correo: ${listado[i].correo}</p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a href="detalle.html" class="btn btn-primary edit" onclick=guardarcorreo('${listado[i].correo}')><i class="fas fa-search edit  " ></i></a>
                </div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editar" onclick=verDetalle('${listado[i].correo}')><i class="fas fa-pencil-alt edit  "></i></a>
                </div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#detalle" onclick=detalles('${listado[i].correo}')><i class="fas fa-trash-alt  remove "></i></i></a>
                </div>
            </div>
        </div>`            
        }

    }else alert(xhr.status);
  }
}
load_users();

function verDetalle(correo){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://users-dasw.herokuapp.com/api/users/"+correo);
  xhr.setRequestHeader('x-auth',localStorage.token);
  xhr.setRequestHeader('x-user-token',localStorage.token_login);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send();
  xhr.onload = ()=> {
      if(xhr.status==200){
        let usuario = JSON.parse(xhr.response);
        document.getElementById('nombre').value=usuario.nombre
        document.getElementById('apellido').value=usuario.apellido
        document.getElementById('fecha').value=usuario.fecha
        document.getElementById('pass1').value=usuario.password
        document.getElementById('pass2').value=usuario.password
        document.getElementById('hombre').disabled=true;
        document.getElementById('mujer').disabled=true;
        if(usuario.sexo == "H")
            document.getElementById('hombre').checked=true;
        else
            document.getElementById('mujer').checked=true;

        document.getElementById('correo').disabled=true;
        document.getElementById('correo').value= usuario.correo;
        document.getElementById('url').value=usuario.url

    }else alert(xhr.status);
  }
}
// ****************** 7 ********************* ACTUALIZAR USUARIO
function actualizar(){
    let xhr = new XMLHttpRequest();
    let correo1 = document.getElementById('correo').value;
    xhr.open("PUT", "https://users-dasw.herokuapp.com/api/users/"+correo1);
    xhr.setRequestHeader('x-auth',localStorage.token);
    xhr.setRequestHeader('x-user-token',localStorage.token_login);
    xhr.setRequestHeader('Content-Type','application/json');
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value
    let fecha = document.getElementById('fecha').value;
    let url = document.getElementById('url').value;
    let password = document.getElementById('pass1').value;
    let sexo;
    if(document.getElementById('hombre').checked=true )
        sexo =  'H'
    else
        sexo = 'M'
    if (document.getElementById('pass1').value == document.getElementById('pass2').value)
        password = document.getElementById('pass1').value;
    let string = JSON.stringify({nombre:nombre,apellido:apellido,correo:correo1,url:url,sexo:sexo,fecha:fecha,password:password});
    xhr.send(string);
    xhr.onload = ()=> {
        if(xhr.status==201 || xhr.status==200){
            console.log("Usuario actualizado...");
        }else alert(xhr.status);
    }
}

function detalles(correo){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://users-dasw.herokuapp.com/api/users/"+correo);
    xhr.setRequestHeader('x-auth',localStorage.token);
    xhr.setRequestHeader('x-user-token',localStorage.token_login);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.onload = ()=> {
        let usuario = JSON.parse(xhr.response);
        document.getElementById('nombrem').innerText+=usuario.nombre + usuario.apellido
        document.getElementById('fecham').innerText+=usuario.fecha;
        document.getElementById('sexom').innerText+= usuario.sexo
        document.getElementById('correom').innerText+= usuario.correo;
        document.getElementById('urlm').src=usuario.url
    }
}

function borrar(correo){
    let xhr = new XMLHttpRequest();
    let correo1 = document.getElementById('correom').innerText;
    console.log(correo1);
    xhr.open("DELETE", "https://users-dasw.herokuapp.com/api/users/"+correo1);
    xhr.setRequestHeader('x-auth',localStorage.token);
    xhr.setRequestHeader('x-user-token',localStorage.token_login);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.onload = ()=> {
        if(xhr.status==200)
            console.log("Usuario Eliminado");
        else alert(xhr.status)
    }
    load_users();
}

function guardarcorreo(correo){
    localStorage.user_temp = correo;
}
