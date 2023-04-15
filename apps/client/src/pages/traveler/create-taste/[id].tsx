import { useProtectedRoute, useTravelerProtectedRoute } from '@travel-tailor/hooks'
import { WebCreateTasteForm } from '@travel-tailor/ui'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { TasteService, TokenService } from '@travel-tailor/services'
import { ROUTES } from '@travel-tailor/constants'
import { authUtil } from '@travel-tailor/utils'
import { Taste } from '@travel-tailor/types'

const CreateTastePage: NextPage = () => {
  useProtectedRoute(authUtil);
  useTravelerProtectedRoute(authUtil);
  
  const router = useRouter();

  const [tastes, setTastes] = useState<Taste[]>([]);
  const [submitError, setSubmitError] = useState({});

  const travelerId = router.query.id;

  const handleDelete = (name : string) => {
    setTastes(tastes.filter((taste) => taste.name !== name));
  };

  const handleSubmit = async () => {
    TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}`, tastes, `${travelerId}`, setSubmitError)
    TokenService.removeSigninToken();
    return router.push(ROUTES.AUTH.SIGNIN);
  };

  return (
    <div>
      <h1> Create Taste</h1>
      <WebCreateTasteForm tastes={tastes} setTastes={setTastes} />
      <br />
      <br />
      <p>Tastes</p>
      {tastes.map((taste: Taste, index: number) => <div key={index}>
        <p>{taste.name}</p>
        <button onClick={() => handleDelete(`${taste.name}`)}>Delete</button>
      </div>)}
      <br />
      <br />
      <button onClick={() => handleSubmit()}>Add tastes</button>
    </div>
  )
}

export default CreateTastePage
