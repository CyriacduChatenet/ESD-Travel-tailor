import { useDispatch, useSelector } from "react-redux";
import { CreateAdvertCredentials } from "@/setup/types/advert.type";
import { create, remove, selectAdverts, refreshFromAPI } from "@/setup/redux/slices/adverts/advert.slice";
import { createSingle, selectAdvertSingle } from "@/setup/redux/slices/adverts/advertSingle.slice";

export class AdvertService {
  dispatch = useDispatch();
  adverts= useSelector(selectAdverts)
  advertSingle = useSelector(selectAdvertSingle);

  public async findAll() {
      try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advert`)
          const responseJSON = await response.json();
          this.dispatch(refreshFromAPI(responseJSON));
      } catch (err) {
          console.error(err);
      }
  }
  
  public async findOne(id: string) {
      try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advert/${id}`)
          const responseJSON = await response.json();
          this.dispatch(createSingle(responseJSON));
      } catch (err) {
          console.error(err);
      }
  }

  public async create(credentials: CreateAdvertCredentials) {
      try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advert`, {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify(credentials)
          });
          const responseJSON = await response.json();
          this.dispatch(create(responseJSON));
      } catch (err) {
          console.error(err);
      }
  };

  public async update(id: string, credentials: CreateAdvertCredentials) {
      try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advert/${id}`, {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              method: 'PATCH',
              body: JSON.stringify(credentials)
          });
          const responseJSON = await response.json();
          return responseJSON;
      } catch (err) {
          console.error(err);
      }
  }

  public async delete(id: string) {
      try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advert/${id}`, {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              method: 'DELETE'
          });
          const responseJSON = await response.json();
          this.dispatch(remove(id));
          this.findAll();
          return responseJSON;
      } catch (err) {
          console.error(err);
      }
  }
}
