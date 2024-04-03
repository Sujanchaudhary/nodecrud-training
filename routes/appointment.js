const express = require("express");
const router = express.Router();
const appointments = require("../controllers/appointmentController");
const { checkTokenAndRole } = require("../middlewares/checkToken");

// Create a new Appointment
router.post("/", checkTokenAndRole("user"), appointments.createAppointment);

// Retrieve all Appointments
router.get("/", checkTokenAndRole("user"), appointments.findAllAppointments);

// Retrieve a single Appointment with id
router.get("/:id", checkTokenAndRole("user"), appointments.findOneAppointment);

// Update a Appointment with id
router.put("/:id", checkTokenAndRole("user"), appointments.updateAppointment);

// Delete a Appointment with id
router.delete(
  "/:id",
  checkTokenAndRole("user"),
  appointments.deleteAppointment
);

// Delete all Appointments
router.delete(
  "/",
  checkTokenAndRole("user"),
  appointments.deleteAllAppointments
);

module.exports = router;
