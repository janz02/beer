import { useMediaQuery } from 'react-responsive'

const useIsMobile = (): boolean => {
  return useMediaQuery({
    query: '(max-device-width: 575px)'
  })
}

export default useIsMobile
