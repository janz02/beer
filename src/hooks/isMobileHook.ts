import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  return useMediaQuery({
    query: '(max-device-width: 575px)',
  });
};

export default useIsMobile;
