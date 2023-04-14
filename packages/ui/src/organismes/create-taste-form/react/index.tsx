
import { Taste } from '@travel-tailor/types';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from '@travel-tailor/functions'
import { useMemo } from 'react';
import { useFetch } from '@travel-tailor/hooks';

interface IProps {
  setTastes: Dispatch<SetStateAction<Taste[]>>
  tastes: Taste[];
  api_url: string;
}

export const WebCreateTasteForm: FC<IProps> = ({ setTastes, tastes, api_url }) => {

  const [credentials, setCredentials] = useState<Partial<Taste>>({
    name: '',
    traveler: ''
  });
  const [data, setData] = useState<Taste[]>([]);
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

  const handleFetch = async () => {
    const response = await useFetch.get(`${api_url}/taste?name=${credentials.name}`);
    setData(response.data);
  };

  useMemo(() => {
    handleFetch();
  }, [credentials]);

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
      <div>
        {data ? data?.map((taste: Taste, index: number) => <div key={index}>
          <p onClick={() => setCredentials({...credentials, name: taste.name})}>{taste.name}</p>
        </div>) : null}
      </div>
      <input type="submit" value="Create taste" />
    </form>
  )
}
