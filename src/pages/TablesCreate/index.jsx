import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // MenuItem,
  // Select,
  Button,
  TextField,
  Container,
} from '@material-ui/core';
import SelectTeam from '../UsersInvite/components/SelectTeam';
import BackButton from '../../components/BackButton';
import makeFetch from '../../services';
import { getTableCreateRequestData } from '../../services/tablesService';
import { addTable } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teamsService';

const TablesCreate = () => {
  const [selected, setSelectedTeam] = useState('');
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const classesMain = useStylesMain();
  const history = useHistory();
  const dispatch = useDispatch();

  const countRef = useRef();

  useEffect(() => {
    const getTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeFetch(requestData);
      if (res.data) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  }, [dispatch, token]);

  const onAddTeam = async (e) => {
    e.preventDefault();

    const teamItem = teams.find(({ team_name }) => team_name === selected);

    const body = {
      table_number: Number(countRef.current.value),
      team_id: teamItem._id,
    };
    const res = await makeFetch(getTableCreateRequestData({ token, body }));
    if (res.data) {
      countRef.current.value = '';
      history.push('/tables');
      addTable(res.data);
    }
  };

  const handleChange = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);
  };
  return (
    <>
      <BackButton />
      <Container component="main" maxWidth="xs">
        <form noValidate={false} onSubmit={onAddTeam}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Table Number"
            inputRef={countRef}
          />
          <SelectTeam
            id="team_id"
            team_id="team_id"
            value={selected}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classesMain.picsartButton}
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default TablesCreate;
