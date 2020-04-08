//Comando para establecer la conexión.
var socket = io();
var searchParams = new URLSearchParams(window.location.search);

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});


if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El numero de escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$(`h1`).text('Escritorio ' + escritorio);

var label = $('small');

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === 'No hay tickets') {
            label.text(res);
            alert(res);
            return;
        }
        label.text('Ticket : ' + res.numero);

    });


});