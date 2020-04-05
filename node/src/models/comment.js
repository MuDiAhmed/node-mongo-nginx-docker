const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { models } = require("../../env").getEnv();
const mongooseSchema = mongoose.Schema;
const collectionName = models.COMMENTS;
const userCollectionName = models.USERS;
const postCollectionName = models.POSTS;

const schema = new mongooseSchema({
  commenter: {
    type: mongooseSchema.Types.ObjectId,
    ref: userCollectionName,
    required: true
  },
  body: { type: String, required: true, minlength: 10, maxlength: 255 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  commentedOn: {
    type: mongooseSchema.Types.ObjectId,
    required: true,
    refPath: "onModel"
  },
  onModel: {
    type: String,
    required: true,
    enum: [postCollectionName]
  }
});

const joiSchema = Joi.object({
  commenter: Joi.string().required(),
  body: Joi.string()
    .min(10)
    .max(255)
    .required(),
  commentedOn: Joi.string().required(),
  onModel: Joi.string()
    .valid(postCollectionName)
    .required()
    .insensitive()
});

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);
module.exports.joiSchema = joiSchema;
