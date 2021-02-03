import { useMemo, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableCell } from '@material-ui/core';
import { getReservationOnSameDate } from '../../../../utils/reservationHelper';
import { setSelectedReservations } from '../../../../store/slices/reservationsSlice';
import useStyles from './style';

const ChairTableCell = ({ date, chairName, chairId, tableId }) => {
  const reservations = useSelector(
    (state) => state.reservations.selectedReservations
  );
  const dispatch = useDispatch();
  const reservOnSameDate = getReservationOnSameDate(reservations, date.date);
  const isSelected =
    reservOnSameDate && reservOnSameDate.chairName === chairName;

  const text = useMemo(() => {
    if (date.isFree) {
      return 'free';
      // eslint-disable-next-line
    } else {
      return 'reserved';
    }
  }, [date.isFree]);

  const choseCallback = useCallback(() => {
    // eslint-disable-next-line
    if (date.isFree) {
      dispatch(
        setSelectedReservations({
          ...date,
          chairName,
          id: chairId,
          table_id: tableId,
        })
      );
    }
  }, [date, reservations]);

  const styles = useStyles();

  return (
    <TableCell
      onClick={choseCallback}
      className={` ${date.isFree ? styles.freeChair : styles.reservedChair} ${
        isSelected ? styles.selected : ''
      } `}
    >
      {text}
    </TableCell>
  );
};

export default memo(ChairTableCell);
