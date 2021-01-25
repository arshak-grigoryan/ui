import { TableRow, TableCell } from '@material-ui/core';
import DeleteRow from '../Delete';
import EditRow from '../EditRow';

const TeamRow = ({ name, membersCount, tablesCount, id }) => (
  <TableRow key={name}>
    <TableCell component="th" scope="row">
      {name}
    </TableCell>
    <TableCell align="center">{membersCount}</TableCell>
    <TableCell align="center">{tablesCount}</TableCell>
    <TableCell align="right">
      <EditRow id={id} />
      <DeleteRow id={id} name={name} membersCount={membersCount} />
    </TableCell>
  </TableRow>
);

export default TeamRow;
