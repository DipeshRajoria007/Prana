const express = require("express");
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointmentsByHospitalId,
  getAppointmentsByDoctorIdWithTimeSlot,
} = require("../controllers/Appointment.controller");
const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.delete("/:id", deleteAppointment);
appointmentRouter.get(
  "/appointments/:doctor/:date",
  getAppointmentsByDoctorIdWithTimeSlot
);
appointmentRouter.get("/appointmentsOfPatient/:id", getAppointmentsByPatientId);
appointmentRouter.get(
  "/appointmentsOfHospital/:id",
  getAppointmentsByHospitalId
);
appointmentRouter.get("/appointmentsOfDoctor/:id", getAppointmentsByDoctorId);
appointmentRouter.delete("/:id", deleteAppointment);
module.exports = appointmentRouter;
