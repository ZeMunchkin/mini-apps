var helpers = {

  parseResults: function (resultString) {
    //split the results string on the '\n' & then rejointo get rid of the newline
    var afterSplit = resultString.split('\n');
    var string = afterSplit.join('');

    //get rid of the semicolon at the end if there is one
    if ( string.slice( string.length - 1 ) === ';') {
      string = string.slice(0, string.length - 1);
    }

    //parse the string into an object
    var resultObject = JSON.parse(string);

    return resultObject;
  },

  createTableArray: function (obj) {
    var objKeys = [];

    //iterate through object keys and add them all except children to keys array
    for (var key in obj) {
      if (key !== 'children') {
        objKeys.push(key);
      }
    }

    var keysString = '<div class="tableKeys">' + objKeys.join(' || ') + '</div>';
    var employeeTableData = [keysString];

    //create recursion function, takes an obj as arg
    var traverse = function (currentObject) {
      //variable for employee key values array
      var employeeKeyValues = [];
      //iterate through object keys
      objKeys.forEach( key => {
        //add each of those values at the key to the array
        if (currentObject[key] !== undefined) {
          employeeKeyValues.push(currentObject[key]);
        } else {
          employeeKeyValues.push('N/A');
        }
      })

      //create a string by joining the array and wrapping in a div
      var employeeDataString = '<div>' + employeeKeyValues.join(' || ') + '</div>';
      //push string into employee table data
      employeeTableData.push(employeeDataString);

      //if the object has children, call traverse on all children
      currentObject.children.forEach( child => {
        traverse(child);
      });

    }

    //call traverse on object
    traverse(obj);

    //return all the table data
    return employeeTableData;
  }
};

module.exports = helpers;