import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  name: Yup.string().required().min(2),
  extension: Yup.number().positive().required(),
  elevation: Yup.number().positive().required(),
  stop_points: Yup.number().positive().integer(),
  difficult: Yup.string().required(),
  point_A: Yup.object()
    .shape({
      latidute: Yup.number().required().nullable(false),
      longitude: Yup.number().required().nullable(false),
    })
    .required()
    .nullable(false),
  point_B: Yup.object()
    .shape({
      latidute: Yup.number().required().nullable(false),
      longitude: Yup.number().required().nullable(false),
    })
    .required()
    .nullable(false),
});

export const SchemaUpdate = Yup.object().shape({
  name: Yup.string().min(2),
  extension: Yup.number().positive(),
  elevation: Yup.number().positive(),
  stop_points: Yup.number().positive().integer(),
  difficult: Yup.string(),
  point_A: Yup.object()
    .shape({
      latidute: Yup.number().nullable(false),
      longitude: Yup.number().nullable(false),
    })

    .nullable(false),
  point_B: Yup.object()
    .shape({
      latidute: Yup.number().nullable(false),
      longitude: Yup.number().nullable(false),
    })

    .nullable(false),
});
