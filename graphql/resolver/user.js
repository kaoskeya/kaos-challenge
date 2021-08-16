module.exports = {
  Query: {
    getUser: async (_, args, { dataSources }) => 
      dataSources.userAPI.getUser(args.id),
  },
  Mutation: {
    insertUser: async (_, args, { dataSources }) =>
      dataSources.userAPI.insertUser(args.object),
  },
};
