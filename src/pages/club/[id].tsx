import { useRouter } from 'next/dist/client/router'
import React from 'react'

interface Props {
  
}

const Club = (props: Props) => {
  // page for any kind of youth club, with their name location, contact details, members etc...
  // can be customized by the owner of the youth club
  const router = useRouter()
  const {id} = router.query
  return (
    <div>
      {id}
    </div>
  )
}

export default Club
