import * as yup from 'yup';
import dayjs from 'dayjs';

const campaignSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório.'),
  status: yup
    .string()
    .oneOf(['ativa', 'pausada', 'expirada'], 'O status deve ser "ativa", "pausada" ou "expirada".')
    .required('O status é obrigatório.'),
  dataInicio: yup
    .date()
    .required('A data de início é obrigatória.')
    .test('validDate', 'Data de início inválida.', (value) => {
      return value ? dayjs(value).isValid() : false;
    }),
  dataFim: yup
    .date()
    .required('A data de fim é obrigatória.')
    .test('validDate', 'Data de fim inválida.', (value) => {
      return value ? dayjs(value).isValid() : false;
    })
    .test('isAfterStartDate', 'A data de fim deve ser posterior à data de início.', function (value) {
      const { dataInicio } = this.parent;
      return dayjs(value).isAfter(dayjs(dataInicio));
    }),
});

export default campaignSchema;
