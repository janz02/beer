import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import PrivateLayout from 'components/PrivateLayout';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import PrivateRoute, { SELECT } from './PrivateRoute';
import { shallow } from 'enzyme';

// interface PrivateRouteProps extends RouteProps {}

// const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
//   const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

//   if (!loggedIn) {
//     return <Redirect to={{ pathname: '/auth' }} />
//   }

//   return (
//     <PrivateLayout>
//       <Route {...props} />
//     </PrivateLayout>
//   );
// };

// export default PrivateRoute;

describe('PrivateRoute tests', () => {

  const setup = (loggedIn: boolean): {} => {

    jest.mock("react-redux", () => ({
      useSelector: jest.fn(fn => fn()),
      useDispatch: () => jest.fn()
    }));

    jest.spyOn(SELECT, "login").mockReturnValue(loggedIn);

    return {};
  };

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('should redirect when user is logged out', () => {
    
    // Arrange
    const props = setup(false);

   
    // Act
    const wrapper = shallow(<PrivateRoute {...props}/>);

    // Assert
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
})