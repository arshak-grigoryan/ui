import { memo } from 'react';
import { Container } from '@material-ui/core';
import BackButton from '../../../../components/BackButton';
import Receipt from '../Receipt';
import useStyles from './style';

const FinalCheck = ({ handleBack }) => {
  const styles = useStyles();
  return (
    <>
      <BackButton handleEvent={handleBack} />
      <Container className={styles.tableCont}>
        <Receipt />
      </Container>
    </>
  );
};

export default memo(FinalCheck);
