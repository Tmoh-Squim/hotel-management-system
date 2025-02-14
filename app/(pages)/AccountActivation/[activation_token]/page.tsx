"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SellerActivationPage = () => {
  const { activation_token } = useParams<{ activation_token: string }>(); // Ensure type safety
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      if (activation_token) {
        const sendRequest = async () => {
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
          } catch {
            setError(true);
          }
        };
        sendRequest();
      }
    } catch (error) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  }, [activation_token]); // Add activation_token as a dependency

  return (
    <div className="flex items-center justify-center h-screen">
      {!loading ? (
        error ? (
          <p className="text-red-400 text-xl">{message}</p>
        ) : (
          <p className="text-xl text-blue-500">{message} </p>
        )
      ) : (
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      )}
    </div>
  );
};

export default SellerActivationPage;
