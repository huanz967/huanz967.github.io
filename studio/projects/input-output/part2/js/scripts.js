$(document).ready(function(){
  // connect with server
  var socket = window.io.connect();

  // print new brush strokes from broadcasted data
  socket.on('broadcast-msg', function(data) {
    console.log('Get broadcast msg: ', data);
    var x = data[0];
    var y = data[1];
    console.log(x, y);
    var brushStroke = '<div class="brush-stroke" style="left: ' + x + '%; top: ' + y + '%;"</div>';

    $('body').append(brushStroke);
  });

  // information about current users
  socket.on('updateUsers', function(data) {
    console.log('Get user msg: ', data);
  });

  // create new socket connection
  socket.on('connect', function(){
    $(document).click(function(e) {
      console.log(e);
      var x = e.pageX / window.innerWidth * 100;
      var y = e.pageY / window.innerHeight * 100;
      var position = [x, y];

      socket.emit('emit-msg', position, function(data) {
        console.log('Emit Broadcast Msg: ', data);
      });
    });
  });
})
