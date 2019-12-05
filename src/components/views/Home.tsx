import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { setLoggedIn } from 'store/auth';

const Home: React.FC = () => {
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

export default Home;
