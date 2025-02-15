import mongoose, { models } from "mongoose";

const MpesaTransactionSchema = new mongoose.Schema({
    PhoneNumber:{
        type:String,
        required:true
    },
    Amount:{
        type:String,
        required:true
    },
    CheckoutRequestID:{
        type:String,
        required:true
    },
    MpesaReceiptNumber:{
        type:String,
        required:true
    },
    TransactionDate:{
        type:String
    }
},{timestamps:true})

const Transactions = models.Transactions || mongoose.model("Transactions",MpesaTransactionSchema)
export default Transactions