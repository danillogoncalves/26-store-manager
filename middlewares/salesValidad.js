const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const errorResponse = (error, res) => {
  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (error.details[0].type === 'number.min') {
    return res.status(422).json({ message: error.details[0].message });
  }
};

const salesValidad = (req, res, next) => {
  for (let index = 0; index < req.body.length; index += 1) {
    const { error } = schema.validate(req.body[index]);
    if (error) {
      return errorResponse(error, res);
    }
  }

  next();
};

module.exports = {
  salesValidad,
};
