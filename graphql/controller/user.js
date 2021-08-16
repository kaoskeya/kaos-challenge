const ifsc = require("../../network/ifsc");
const weather = require("../../network/weather");

exports.updateUser = async (user) => {
  var accountDetails = user.accounts;

  var index = 0;
  for await (account of user.accounts) {
    var bank = await ifsc.ifscDetails(account.ifsc);
    var bankData = {
      name: bank.BANK,
      branch: bank.BRANCH,
      city: bank.CITY,
    };

    var weatherDetails = await weather.getWeather(bank.CITY, bank.STATE);

    bankData.weather = {
      temp_c: weatherDetails.temp_c,
      is_day: weatherDetails.is_day === 0 ? false : true,
      humidity: weatherDetails.humidity,
      cloud: weatherDetails.cloud === 0 ? false : true,
      uv: weatherDetails.uv,
    };

    accountDetails[index].id = index;
    accountDetails[index].bank = bankData;
    index++;
  }

  console.log(accountDetails);

  var details = await ifsc.ifscDetails(user.accounts[0].ifsc);
  return {
    id: 0,
    ...user,
    accounts: accountDetails,
  };
};
