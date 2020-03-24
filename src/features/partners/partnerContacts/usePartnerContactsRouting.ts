import { useEffect, useState } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'

interface UsePartnerContactsRoutingProps {}
interface UsePartnerContactsRoutingUtils {}
export const usePartnerContactsRouting = (
  props: UsePartnerContactsRoutingProps
): UsePartnerContactsRoutingUtils => {
  const {} = props

  const { partnerId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)

  return {}
}
