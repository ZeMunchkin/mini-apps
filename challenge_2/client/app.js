

var handleClick = function (event) {
  console.log('I was clicked!');

  var formVal = document.getElementById('csvSubmission').value;
  document.getElementById('csvSubmission').value = '';

  $.ajax({
    url: '/',
    method: 'POST',
    headers: {
      "content-type": 'application/json',
    },
    data: JSON.stringify({
      "csv": formVal,
    }),
    success: function (data) {
      console.log('Success!', data);
      $('#formSubmitted').append('<br>');
      $('#formSubmitted').append(data);
    },
    error: function (data) {
      console.log('Error!', data);
    },
  });

}
