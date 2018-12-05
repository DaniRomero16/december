$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $.get('http://localhost:3000/votos/count', function (res) {  
        
        let participantes = 0;
        res.forEach(e => {
            if (e.partido != null) {
                participantes += e.total;
            }   
        });
        const ESC = participantes / 350;
        
        var options = {
            title: {
                text: "Escrutinio de Votos"
            },
            subtitles: [{
                text: "Elecciones Generales, 2019"
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y} Escaños",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y} Escaños",
                dataPoints: [
                    { y: Math.round(res[1].total/ESC), label: "PP", color: '#015ba0'},
                    { y: Math.round(res[2].total/ESC), label: "PSOE", color: '#8e0101' },
                    { y: Math.round(res[3].total/ESC), label: "Unidos Podemos", color: '#6d1696' },
                    { y: Math.round(res[4].total/ESC), label: "Ciudadanos", color: '#ef5f0b' },
                    { y: Math.round(res[5].total/ESC), label: "ERC", color: '#f2b93e' },
                    { y: Math.round(res[6].total/ESC), label: "DiL", color: '#0e0889' },
                    { y: Math.round(res[7].total/ESC), label: "PNV", color: '#1c560b' },
                    { y: Math.round(res[8].total/ESC), label: "Bildu", color: '#98b743' },
                    { y: Math.round(res[9].total/ESC), label: "VOX", color: '#2ab21e' }
                ]
            }]
        };
        $("#graph").CanvasJSChart(options);
    });

});

