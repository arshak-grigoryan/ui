import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from '../../store/slices/teamsSlice';
import Filter from '../../components/Filter';
import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import useStylesLocal from './style';

const Teams = () => {
  const token = useSelector((state) => state.signin.token);
  const teams = useSelector((state) => state.teams.teams);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const classesLocal = useStylesLocal();

  const filteredTeams = useMemo(
    () =>
      (teams || []).filter((item) =>
        item.team_name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, teams]
  );

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, [token, dispatch]);

  return (
    <>
      <div className={classesLocal.wrapper}>
        <Filter
          value={searchValue}
          onChange={setSearchValue}
          className={classesLocal.filter}
          placeholder="Search By Name"
        />
        <AddTeam />
      </div>
      <TeamsTable teams={filteredTeams} />
    </>
  );
};

export default Teams;
