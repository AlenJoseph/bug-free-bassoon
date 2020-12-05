const Validator = require('validator')

module.exports = function validateCsvData(rows) {
    const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
    for (let i = 0; i < dataRows.length; i++) {
      const rowError = validateCsvRow(dataRows[i]);
      if (rowError) {
        return `${rowError} on row ${i + 1}`
      }
    }
    return;
  }


   validateCsvRow=(row)=> {
    data={}
    data.email = row[0]
    data.newletter_content =  row[1]
    data.newletter_name = row[2]

    if (!Validator.isEmail(data.email)) {
      return "invalid email"
    }
    else if(Validator.isEmpty(data.email)){
        return "Email field is empty"
    }
    else if(Validator.isEmpty(data.newletter_content)){
        return "newletter_content field is empty"
    }
    else if(Validator.isEmpty(data.newletter_name)){
        return "newletter_name field is empty"
    }
    return;
  }