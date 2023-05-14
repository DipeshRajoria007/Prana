const Patient = require("../model/Patient.model");

const getMonthlyAppointmentCount = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const followUps = patient.history.reduce((acc, history) => {
      history.followups.forEach((followup) => {
        const month = new Date(followup.date).getMonth();
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month]++;
      });
      return acc;
    }, {});

    const histories = patient.history.reduce((acc, history) => {
      const month = new Date(history.createdAt).getMonth();
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {});

    const monthlyAppointmentCount = {};

    for (let i = 0; i < 12; i++) {
      monthlyAppointmentCount[i] = followUps[i] ? followUps[i] : 0;
      if (histories[i]) {
        monthlyAppointmentCount[i] += histories[i];
      }
    }

    res.status(200).json({ monthlyAppointmentCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getMonthlyAppointmentCount };
