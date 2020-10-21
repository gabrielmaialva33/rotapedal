import * as Yup from 'yup';

const Schema = Yup.object().shape({
  nickname: Yup.string().min(2).max(20).notRequired().nullable(false),
  model: Yup.string().min(1).max(20).notRequired().nullable(false),
  manufacturing_date: Yup.date().nullable(false).notRequired(),
});

export default Schema;
