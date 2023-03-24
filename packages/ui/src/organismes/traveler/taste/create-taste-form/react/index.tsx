
import { CreateTasteDTO, Taste } from '@travel-tailor/types';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

interface IProps {
  setTastes: Dispatch<SetStateAction<Taste[]>>
  tastes: Taste[];
}

export const WebCreateTasteForm: FC<IProps> = ({ setTastes, tastes }) => {

  const [credentials, setCredentials] = useState<Partial<Taste>>({
    name: '',
    traveler: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleResetTasteInput = () => {
    setCredentials({ name: '', traveler: ''});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTastes([...tastes, credentials])
    handleResetTasteInput();
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Name</span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Create taste" />
    </form>
  )
}
