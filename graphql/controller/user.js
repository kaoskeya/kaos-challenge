const ifsc = require("../../network/ifsc");
const weather = require("../../network/weather");
const db = require("../../db");

/**
 * Create a new user profile with account data
 * @param {Object} user user object
 */
exports.insertUser = async (user) => {
  var createUser = await db.addUserData(user);

  if (!createUser) {
    throw new Error("User account could not be created");
  }
  var accountDetails = await fetchBankAndWeather(user);
  return {
    id: 0,
    ...user,
    accounts: accountDetails,
  };
};

exports.getUser = async (id) => {
  var user = await db.getUserData(id);
  console.log("getUser", user);

  var accountDetails = await fetchBankAndWeather(user);

  return {
    id: 0,
    ...user,
    accounts: accountDetails,
  };
};

/**
 * Fetch bank and weather details for all accounts of a user
 * @param {Object} user user object
 */
const fetchBankAndWeather = async (user) => {
  console.log("fetchBankAndWeather", user);

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

  return accountDetails;
};
