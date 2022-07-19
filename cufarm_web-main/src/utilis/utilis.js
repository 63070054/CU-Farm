import _ from 'lodash';
import { resultCode } from '../components/CreditCardPayMent/GetTokenForm';

export const formatCurrency = (number) => {
  if (number) {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(number);
  } else {
    return 0;
  }
};

export const getPaymentResultMessage = (code) => {
  return _.find(resultCode, (rs) => rs.code === code)?.message || '';
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
