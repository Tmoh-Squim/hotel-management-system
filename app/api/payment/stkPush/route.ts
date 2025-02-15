import { ConnectDB } from "@/server/config/Db";
import { ConfirmPayment } from "@/server/confirmMpesaPayment/route";
import { getAccessToken } from "@/server/middlewares/LipaNaMpesaAccessToken";
import { getTimestamp } from "@/server/utils/timestamp";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const safaricom_access_token = await getAccessToken();

        const { phone, Order_ID } = body;
        if(!phone || ! Order_ID){
            return NextResponse.json({
                success: false,
                message:"All fields are required"
            }, { status: 401 });
        }
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + safaricom_access_token;
        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE! + process.env.PASS_KEY + timestamp).toString('base64');
        await ConnectDB();
       /*  const plan = await Subscription.findById(Order_ID);
        if(!plan){
            return NextResponse.json({
                success: false,
                message:"Plan not found"
            }, { status: 401 });
        }
        const amount = plan?.amount; */
        const amount = 200;

        // Prepare the STK push request
        const response = await axios.post(url, {
            BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone,
            PartyB: process.env.BUSINESS_SHORT_CODE,
            PhoneNumber: phone,
            CallBackURL:  `https://wifi-magement-system.vercel.app/api/stkPushCallback/${Order_ID}`,
            AccountReference: "squim's e-commerce shop",
            TransactionDesc: "Paid online"
        }, {
            headers: {
                "Authorization": auth
            }
        });
        /* https://stk-push.onrender.com/api/stkPushCallback/${Order_ID} */
        /* https://wifi-magement-system.vercel.app/api/stkPushCallback/?Order_ID=${Order_ID} */
        const CheckoutRequestID = response.data.CheckoutRequestID
        const res = await ConfirmPayment(CheckoutRequestID,phone,Order_ID);

        return NextResponse.json({success:true,data:res});
    } catch (e) {
        // Return an error response
        return NextResponse.json({
            success: false,
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: (e as Error).message,
        }, { status: 503 });
    }
};