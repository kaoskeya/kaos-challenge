module.exports = {
  Mutation: {
    insert_user_one: async (_, args, { dataSources }) =>
      dataSources.userAPI.updateUser(args.object),
  },
};
