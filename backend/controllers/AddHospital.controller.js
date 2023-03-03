const Hospital = require("../model/Hospital.model");

const AddHospital = async (req, res, next) => {
  console.log("addhospital route");
  const { name, email, contact, specializations, address } = req.body;
  let exsistingHospital;
  try {
    exsistingHospital = await Hospital.findOne({ email });
  } catch (err) {
    console.error(err);
  }
  if (exsistingHospital) {
    return res.status(401).json({ message: "Hospital already exists" });
  }

  const newHospital = new Hospital({
    name,
    email,
    specializations,
    address,
    contact,
  });
  try {
    await newHospital.save();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
  return res.status(201).json({ message: newHospital });
};
module.exports = AddHospital;
