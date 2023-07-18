import { PictureService } from "@travel-tailor/services";
import { Picture } from "@travel-tailor/types";
import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

export const Carousel: FC = () => {
  const [data, setData] = useState<Picture>({
    city: "Bordeaux",
    picture_url: "https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  });
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await PictureService.findPicture(process.env.NEXT_PUBLIC_API_URL as string, setError);
      setData(response);
      setShow(true);
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  }, []);
  
  return (
    <section className="w-full h-96 relative">
      <CSSTransition
        in={show}
        timeout={1000}
        classNames="fade"
        onEntered={() => setShow(false)}
      >
        <div
          className={`w-full h-96 z-20 bg-cover bg-center blur-[1px]`}
          style={{ backgroundImage: `url(${data.picture_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        ></div>
      </CSSTransition>
      <div className="absolute bottom-0 left-0">
        <span className="text-white text-4xl font-bold uppercase pl-6">
          {data.city}
        </span>
      </div>
    </section>
  );
};