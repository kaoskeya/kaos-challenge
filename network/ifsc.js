var ifsc = require("ifsc");

exports.validateIfsc = async (code) => {
  var isValid = await ifsc.validate(code);
  return isValid;
};

exports.ifscDetails = async (code) => {
  var ifscDetails = await ifsc.fetchDetails(code);
  return ifscDetails;
};
