const Appointment = require("../model/Appointment.model");

exports.createAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  try {
    const savedAppointment = await appointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "patient doctor hospital"
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAppointmentsByDoctorIdWithTimeSlot = async (req, res) => {
  try {
    const { doctor, date } = req.query;

    // Parse the date string into a Date object
    const appointmentDate = new Date(date);

    // Find appointments for the given doctor ID and date
    const appointments = await Appointment.find({
      doctorId: doctor,
      date: {
        $gte: new Date(appointmentDate.setHours(00, 00, 00)),
        $lt: new Date(appointmentDate.setHours(23, 59, 59)),
      },
    });

    // Send the appointments as a response
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments" });
  }
};
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctor } = req.query;

    // Find appointments for the given doctor ID and date
    const appointments = await Appointment.find({
      doctor,
    });

    // Send the appointments as a response
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments" });
  }
};
exports.getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patient } = req.query;

    // Find appointments for the given doctor ID and date
    const appointments = await Appointment.find({
      patient,
    });

    // Send the appointments as a response
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments" });
  }
};
exports.getAppointmentsByHospitalId = async (req, res) => {
  try {
    const { hospital } = req.query;

    // Find appointments for the given Hospital ID and date
    const appointments = await Appointment.find({
      hospital,
    });

    // Send the appointments as a response
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments" });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient doctor hospital"
    );
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    await appointment.remove();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
