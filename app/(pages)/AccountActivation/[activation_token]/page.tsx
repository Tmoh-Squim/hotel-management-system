"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SellerActivationPage = () => {
  const { activation_token } = useParams<{ activation_token: string }>(); // Ensure type safety
  const [error, setError] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
         const response = await axios.post(`/api/auth/activation`, { activation_token });
         if(response.data.success === false){
          setError(true);
          setMessage(response.data.message)
         }else{
          setMessage(response.data.message)
         }
        } catch {
          setError(true);
        }
      };
      sendRequest();
    }
  }, [activation_token]); // Add activation_token as a dependency

  return (
    <div className="flex items-center justify-center h-screen">
      {error ? <p className="text-red-400 text-xl">{message}</p> : <p className="text-xl text-blue-500">{message} </p>}
    </div>
  );
};

export default SellerActivationPage;
