import { NextResponse } from "next/server";

import { getTimestamp } from "../utils/timestamp";
import { ConnectDB } from "../config/Db";
import { getAccessToken } from "../middlewares/LipaNaMpesaAccessToken";

// Define a type for the expected response from the STK Push Query API
interface StkPushResponse {
    ResponseCode: any;
    errorMessage: string;
    status: number;
    ResultCode: string;
    ResultDesc: string;
}

function getExpirationDate(validity: string): Date {
    let hoursToAdd = 0;

    switch (validity) {
        case "1 hour": hoursToAdd = 1; break;
        case "6 Hours": hoursToAdd = 6; break;
        case "12 Hours": hoursToAdd = 12; break;
        case "1 Day": hoursToAdd = 24; break;
        case "1 Week": hoursToAdd = 24 * 7; break;
        case "1 Month": hoursToAdd = 24 * 30; break;
        default: throw new Error("Invalid validity");
    }

    const expirationTimestamp = Date.now() + hoursToAdd * 60 * 60 * 1000;
    return new Date(expirationTimestamp);
}

export const ConfirmPayment = async (CheckoutRequestID: string, phoneNumber: string, planId: string): Promise<Object> => {
    try {
        if (!CheckoutRequestID || !planId) {
            return NextResponse.json({
                success: false,
                msg: 'All fields are required!',
            });
        }
        await ConnectDB();

       /*  const plan = await Subscription.findById(planId);
        if (!plan) {
            return NextResponse.json({
                success: false,
                msg: 'Plan not found!',
            });
        } */

        // Confirm payment
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
        const safaricom_access_token = await getAccessToken();
        const auth = "Bearer " + safaricom_access_token;
        const timestamp = getTimestamp();
        const password = Buffer.from(`${process.env.BUSINESS_SHORT_CODE}${process.env.PASS_KEY}${timestamp}`).toString('base64');

        // Make the request to Safaricom's API using fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
                Password: password,
                Timestamp: timestamp,
                CheckoutRequestID: CheckoutRequestID,
            }),
        });

        const responseData: StkPushResponse = await response.json();

        if (responseData && responseData.ResponseCode) {
            return responseData;
        } else {
            return await ConfirmPayment(CheckoutRequestID, phoneNumber, planId);
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            msg: "Something went wrong while trying to confirm the payment. Contact admin",
            error: (error as Error).message
        });
    }
};