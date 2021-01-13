import { useState } from 'react';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Input from '../Input';
import InputDate from '../InputDate';
import SelectTeam from '../SelectTeam';
import validate from './helpers/validateInfo';
import useForm from './helpers/useForm';
import useStylesLocal from './style';

const Form = ({ submitForm }) => {
  const classesLocal = useStylesLocal();

  const [dateType, setDateType] = useState('text');

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className={classesLocal.formWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={classesLocal.inputsWrapper}>
          <Input
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoFocus
          />
          <Input
            id="first_name"
            label="Name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            error={Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
          <Input
            id="last_name"
            label="Surname"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            error={Boolean(errors.last_name)}
            helperText={errors.last_name}
          />
          <InputDate
            type={dateType}
            name="birthdate"
            value={values.birthdate}
            onChange={handleChange}
            error={Boolean(errors.birthdate)}
            helperText={errors.birthdate}
            setDateType={setDateType}
          />
          <Input
            id="phone"
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            type="number"
          />
          <SelectTeam
            id="team_id"
            team_id="team_id"
            value={values.team_id}
            onChange={handleChange}
            error={Boolean(errors.team_id)}
            helperText={errors.team_id}
          />
          <Input
            id="position_id"
            label="Position"
            name="position_id"
            value={values.position_id}
            onChange={handleChange}
            error={Boolean(errors.position_id)}
            helperText={errors.position_id}
          />
          <FormControlLabel
            className={classesLocal.checkbox}
            control={
              <Checkbox
                id="is_admin"
                name="is_admin"
                value={values.is_admin}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Admin"
          />
          <Button
            type="submit"
            variant="contained"
            className={classesLocal.sbmtButton}
          >
            Invite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;