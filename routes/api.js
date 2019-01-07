var express = require('express');
var router = express.Router();
var fs = require('fs');
const archivo = 'users.json';

// Guardo un usuario nuevo en una lista
router.post('/users', function(req, res, next) {
  guardarUsuario(req.body);
  res.send('ok');
});

router.get('/users', function(req, res, next) {
  let listaUsuarios = cargarUsuarios(archivo);
  const search = req.query.search;

  if ( search && search.length > 0) {
    listaUsuarios = listaUsuarios.filter(function (user) {
      return user.nombre.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.apellido.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.telefono.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.mail.toLowerCase().indexOf(search.toLowerCase()) >= 0
    })
  }
  res.json(listaUsuarios);
});

router.delete('/users/:id', function(req, res, next) {
  let listaUsuarios = cargarUsuarios(archivo);
  var deleteId = req.params.id;
  
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].id == deleteId) {
      listaUsuarios.splice(i, 1);
    }
  }
  guardarListaUsuarios(listaUsuarios);
  res.json(listaUsuarios);
});

router.get('/users/:id', function(req, res, next) {
  let listaUsuarios = cargarUsuarios(archivo);
  var userId = req.params.id;
  var user = null;

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].id == userId) {
      user = listaUsuarios[i];
    }
  }
  res.json(user);
});

router.put('/users/:id', function(req, res, next) {
  let listaUsuarios = cargarUsuarios(archivo);
  var user = req.body;

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i].id == user.id) {
      listaUsuarios[i] = user;
    }
  }
  guardarListaUsuarios(listaUsuarios);
  res.send('guardado');
});




function guardarUsuario(user) {
  let listaUsuarios = cargarUsuarios(archivo);
  var errors = [];
  
  if (user.nombre.length < 1) {
    errors.push('El nombre es requerido');
  } else if (user.nombre.length > 30) {
    errors.push('El nombre no puede superar los 30 caracteres');
  }
  
  if (user.apellido.length < 1) {
    errors.push('El apellido es requerido');
  } else if (user.apellido.length > 30) {
    errors.push('El apellido no puede superar los 30 caracteres');
  }
  
  if (user.telefono.length < 1) {
    errors.push('El telefono es requerido'); 
  } else if (isNaN(user.telefono)) {
    errors.push('El telefono no es valido');
  }
  
  if (user.mail.length < 1) {
    errors.push('El mail es requerido');
  } else if (!isEmail(user.mail)) {
    errors.push('Ingrese un email valido');
  }
  
  if (errors.length > 0) {
    res.json(errors);
  } else {
    const newId = listaUsuarios.length === 0 ? (1) : (listaUsuarios[listaUsuarios.length - 1].id + 1);
    user.id = newId;
    listaUsuarios.push(user);
    guardarListaUsuarios(listaUsuarios);
  }
}

function guardarListaUsuarios(lista) {
  fs.writeFileSync(archivo, JSON.stringify(lista));
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function cargarUsuarios(archivo) {
  let data = fs.readFileSync(archivo);
  data = JSON.parse(data);
  return data;
}



module.exports = router;

