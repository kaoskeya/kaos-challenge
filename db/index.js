const db = require("./models");
const sequelize = db.sequelize;
const Users = db.Users;
const Accounts = db.Accounts;

exports.addUserData = async (user) => {
  console.log("addUserData", user);
  try {
    const result = await sequelize.transaction(async (t) => {
      var createUser = await Users.create(user);
      for await (account of user.accounts) {
        await Accounts.create({
          ifsc: account.ifsc,
          number: account.number,
          userId: createUser.id,
        });
      }

      return createUser;
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getUserData = async (userId) => {
  var user = await Users.findOne({
    where: { id: userId },
    raw: true,
    nest: true,
  });

  var accounts = await Accounts.findAll({
    where: { userId: user.id },
    raw: true,
    nest: true,
  });

  return { ...user, accounts };
};

exports.getUserList = async () => {
  var user = await Users.findAll();
};
