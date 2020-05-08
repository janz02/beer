import { useMediaQuery } from 'react-responsive'

export const useIsMobile = (): boolean => {
  return useMediaQuery({
    query: '(max-device-width: 575px)'
  })
}
