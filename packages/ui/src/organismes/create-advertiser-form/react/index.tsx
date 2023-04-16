import { OBJECT_KEYS, ROUTES } from '@travel-tailor/constants'
import { AdvertiserService, TokenService, UserService } from '@travel-tailor/services'
import { CreateAdvertiserDTO } from '@travel-tailor/types'
import { ChangeEvent, FC, FormEvent, MouseEvent, useState, useRouter } from '@travel-tailor/functions'
import mapboxgl from 'mapbox-gl'

import Geocoder from '../../../atoms/geocoder/react'
import { WebInputLabel } from '../../../atoms/input-label/react'

interface IProps {
  api_url: string
  mapboxAccessToken: string;
}

export const WebCreateAdvertiserForm: FC<IProps> = ({ api_url, mapboxAccessToken }) => {
  const router = useRouter()

  const userId = router.query.id

  const [credentials, setCredentials] = useState<CreateAdvertiserDTO>({
    name: '',
    user: String(userId),
    location: '',
  })
  const [results, setResults] = useState<mapboxgl.MapboxGeoJSONFeature[]>([]);
  const [hideAutocomplete, setHideAutocomplete] = useState(true);
  const [geocoderQuery, setGeocoderQuery] = useState('')
  const [errors, setErrors] = useState<Partial<CreateAdvertiserDTO>>({
    name: '',
    location: '',
  })

  const [submitError, setSubmitError] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, location: e.currentTarget.innerText })
    setGeocoderQuery(e.currentTarget.innerText);
  }

  const validate = (credentials: Partial<CreateAdvertiserDTO>) => {
    if (!credentials.name) {
      setErrors({ ...errors, name: 'Name is required' })
      return false
    }
    if (!credentials.location) {
      setErrors({ ...errors, location: 'Location is required' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(credentials)

    if (error) {
      const advertiser = await AdvertiserService.createAdvertiser(
        api_url,
        credentials,
        setSubmitError
      )
      if(advertiser.id) {
        await UserService.updateUser(`${api_url}`, String(userId), { advertiser: advertiser.id }, setSubmitError)
        TokenService.removeSigninToken();
        return router.push(`${ROUTES.ADVERTISER.PAYMENT}/${advertiser.id}`)
      }
    }
  }

  return (
    <form action="" onSubmit={handleSubmit} onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
      <WebInputLabel type={'text'} name={'name'} placeholder={'Name'} onChange={() => handleChange} error={errors.name}/>
      <label htmlFor="">
        <span>Location</span>
        <Geocoder setResults={setResults} accessToken={mapboxAccessToken} geocoderQuery={geocoderQuery} setGeocoderQuery={setGeocoderQuery} placeholder={OBJECT_KEYS.LOCATION}/>
        <br />
        {!hideAutocomplete ? results.map((result: any) => <p key={result.id} onClick={handleClick}>{result.place_name}</p>) : null}
        <br />
        {errors.location && <p>{errors.location}</p>}
      </label>
      <input type="submit" value="Create advertiser" />
    </form>
  )
}
