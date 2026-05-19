import Complaint from "../models/complaints.js";

// GET all complaints
export function getComplaints(req, res) {
    Complaint.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to fetch complaints" });
        });
}

// POST a new complaint
export function postComplaints(req, res) {
    const complaintData = req.body;
    const complaint = new Complaint(complaintData);

    complaint
        .save()
        .then(() => {
            res.json({ message: "Complaint saved successfully" });
        })
        .catch(() => {
            res.status(500).json({ message: "Complaint saving failed" });
        });
}