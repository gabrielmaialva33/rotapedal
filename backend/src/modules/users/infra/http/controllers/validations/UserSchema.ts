import * as Yup from 'yup';

export const SchemaCreate = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Passwords must match',
  ),
});

export const SchemaUpdate = Yup.object().shape({
  name: Yup.string().notRequired(),
  email: Yup.string().email().notRequired(),
  old_password: Yup.string().min(6),
  password: Yup.string().min(6),
  confirm_password: Yup.string().when(
    'password',
    (password: Yup.Schema<string>, field: Yup.ObjectSchema) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field,
  ),
});

export const SchemaAddRole = Yup.object().shape({
  email: Yup.string().email().required(),
  role: Yup.string().required(),
});
