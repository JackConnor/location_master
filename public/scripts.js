console.log('hi there');
$(function(){
  ///////begin jquery

  var btn = $('#testbtn');
    btn.on('click', function(evt) {
      console.log('boobs');
      console.log('btn working')
      evt.preventDefault();
      // var bookName = evt.target.name.value;
      $.ajax({
        method: "POST"
        , url: "/users" +evt.target.id
        , contentType: 'application/json; charset=UTF-8'
        , dataType   : 'json'
        , data: JSON.stringify({ user.facebook.name: userName })
        , success: function(user){
          console.log(user);

        }
      });
    });

})
///start ajax calls
