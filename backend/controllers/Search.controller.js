const Patient = require("../model/Patient.model");

const searchPatient = async (req, res) => {
  const searchTerm = req.query.q;
  console.log(searchTerm);

  try {
    const patients = await Patient.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { uniqueHealthId: { $regex: searchTerm, $options: "i" } },
        { aadhaarNumber: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.status(201).json(patients);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while searching for patients" });
  }
};
module.exports = { searchPatient };
