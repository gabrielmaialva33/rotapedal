import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  name: Yup.string().min(2).max(20).required().nullable(false),
  phone: Yup.string().max(11).required().nullable(false),
  services: Yup.string().required().nullable(false),
  link: Yup.string().required().nullable(true),
  point: Yup.object()
    .shape({
      latitude: Yup.number().required().nullable(false),
      longitude: Yup.number().required().nullable(false),
    })
    .required()
    .nullable(false),
});

export const SchemaUpdate = Yup.object().shape({
  name: Yup.string().min(2).max(20).nullable(false),
  phone: Yup.string().max(11).nullable(false),
  services: Yup.string().nullable(false),
  link: Yup.string().nullable(true),
  point: Yup.object()
    .shape({
      latitude: Yup.number().nullable(false),
      longitude: Yup.number().nullable(false),
    })
    .nullable(false),
});
