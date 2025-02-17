"use client";
import Loader from "@/app/components/Loader";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SellerActivationPage = () => {
  const { activation_token } = useParams<{ activation_token: string }>(); // Ensure type safety
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      if (!activation_token) return;

      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.post(`/api/auth/activation`, {
          activation_token,
        });

        if (response.data.success === false) {
          setError(true);
          setMessage(response.data.message);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        setError(true);
        setMessage("Something went wrong");
      } finally {
        setLoading(false); // Set loading to false after request is completed
      }
    };

    sendRequest(); // Call the async function inside useEffect
  }, [activation_token]);
  useEffect(()=>{
    console.log('first',loading)
  },[loading])

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
    <div className={`animate-spin  h-15 w-15 border-4 border-blue-500 border-t-transparent rounded-full`}></div>
  ) : error ? (
        <p className="text-red-400 text-xl">{message}</p>
      ) : (
       <div>
         <p className="text-xl text-blue-400 my-2 ">{message}</p>
         <p className="text-center text-xl">Proceed to <Link href="/Login" className="text-blue-500 mx-1">Login</Link></p>
       </div>
      )}
    </div>
  );
};

export default SellerActivationPage;
