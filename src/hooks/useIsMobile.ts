import { useMediaQuery } from 'react-responsive'

/**
 * Checks if the viewport is smaller than 575px
 * @returns true if it's small
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery({
    query: '(max-device-width: 575px)'
  })
}
