const Hospital = require("../model/Hospital.model");
const getDoctorsByHospitalId = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const doctors = await Doctor.find({ hospital: hospitalId });
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDoctorsByHospitalId };
