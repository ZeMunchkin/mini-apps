

var handleClick = function (event) {
  console.log('I was clicked!');

  var formVal = document.getElementById('csvSubmission').value;
  document.getElementById('csvSubmission').value = '';

  var filter = document.getElementById('filter').value;
  document.getElementById('filter').value = '';


  $.ajax({
    url: '/',
    method: 'POST',
    headers: {
      "content-type": 'application/json',
    },
    data: JSON.stringify({
      "csv": formVal,
      "filter": filter,
    }),
    success: function (data) {
      console.log('Success!', data);
      $('#csvRender').append('<br>');
      $('#csvRender').append(data);
    },
    error: function (data) {
      console.log('Error!', data);
    },
  });

}
