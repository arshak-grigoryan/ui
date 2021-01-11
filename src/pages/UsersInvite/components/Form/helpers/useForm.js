import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    phone: '',
    team_id: '',
    position_id: '',
    is_admin: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'is_admin') {
      const { checked } = e.target;
      setValues({
        ...values,
        [name]: checked,
      });
    }
    if (name === 'phone') {
      // eslint-disable-next-line
      if (!isNaN(value)) {
        setValues({
          ...values,
          [name]: value,
        });
      }
    } else if (name !== 'is_admin') {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const resetValues = () =>
    setValues({
      email: '',
      first_name: '',
      last_name: '',
      birthdate: '',
      phone: '',
      team_id: '',
      position_id: '',
      is_admin: false,
    });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values, resetValues);
      setIsSubmitting(false);
    }
  }, [errors, values, callback, isSubmitting]);

  return { handleChange, handleSubmit, resetValues, values, errors };
};

export default useForm;
