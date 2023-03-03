const Hospital = require("../model/Hospital.model");

const GetHospital = async (req, res, next) => {
  console.log("GetHospital route");
  let Hospitals;
  //   try {
  //     Hospitals.
  //   } catch (error) {
  //    console.log(error.message)
  //   }
  return res.status(201).json({ message: newHospital });
};
module.exports = GetHospital;
