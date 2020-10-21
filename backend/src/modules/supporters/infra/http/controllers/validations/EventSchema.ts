import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  name: Yup.string().min(3).required().nullable(false),
  description: Yup.string().min(6).required().nullable(false),
  starts_in: Yup.date().nullable(false).required(),
  ends_in: Yup.date().nullable(false).required(),
  link: Yup.string().required(),
  point: Yup.object()
    .shape({
      latidute: Yup.number().required().nullable(false),
      longitude: Yup.number().required().nullable(false),
    })
    .required()
    .nullable(false),
});

export const SchemaUpdate = Yup.object().shape({
  name: Yup.string().min(3).nullable(false),
  description: Yup.string().min(6).nullable(false),
  starts_in: Yup.date().nullable(false),
  ends_in: Yup.date().nullable(false),
  link: Yup.string(),
  point: Yup.object()
    .shape({
      latidute: Yup.number().nullable(false),
      longitude: Yup.number().nullable(false),
    })

    .nullable(false),
});
