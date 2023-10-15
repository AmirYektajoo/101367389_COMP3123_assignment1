const Employee = require("../models/employee");
const createEmployee = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide auth token" });
    } else {
      const { first_name, last_name, email, gender, salary } = req.body;

      const employee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });
      await employee.save();
      return res
        .status(201)
        .json({ status: true, message: "Employee created successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.eid;
  console.log(req);
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide auth token" });
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const updateEmployeeById = async (req, res) => {
  const employeeId = req.params.eid;
  const updates = req.body;
  console.log(updates, req.body);
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide auth token" });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updates,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Delete employee by ID
const deleteEmployeeById = async (req, res) => {
  const employeeId = req.query.eid;
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide auth token" });
    }
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    } else {
      res.status(204).send("Employee deleted");
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
