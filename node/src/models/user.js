const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { models } = require("../../env").getEnv();
const mongooseSchema = mongoose.Schema;
const collectionName = models.USERS;

const schema = new mongooseSchema({
  fn: {
    type: String,
    alias: "firstName",
    minlength: 4,
    required: true
  },
  ln: {
    type: String,
    alias: "lastName",
    minlength: 4,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  age: { type: Number, min: 18, max: 65, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

const joiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(4),
  lastName: Joi.string()
    .min(4)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  age: Joi.number()
    .min(18)
    .max(65)
    .required()
});

//adding virtual fullname not stored in the document
schema
  .virtual("fullName")
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function(fullname) {
    this.name.first = fullname.substr(0, fullname.indexOf(" "));
    this.name.last = fullname.substr(fullname.indexOf(" ") + 1);
  });

//creating new index
schema.index({ firstName: 1, lastName: 1 });

module.exports.schema = schema;
module.exports.Model = dbConnection =>
  dbConnection.model(collectionName, schema);
module.exports.joiSchema = joiSchema;
