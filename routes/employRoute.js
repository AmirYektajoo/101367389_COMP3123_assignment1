const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const {
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require("../controllers/employControler");

router.post("/employees", protect, createEmployee);
router.get("/employees/:eid", protect, getEmployeeById);

router.put("/employees/:eid", protect, updateEmployeeById);

router.delete("/employees", protect, deleteEmployeeById);

module.exports = router;
