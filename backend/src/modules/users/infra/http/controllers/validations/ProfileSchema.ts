import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  nickname: Yup.string().min(2).notRequired(),
  birthdate: Yup.date().required(),
  phone: Yup.string().min(11).notRequired(),
  bio: Yup.string().notRequired(),
});

export const SchemaUpdate = Yup.object().shape({
  nickname: Yup.string().min(2).optional().nullable(false),
  birthdate: Yup.date().optional().nullable(false),
  phone: Yup.string().min(11).optional().nullable(false),
  bio: Yup.string().optional().nullable(false),
});
