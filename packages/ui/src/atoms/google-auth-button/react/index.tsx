import { AuthService } from "@travel-tailor/services";
import { GoogleAuthLogin } from "@travel-tailor/functions";
import { FC } from "react";

interface IProps {
    api_url: string;
}

export const WebGoogleAuthButton: FC<IProps> = ({ api_url }) => {
    const handleGoogleFetch = async (value: any) => {
        await AuthService.signinWithGoogle(api_url,value)
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