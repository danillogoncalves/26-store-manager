const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
});

const errorResponse = (error, res) => {
  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (error.details[0].type === 'string.min' || error.details[0].type === 'string.empty') {
    return res.status(422).json({ message: error.details[0].message });
  }
};

const nameValidad = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(error, res);
  }
  next();
};

module.exports = {
  nameValidad,
};