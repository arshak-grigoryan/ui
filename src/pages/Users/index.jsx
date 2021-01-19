import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import {
  getLimitedUsersRequestData,
  getUsersSearchRequestData,
  getUsersSelectTeamRequestData,
} from '../../services/users';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import TeamsDropDown from './components/TeamsDropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTeamName, setSelectedTeamName] = useState('All');
  const [debouncedSearchValue] = useDebounce(searchValue, 100);
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  console.log('Users Page render');

  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleInputChange = (value) => {
    setSearchValue(value);
  };

  const handleSelectedTeamChange = (value) => {
    console.log('selectedTeam', value);
    setSelectedTeamName(value);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const getTeams = await makeRequest(requestData);
      if (getTeams.data) {
        dispatch(setTeams(getTeams.data));
      }
    };
    if (!teams.length) {
      fetchTeams();
    }
  }, [teams, dispatch, makeRequest, token]);

  useEffect(() => {
    const fetchUsers = async () => {
      const requestData = getLimitedUsersRequestData(
        token,
        rowsPerPage,
        page + 1
      );
      const users = await makeRequest(requestData);
      dispatch(fetchedUsersList(users));
    };

    const fetchBySearch = async () => {
      const requestData = getUsersSearchRequestData(
        token,
        rowsPerPage,
        page + 1,
        debouncedSearchValue
      );
      const searchedUsers = await makeRequest(requestData);
      dispatch(fetchedUsersList(searchedUsers));
    };

    const fetchBySelectedTeam = async () => {
      let teamObj;
      if (teams.length) {
        teamObj = teams.find((team) => team.team_name === selectedTeamName);
      }
      const requestData = getUsersSelectTeamRequestData(
        token,
        rowsPerPage,
        page + 1,
        teamObj.id // petqa lini teamId
      );
      const selectedUsers = await makeRequest(requestData);
      dispatch(fetchedUsersList(selectedUsers));
    };

    if (!debouncedSearchValue && selectedTeamName === 'All') {
      fetchUsers();
    } else if (!debouncedSearchValue && selectedTeamName !== 'All') {
      console.log('fetch by Select');
      fetchBySelectedTeam();
    } else {
      console.log('fetch by Search');
      fetchBySearch();
    }
  }, [
    page,
    rowsPerPage,
    debouncedSearchValue,
    selectedTeamName,
    dispatch,
    makeRequest,
    token,
  ]);

  const usersData = useSelector((state) => state.users);
  // console.log('usersData', usersData);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <SearchBox
            value={searchValue}
            onChange={handleInputChange}
            onPageChange={handleChangePage}
          />
        </Grid>
        <Grid item xs>
          <TeamsDropDown
            teams={teams}
            onSelectChange={handleSelectedTeamChange}
          />
        </Grid>
        <Grid item xs>
          <AddUser />
        </Grid>
      </Grid>
      <UsersTable
        rows={usersData}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Users;
