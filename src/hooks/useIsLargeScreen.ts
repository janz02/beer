import { useMediaQuery } from 'react-responsive'

/**
 * Checks if the viewport is smaller than 992px
 * @returns true if it's smaller
 */
export const useIsLargeScreen = (): boolean => {
  return useMediaQuery({
    query: '(max-device-width: 992px)'
  })
}
