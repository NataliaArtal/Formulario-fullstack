var inputNombre = $('#nombre');
var inputApellido = $('#apellido');
var inputTelefono = $('#telefono');
var inputMail = $('#mail');
var actualizar = false;
var params = null;

$(window).load(function() {
  $(".loader").fadeOut("slow");
});

$(document).ready(function() {

  params = getQueryParams(window.location.href);
  
  if (params && params.id) {
    traerUsuario(params.id);
    actualizar = true;
  }
});

$('#first_form').submit(function(e) {
  e.preventDefault();
  var formValido = true;
  
  $(".error").remove();
  
  if (inputNombre.val().length < 1) {
    inputNombre.after('<span class="error">El nombre es requerido</span>');
    formValido = false;
  } else if (inputNombre.val().length > 30) {
    inputNombre.after('<span class="error">El nombre no puede superar los 30 caracteres</span>');
    formValido = false;
  }
  
  if (inputApellido.val().length < 1) {
    inputApellido.after('<span class="error">El apellido es requerido</span>');
    formValido = false;
  } else if (inputApellido.val().length > 30) {
    inputApellido.after('<span class="error">El apellido no puede superar los 30 caracteres</span>');
    formValido = false;
  }
  
  if (inputTelefono.val().length < 1) {
    inputTelefono.after('<span class="error">El telefono es requerido </span>');
    formValido = false;
  } else if (isNaN(inputTelefono.val())) {
    inputTelefono.after('<span class="error">El telefono no es valido</span>');
    formValido = false;
  }
  
  if (inputMail.val().length < 1) {
    inputMail.after('<span class="error">El mail es requerido</span>');
    formValido = false;
  } else if (!isEmail(inputMail.val())) {
    inputMail.after('<span class="error">Ingrese un email valido</span>');
    formValido = false;
  }
  
  if (formValido) {
    
    if (actualizar) {
      var user = {
        id: params.id,
        nombre: inputNombre.val(),
        apellido: inputApellido.val(),
        telefono: inputTelefono.val(),
        mail: inputMail.val()
      } 

      putUser(user);

    } else {
      var user = {
        id: -1,
        nombre: inputNombre.val(),
        apellido: inputApellido.val(),
        telefono: inputTelefono.val(),
        mail: inputMail.val()
      } 

      postNewUser(user); 
    }
    
  } 
});


function isEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(email)) {
		return false;
	} else {
		return true;
  }
}

function postNewUser(user) {
  $.ajax('http://localhost:3000/api/users', {
  method: 'POST',
  data: user,
  success: function () {
    setTimeout( function() {
      location.href = '/users'; 
      
    }, 500)
  }
})
}

function putUser(user) {
  $.ajax('http://localhost:3000/api/users/' + user.id, {
  method: 'PUT',
  data: user,
  success: function () {
    setTimeout( function() {
      location.href = '/users';  
    }, 500)
  }
})
}


 function getQueryParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

function traerUsuario(id) {
  $.ajax('http://localhost:3000/api/users/' + id, {
    method: "GET"
  }).done(function(data){
    inputNombre.val(data.nombre);
    inputApellido.val(data.apellido);
    inputTelefono.val(data.telefono);
    inputMail.val(data.mail);
  })
}