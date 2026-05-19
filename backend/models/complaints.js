import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    name: String,
    postalcode: Number,
    prsdeshiya_sabha_related: String,
});

let Complaint = mongoose.model("complaints", complaintSchema);

export default Complaint;