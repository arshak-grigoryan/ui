import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birthday: '',
    phone: {
      value: '',
      country: 'AM',
      phoneNumber: undefined,
    },
    team_id: '',
    position: '',
    is_admin: false,
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);
  const [isValidateSeparately, setIsValidateSeparately] = useState(true);

  const handleChange = (e) => {
    const ekeys = Object.keys(e);

    if (ekeys.includes('formattedValue')) {
      const { formattedValue, phoneNumber } = e;

      const phone = {
        value: formattedValue,
        country: e.country || values.phone.country,
        phoneNumber,
      };

      const vals = { ...values, phone };

      setValues(vals);

      if (submited) {
        const errs = validate(vals);

        setErrors(errs);

        if (Object.keys(errs).length === 0) {
          setIsValidateSeparately(false);
        }
      }
    } else {
      const { name, value } = e.target;

      const vals = {
        ...values,
        [name]: name !== 'is_admin' ? value : e.target.checked,
      };

      setValues(vals);

      if (submited) {
        const errs = validate(vals);

        setErrors(errs);

        if (Object.keys(errs).length === 0) {
          setIsValidateSeparately(false);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setSubmited(true);
    setIsValidateSeparately(true);
  };

  const resetValues = () =>
    setValues({
      email: '',
      first_name: '',
      last_name: '',
      birthday: '',
      phone: {
        value: '',
        country: 'AM',
        phoneNumber: undefined,
      },
      team_id: '',
      position: '',
      is_admin: false,
    });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submited && isValidateSeparately) {
      callback(values, resetValues);
      setSubmited(false);
    }
  }, [errors, values, callback, submited, isValidateSeparately]);

  return {
    handleChange,
    handleSubmit,
    resetValues,
    values,
    errors,
  };
};

export default useForm;
