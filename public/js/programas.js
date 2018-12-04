
$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    var idpartido;

    $('.col').on('click','a',function(){
        idpartido = $(this).attr('id');
    })

    $('.modal').modal({
        onOpenStart: function(){
            $('.modal-content').empty();
            let boton = $('<a href="#!" target="_blank" class="waves-effect waves-green btn-large"><i class="material-icons right">list</i>VER PROGRAMA</a>');
            let data = {
                id: idpartido
            }
            let candidatos = $('<ul class="collection"></ul>');
            $.get('http://localhost:3000/programas/partido',data, function (res) {
                let header = $('<h3>Candidatura de: ' + res[0].nombre + '</h3>');
                $('.modal-content').prepend(header);
                boton.attr('href',res[0].programa);
            });

            $.get('http://localhost:3000/programas/candidatos', data, function (res) {
                
                res.forEach(e => {
                    let can = $('<li class="collection-item"></li>');
                    can.text(e.nombre + ' ' + e.apellido1 + ' ' + e.apellido2);
                    candidatos.append(can);
                });
            });
            $('.modal-content').prepend(candidatos);
            $('.modal-content').append(boton);
        }
    });
    
});
