
import { Taste } from '@travel-tailor/types';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from '@travel-tailor/functions'
import { WebInputLabel } from '../../../atoms/input-label/react';

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
    <form action="" onSubmit={handleSubmit} id='create-taste-form'>
      <WebInputLabel type={'text'} name={'name'} placeholder={'Name'} onChange={ handleChange} value={credentials.name} error={errors.name} className='create-taste-name' />
      <input type="submit" value="Create taste" />
    </form>
  )
}
