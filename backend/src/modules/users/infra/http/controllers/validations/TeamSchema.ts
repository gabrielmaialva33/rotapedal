import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  name: Yup.string().min(3).required(),
  description: Yup.string().notRequired().max(500),
});

export const SchemaUpdate = Yup.object().shape({
  name: Yup.string().min(3).notRequired(),
  description: Yup.string().notRequired().max(500),
});

export const SchemaAdd = Yup.object().shape({
  email: Yup.string().email().required(),
});
