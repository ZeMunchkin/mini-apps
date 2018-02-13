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
    var tableString = 'firstName,lastName,county,city,role,sales';
    var employeeTableData = [tableString];
    
    var traverse = function (objNode) {
      var employeeWorkingArray = [];

      employeeWorkingArray.push(objNode.firstName, 
        objNode.lastName, 
        objNode.county,
        objNode.city,
        objNode.role,
        objNode.sales
      );

      employeeTableData.push(employeeWorkingArray.join(','));

      objNode.children.forEach ( child => {
        traverse(child);
      });
    }

    traverse(obj);

    return employeeTableData;
  }
};

module.exports = helpers;