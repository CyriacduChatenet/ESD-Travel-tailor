
import { Taste } from '@travel-tailor/types';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from '@travel-tailor/functions'

interface IProps {
  setTastes: Dispatch<SetStateAction<Taste[]>>
  tastes: Taste[];
}

export const WebCreateTasteForm: FC<IProps> = ({ setTastes, tastes }) => {

  const [credentials, setCredentials] = useState<Partial<Taste>>({
    name: '',
    traveler: ''
  });
  const [errors, setErrors] = useState<Partial<Taste>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleResetTasteInput = () => {
    setCredentials({ name: '', traveler: ''});
  };

  const validate = (credentials: Partial<Taste>) => {
    if (!credentials.name) {
      setErrors({ ...errors, name: 'Name is required' });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate(credentials);
    if (error) {
      setTastes([...tastes, credentials])
      handleResetTasteInput();
    }
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
        {errors.name && <span>{errors.name}</span>}
      </label>
      <input type="submit" value="Create taste" />
    </form>
  )
}
