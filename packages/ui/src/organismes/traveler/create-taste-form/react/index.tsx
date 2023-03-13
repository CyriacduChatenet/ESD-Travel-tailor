import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

interface IProps {
  setTastes: Dispatch<SetStateAction<any[]>>
  tastes: { name: string, traveler: string }[];
}

export const WebCreateTasteForm: FC<IProps> = ({ setTastes, tastes }) => {

  const [credentials, setCredentials] = useState({
    name: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTastes([...tastes, credentials])
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Name</span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Create taste" />
    </form>
  )
}
