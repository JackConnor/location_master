
$(function(){
  ///////begin jquery

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
        data.forEach(function(book){
          console.log(book);
        });

      }
    })
  })
})
///start ajax calls
