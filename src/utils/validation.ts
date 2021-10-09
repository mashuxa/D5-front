import { emailRegExp, passwordRegExp } from "../constants/regExp";

interface IValidateParams {
  required: boolean;
  validator: (value: string, values: Record<string, string>) => boolean;
  message: string;
}

const validateRules: Record<string, IValidateParams> = {
  email: {
    required: true,
    validator: (value: string): boolean => !!emailRegExp.exec(value),
    message: 'Incorrect email',
  },
  password: {
    required: true,
    validator: (value: string): boolean => !!passwordRegExp.exec(value),
    message: 'Password should contain at least one digit, lower case, upper case and at least 8 characters',
  },
  repeatPassword: {
    required: true,
    validator: (value: string, values: Record<string, string>): boolean => value === values["repeatPassword"],
    message: 'Incorrect password',
  },
};

export const validate = (values: Record<string, string>): Record<string, string> => Object.entries(values).reduce<Record<string, string>>((acc, [key, value]) => {
  const { required, validator, message } = validateRules[key];

  if (required && !value) {
    return { ...acc, [key]: 'Required field' };
  }

  if (!validator(value, values)) {
    return { ...acc, [key]: message };
  }

  return acc;
}, {});

export default validate;