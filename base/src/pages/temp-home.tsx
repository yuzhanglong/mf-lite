import { Button, TablePagination} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';
import React from 'react';


const useStyles = makeStyles({
  homeButton: {
    marginTop: '10px !important',
    marginBottom: '10px !important',
  },
});

const TempHome: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Button variant='contained' className={classes.homeButton}>
        {intl('Yzl_test_Name', {
          name: 'yuzhanglong',
        })}
      </Button>
      <TablePagination
        count={2000}
        rowsPerPage={10}
        page={1}
        component='div'
        onPageChange={() => {
        }}
      />
    </div>
  );
};

export default observer(TempHome);
