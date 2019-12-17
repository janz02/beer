import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { setLoggedIn } from 'store/auth';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {/* Button is for demo purposes */}
      <Button onClick={() => dispatch(setLoggedIn(!isLoggedIn))} type="primary">
        Logged in: {isLoggedIn ? 'true' : 'false'}
      </Button>
    </div>
  );
};

export default DashboardPage;
