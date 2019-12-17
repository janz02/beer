import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from 'features/auth/authSlice';
import { RootState } from 'app/rootReducer';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoggedIn: loggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {/* Button is for demo purposes */}
      <Button onClick={() => dispatch(setLoggedIn(!loggedIn))} type="primary">
        Logged in: {loggedIn ? 'true' : 'false'}
      </Button>
    </div>
  );
};

export default DashboardPage;
