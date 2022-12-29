// import { GoogleLogin } from '@react-oauth/google';
// import React from 'react';

// const clientId =
// 158243647020-3sfalldah686savtd37a2v63705u0vkr.apps.googleusercontent.com;

// const GoogleButton = ({onSocial}) => {
    
//     const onSuccess = async(response) => {
//     	console.log(response);
    
//         const { googleId, profileObj : { email, name } } = response;
        
//         await onSocial({
//             socialId : googleId,
//             socialType : 'google',
//             email,
//             nickname : name
//         });
//     }

//     const onFailure = (error) => {
//         console.log(error);
//     }

//     return (
//         <div>
//             <GoogleLogin
//                 clientId={clientId}
//                 buttonText="구글로 로그인"
//                 responseType={"id_token"}
//                 onSuccess={onSuccess}
//                 onFailure={onFailure}/>
//         </div>
//     );
// };

// export default GoogleButton;