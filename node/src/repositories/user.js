const dbConnection = require("../../db");
const { Model } = require("../models/user");
const userModel = Model(dbConnection);

const getById = async id => {
  const foundUser = await userModel.findById(id);
  if (!foundUser) throw new APIError(404, "Invalid User ID");
  return foundUser;
};

module.exports = {
  getById
};
