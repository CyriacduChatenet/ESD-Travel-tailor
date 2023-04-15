import { AuthService } from "@travel-tailor/services";
import { GoogleAuthLogin } from "@travel-tailor/functions";
import { FC, useState } from "react";

interface IProps {
    api_url: string;
}

export const WebGoogleAuthButton: FC<IProps> = ({ api_url }) => {
  const [submitError, setSubmitError] = useState({});

    const handleGoogleFetch = async (value: { accessToken: string }) => {
        await AuthService.signinWithGoogle(api_url,value, setSubmitError)
      }
    
      const responseGoogle = (response: any) => {
        console.log(response);
        handleGoogleFetch(response);
      }  

    return (
        <GoogleAuthLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        buttonText=""
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
};