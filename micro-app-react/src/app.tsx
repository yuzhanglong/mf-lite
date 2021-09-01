import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { globalStore } from 'base_app/global-store';
import { observer } from 'mobx-react-lite';

const App: React.FC = observer(() => {
  console.log(globalStore);
  return (
    <div>
      <Suspense fallback={null}>
        <Button variant='contained'>
          【微应用数据】
          {intl('Yzl_test_Age', {
            age: '20',
          })}
        </Button>
      </Suspense>
    </div>
  );
});

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};
