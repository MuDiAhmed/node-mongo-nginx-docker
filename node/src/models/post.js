const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { models } = require("../../env").getEnv();
const mongooseSchema = mongoose.Schema;
const collectionName = models.POSTS;
const userCollectionName = models.USERS;
const commentCollectionName = models.COMMENTS;

const schema = new mongooseSchema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 10,
    maxlength: 60,
    unique: true //is Not a Validator, It's a convenient helper for building MongoDB unique indexes.
  },
  body: { type: String, required: true, minlength: 10, maxlength: 255 },
  auther: {
    type: mongooseSchema.Types.ObjectId,
    ref: userCollectionName,
    required: true
  },
  isPublished: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  tags: [String],
  comments: [
    { type: mongooseSchema.Types.ObjectId, ref: commentCollectionName }
  ],
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 }
  }
});

const joiSchema = Joi.object({
  title: Joi.string()
    .min(10)
    .max(60)
    .required(),
  body: Joi.string()
    .min(10)
    .max(255)
    .required(),
  auther: Joi.string().required(),
  isPublished: Joi.boolean().default(false),
  tags: Joi.array().items(Joi.string()),
  comments: Joi.string(),
  meta: Joi.object({
    votes: Joi.number().default(0),
    favs: Joi.number().default(0)
  })
});

//adding instance method (have to use function, arrow function won't work)
schema.methods.findAllWithSameAuther = function(callback) {
  return this.model(collectionName).find({ auther: this.auther }, callback);
};

//adding static method
schema.statics.findByAuther = function(auther) {
  return this.find({ auther });
};

schema.pre(
  [
    "findOneAndRemove",
    "findOneAndDelete",
    "findOneAndUpdate",
    "find",
    "findOne"
  ],
  function() {
    this.populate("auther").populate("comments");
  }
);

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);
module.exports.joiSchema = joiSchema;
