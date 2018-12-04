$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    var div = $('#resultado');

    $('#check').on('click', function () {
        let dni = $('#dni').val();
        let firma = $('#firma_digital').val();
        $('#firma_digital').val('');
        $('#dni').val('');
        div.empty();
        var data = {
            dni: dni,
            firmaDigital: firma
        }
        $.get('http://localhost:3000/checkdata', data, function (res) {
        
            if (res.length === 0 || res.code == "ER_BAD_FIELD_ERROR" || dni == ''|| firma == '') {
                div.append($('<h4 class="red-text text-darken-4">Datos incorrectos.</h4>'));
            } else {
                $.get('http://localhost:3000/mesa/check', data, function (res) {

                    if (res.length === 0) {
                        div.append($('<h3 class="blue-text text-darken-4">No ha sido asignad@ a ninguna mesa.</h3>'));
                    } else {
                        let cole = res[0];
                        let puesto = '';
                        div.append($('<h3>Colegio asignado:</h3>'));
                        div.append($('<h5>Dirección: ' + cole.direccion + '</h5>'));
                        div.append($('<h5>Población: ' + cole.poblacion + '</h5>'));
                        div.append($('<h5>Provincia: ' + cole.provincia + '  C.P.: ' + cole.postal + '</h5>'));
                        div.append($('<h5>Mesa número: ' + cole.numero + '</h5>'));
                        switch (cole.puesto) {
                            case 'vocal1':
                                puesto = 'PRIMER VOCAL';
                                break;
                            case 'vocal2':
                                puesto = 'SEGUNDO VOCAL';
                                break;
                            case 'presidente':
                                puesto = 'PRESIDENTE DE MESA';
                                break;
                            case 'sup_presidente':
                                puesto = 'SUPLENTE DEL PRESIDENTE';
                                break;
                            case 'sup2_vocal1':
                                puesto = 'SEGUNDO SUPLENTE DEL PRIMER VOCAL';
                                break;
                            case 'sup_vocal1':
                                puesto = 'SUPLENTE DEL PRIMER VOCAL';
                                break;
                            case 'sup_vocal2':
                                puesto = 'SUPLENTE DEL SEGUNDO VOCAL';
                                break;
                            case 'sup2vocal2':
                                puesto = 'SEGUNDO SUPLENTE DEL SEGUNDO VOCAL';
                                break;
                            case 'sup2_presidente':
                                puesto = 'SEGUNDO SUPLENTE DEL PRESIDENTE';
                                break;
                            
                                default:
                                break;
                        }
                        div.append($('<h4>SU PUESTO: ' + puesto + '</h4>'));
                        div.append($('<p>Deberá personarse en la mesa indicada a las 8:00 de la jornada electoral, si no le es posible debe comunicarlo lo antes posible a su junta electoral correspondiente.</p>'));
                    }
                });
            }
        });

    });

});


