import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/server/config/Db";
import Transactions from "@/server/models/transactionsModel";

// Handle STK push callback
interface StkPushCallbackBody {
    Body: {
        stkCallback: {
            MerchantRequestID: string;
            CheckoutRequestID: string;
            ResultCode: string;
            ResultDesc: string;
            CallbackMetadata: {
                Item: Array<{ Name: string; Value: string | number }>;
            };
        };
    };
}


export const POST = async (req: NextRequest, { params }: { params: { Order_ID: string } }) => {
    try {
        

        // Establish the database connection
        await ConnectDB();

        // Extracting Order_ID from the route parameters
        const { Order_ID } = params;
        if (!Order_ID) {
            console.error("Order_ID is missing in route parameters");
            return NextResponse.json({
                success: false,
                message: "Order_ID is required",
            });
        }

        // Try to parse the request body
        const requestBody = await req.json();
        if (!requestBody || !requestBody.Body || !requestBody.Body.stkCallback) {
            console.error("Invalid STK Push callback format:", requestBody);
            return NextResponse.json({
                success: false,
                message: "Invalid STK Push callback format",
            });
        }

        const { Body } = requestBody as StkPushCallbackBody;
        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = Body.stkCallback;

        // Process metadata and extract relevant information
        const meta = Object.values(CallbackMetadata.Item);

        const PhoneNumber = meta.find(o => o.Name === 'PhoneNumber')?.Value?.toString() || '';
        const Amount = meta.find(o => o.Name === 'Amount')?.Value?.toString() || '';
        const MpesaReceiptNumber = meta.find(o => o.Name === 'MpesaReceiptNumber')?.Value?.toString() || '';
        const TransactionDate = meta.find(o => o.Name === 'TransactionDate')?.Value?.toString() || '';

        if (ResultCode !== '0') {
            console.error(`Transaction failed: ${ResultDesc}`);
            return NextResponse.json({
                success: false,
                message: `Transaction failed: ${ResultDesc}`,
            });
        }

        // Find subscription by Order_ID
        /* const subscription = await Subscriptions.findById(Order_ID);
        if (!subscription) {
            console.error(`No subscription found for Order_ID: ${Order_ID}`);
            return NextResponse.json({
                success: false,
                message: `No subscription found for Order_ID: ${Order_ID}`,
            });
        }

        // Calculate expiration date
        const validity = subscription.Validity;
        const expirationDate = getExpirationDate(validity); */

        // Create a new transaction record
        const newRecord = {
            Amount,
            MpesaReceiptNumber,
            PhoneNumber,
            Order_ID,
            //Validity: expirationDate,
            CheckoutRequestID,
            TransactionDate
        };

        const record = await Transactions.create(newRecord);

        return NextResponse.json({
            success: true,
            record
        });
    } catch (error) {
        console.error("Error while handling STK Push callback:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong with the callback",
            error: (error as Error).message,
        });
    }
};