import * as Joi from 'joi';

export const deviceSchema = Joi.object({
  deviceType: Joi.string().required(),
  androidDeviceId: Joi.string(),
  userId: Joi.string().required()
});

export const pushSchema = Joi.object({
  message: Joi.string().required(),
  userId: Joi.string().required(),
  sentFromDeviceId: Joi.string().required()
});
