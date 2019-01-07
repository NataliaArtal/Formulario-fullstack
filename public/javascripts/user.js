$(document).ready(function() {
    getUserList();
});


function getUserList(search) {
    var url = 'http://localhost:3000/api/users';
    if (search && search.length > 0) {
        url = url + '?search=' + search;
    }
    $.ajax(url)
    .done(function(data){
        dibujarTabla(data);
    });

}

function dibujarTabla(usuarios) {
    $('#lista-usuarios tr.user-row').remove();
    for(let i= 0; i < usuarios.length; i++) {
        $('#lista-usuarios').append(`
        <tr class="user-row" id="user-${usuarios[i].id}">
            <td>${usuarios[i].nombre}</td>
            <td>${usuarios[i].apellido}</td>
            <td>${usuarios[i].telefono}</td>
            <td>${usuarios[i].mail}</td>
            <td><button onclick="eliminarUsuario(${usuarios[i].id})" class="btn" id="borrar">Borrar</button></td>
            <td><button class="btn edit" id="put" onclick="editarUsuario(${usuarios[i].id})" >Editar</button></td>
        </tr>`);
    };
}

$('#boton-filtro').on("click", function(e){
    var search = $('#buscar').val();
    getUserList(search);
})

function eliminarUsuario (id) {
    $.ajax('http://localhost:3000/api/users/' + id, {
        method: 'DELETE',
        success: function (data) {
            $('#user-' + id).remove();
            alert('Eliminar usuario')
            location.href = '/users';
        }
    })
}

$('#boton-volver').on("click", function(e){
    location.href = '/users/new';
})

function editarUsuario(id) {
    location.replace (location.href + "edit?id=" + id);
}



