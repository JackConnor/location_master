//
$(function(){
  ///////begin jquery

  var btn = $('#findFriends');
    btn.on('click', function(evt) {
      console.log('btn working')
      evt.preventDefault();
      // var bookName = evt.target.name.value;
      $.ajax({
      method: "GET"
      , url: "/users"
      , success: function(data){
        console.log(data);
        data.forEach(function(user){
          console.log(user);

          $('.row').append("<div class='4u 12u$(mobile)'><a href='#' class='image fit'><img src="+user.facebook.picture+" >"+(user.facebook.name || user.name || user.twitter.displayName)+"</a></div>");


        });

      }
    })
  })
  var btn = $('#testbtn');
    btn.on('click', function(evt) {
      console.log('btn working')
      evt.preventDefault();
      // var bookName = evt.target.name.value;
      $.ajax({
      method: "GET"
      , url: "/users"
      , success: function(data){
        console.log(data);
        data.forEach(function(user){
          console.log(user);

          $('#alsoTesting').append("<div class='4u 12u$(mobile)'><a href='#' class='image fit'><img src="+user.facebook.picture+" >"+(user.facebook.name || user.name || user.twitter.displayName)+"</a></div>");


        });

      }
    })
  })
})


var socket = io();
var socketid = socket.id;


// $('#testbtn').on('click', function(){
//   console.log('loaded');
//   console.log(socket.id);
//   socket.emit('fb', socket.id);
// })
socket.on('fb', function(data){
  console.log(data);
})

console.log(socketid);
socket.emit('fb', {socket: socketid});
