

var handleClick = function (event) {
  console.log('I was clicked!');

  var formVal = document.getElementById('csvSubmission').value;
  console.log(formVal);

  $.ajax({
    url: '/',
    method: 'POST',
    headers: {
      "content-type": 'application/json',
    },
    data: JSON.stringify({
      "csvSubmission": formVal,
    }),
    success: function (data) {
      console.log('Success!', data);
    },
    error: function (data) {
      console.log('Error!', data);
    },
  });

}

