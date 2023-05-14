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
appointmentRouter.get("/appointments", getAppointmentsByDoctorIdWithTimeSlot);
appointmentRouter.get("/appointmentsOfPatient", getAppointmentsByPatientId);
appointmentRouter.get("/appointmentsOfHospital", getAppointmentsByHospitalId);
appointmentRouter.get("/appointmentsOfDoctor", getAppointmentsByDoctorId);
module.exports = appointmentRouter;
