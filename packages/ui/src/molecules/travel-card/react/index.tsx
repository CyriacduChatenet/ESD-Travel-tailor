import { ROUTES } from '@travel-tailor/constants'
import { NextLink } from '@travel-tailor/functions'
import { formatDateUtil } from '@travel-tailor/utils'
import { FC, MouseEvent } from 'react'

interface IProps {
  id: string
  departureCity: string
  destinationCity: string
  departureDate: Date
  returnDate: Date
  remove: (e: MouseEvent<HTMLButtonElement>, id: string) => void
  redirect: (travel_id: string) => void
}

export const WebTravelCard: FC<IProps> = ({
  id,
  departureCity,
  destinationCity,
  departureDate,
  returnDate,
  remove,
  redirect,
}) => {
  return (
    <NextLink href={`${ROUTES.TRAVELER.TRAVELER}/${ROUTES.TRAVELER.TRAVEL.FIND}/${id}`}>
      <div>
        <p>
          {departureCity} - {destinationCity} &nbsp;{' '}
          {formatDateUtil(departureDate, false)} -{' '}
          {formatDateUtil(returnDate, false)}
        </p>
        <button onClick={() => redirect(id)}>Edit</button>
        &nbsp; &nbsp;
        <button onClick={(e) => remove(e, id)}>Delete</button>
      </div>
    </NextLink>
  )
}
