import { useProtectedRoute } from '@travel-tailor/hooks'
import { WebCreateTasteForm } from '@travel-tailor/ui'
import { NextPage } from 'next'

import { authUtil } from '@/utils/auth.utils'

const CreateTastePage: NextPage = () => {
  useProtectedRoute(authUtil)

  return (
    <div>
      <h1> Create Taste</h1>
      <WebCreateTasteForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    </div>
  )
}

export default CreateTastePage
