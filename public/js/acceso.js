$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('#sobreLleno').draggable();
    var errores = $('#errores');
    var vacio = $('#vacio');
    var lleno = $('#lleno');
    vacio.hide();
    lleno.hide();
    var dni;
    var firma;
    var voto;

    $('#check').on('click', function () {
        dni = $('#dni').val();
        firma = $('#firma_digital').val();
        errores.empty();
        let data = {
            dni: dni,
            firmaDigital: firma
        }
        console.log(dni);
        $.get('http://localhost:3000/checkdata', data, function (res) {

            if (res.length === 0 || res.code == "ER_BAD_FIELD_ERROR" || dni == '' || firma == '') {
                errores.append($('<h4 class="red-text text-darken-4">Datos incorrectos.</h4>'));
                vacio.hide();
                lleno.hide();
            } else {

                $.get('http://localhost:3000/votar/check', data, function (res) {
                    let votos = res[0];
                    if (votos.voto_parlamento !== null) {
                        errores.append($('<h4 class="red-text text-darken-4">Ya ha votado.</h4>'));
                        setTimeout(redirect, 2300);

                    } else {
                        vacio.show();
                    }

                });
            }
        });

    });

    $('#llenarsobre').on('click', function () {
        voto = $("input[name='congreso']:checked").val();
        vacio.hide();
        lleno.show();
        vote(dni, voto);
    });
    
    function vote(dni2, voto) {
        $('#urna').droppable({
            drop: () => {
                let dni = dni2;
                let data = {
                    dni: dni,
                    voto: voto
                }
                $.post('http://localhost:3000/votar', data, function (res) {

                    if (res.affectedRows !== 0) {
                        $('.section').empty();
                        let gracias = $('<h3 class="center">SU VOTO AL PARLAMENTO HA SIDO EMITIDO</h3>');
                        let container = $('<div class="container"></div>');
                        let container2 = $('<div class="container center"></div>');
                        let imagen = $('<img class="center" src="../css/images/parlamento.png">');
                        let imagen2 = $('<img class="center" src="../css/images/logo.png">');
                        imagen.css('width', '40%');
                        container.append(gracias);
                        container2.append(imagen);
                        container2.append(imagen2);

                        $('.section').append(container);
                        $('.section').append(container2);

                        setTimeout(redirect, 2300);

                    } else {
                        $('.section').empty();
                        errores.append($('<h4 class="red-text text-darken-4">HA OCURRIDO UN ERROR</h4>'));
                        setTimeout(redirect, 2300);
                    }
                });
            }
        });
    }

    function redirect() {
        $('.section').empty();

        let gracias = $('<h3 class="center">ESTÁ SIENDO REDIRIGIDO...</h3>');
        let container = $('<div class="container"></div>');
        let container2 = $('<div class="container center"></div>');
        let imagen = $(`<div class="preloader-wrapper big active">
                                <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                    <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                                </div>
                            </div>`);
        container.append(gracias);
        container2.append(imagen);
        $('.section').append(container);
        $('.section').append(container2);

        setTimeout(function () { location.href = '/resultados'; }, 2200);
    }

});

