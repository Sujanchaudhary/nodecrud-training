// Import the Appointment model
const db = require("../models");
const Appointment = db.appointment;

// Create a new Appointment
exports.createAppointment = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.description) {
    res.status(400).send({ message: "Date and description cannot be empty!" });
    return;
  }

  // Create an Appointment
  const appointment = {
    date: req.body.date,
    description: req.body.description,
  };

  // Save Appointment in the database
  Appointment.create(appointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment."
      });
    });
};

// Retrieve all Appointments from the database
exports.findAllAppointments = (req, res) => {
  Appointment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};

// Find a single Appointment with an id
exports.findOneAppointment = (req, res) => {
  const id = req.params.id;

  Appointment.findByPk(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Appointment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Appointment with id=" + id });
    });
};

// Update an Appointment by the id in the request
exports.updateAppointment = (req, res) => {
  const id = req.params.id;

  Appointment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Appointment was updated successfully." });
      } else {
        res.send({ message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Appointment with id=" + id });
    });
};

// Delete an Appointment with the specified id in the request
exports.deleteAppointment = (req, res) => {
  const id = req.params.id;

  Appointment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Appointment was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Appointment with id=" + id });
    });
};

// Delete all Appointments from the database
exports.deleteAllAppointments = (req, res) => {
  Appointment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Appointments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointments."
      });
    });
};
