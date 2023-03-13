import { useProtectedRoute } from '@travel-tailor/hooks'
import { WebCreateTasteForm } from '@travel-tailor/ui'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { TasteService, TravelerService } from '@travel-tailor/services'
import { ROUTES } from '@travel-tailor/constants'

import { authUtil } from '@/utils/auth.utils'

const CreateTastePage: NextPage = () => {
  useProtectedRoute(authUtil);
  const router = useRouter();

  const [tastes, setTastes] = useState<{ name: string, traveler: string }[]>([]);

  const travelerId = router.query.id;

  const handleDelete = (name : string) => {
    setTastes(tastes.filter((taste) => taste.name !== name));
  };

  const handleSubmit = async () => {
    TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}`, tastes, `${travelerId}`)
    return router.push(ROUTES.SIGNIN);
  };

  return (
    <div>
      <h1> Create Taste</h1>
      <WebCreateTasteForm tastes={tastes} setTastes={setTastes} />
      <br />
      <br />
      <p>Tastes</p>
      {tastes.map((taste, index) => <div key={index}>
        <p>{taste.name}</p>
        <button onClick={() => handleDelete(taste.name)}>Delete</button>
      </div>)}
      <br />
      <br />
      <button onClick={() => handleSubmit()}>Add tastes</button>
    </div>
  )
}

export default CreateTastePage
