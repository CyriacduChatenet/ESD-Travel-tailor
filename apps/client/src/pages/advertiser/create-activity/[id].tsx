import { NextPage } from 'next'
import { useState } from 'react'
import { WebCreateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'

const CreateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  const [tags, setTags] = useState<any[]>([]);

  const handleDelete = (name : string) => {
    setTags(tags.filter((tag) => tag.name !== name));
  };

  return (
    <Layout>
      <h1>Create activity</h1>
      <WebCreateActivityForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} setTags={setTags} tags={tags} />
      <br />
      <br />
      {tags.map((tag, index) => <div key={index}>
        <p>{tag.name}</p>
        <button onClick={() => handleDelete(tag.name)}>Delete</button>
      </div>)}
    </Layout>
  )
}

export default CreateActivity
