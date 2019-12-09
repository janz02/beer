import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import { setLoggedIn } from 'features/auth/authSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  return (
    <div>
      {/* Button is for demo purposes */}
      <Button
        onClick={() => dispatch(setLoggedIn({ loggedIn: !loggedIn }))}
        type="primary"
      >
        Logged in: {loggedIn ? 'true' : 'false'}
      </Button>
    </div>
  );
};

export default HomePage;
