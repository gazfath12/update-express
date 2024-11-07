const express = require("express");
const app = express();
const PORT = 3000;

let employees = [];
let employeeId = 1;

app.use(express.json());

app.post("/api/employees", (req, res) => {
  const employee = req.body;
  employee.employee_id = employeeId++;
  employees.push(employee);
  res.status(201).json({ message: "Karyawan berhasil ditambahkan", employee_id: employee.employee_id });
});

app.get("/api/employees", (req, res) => {
  res.status(200).json(employees);
});

app.get("/api/employees/:employee_id", (req, res) => {
  const id = parseInt(req.params.employee_id);
  const employee = employees.find((e) => e.employee_id === id);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
});

app.put("/api/employees/:employee_id", (req, res) => {
  const id = parseInt(req.params.employee_id);
  const employeeIndex = employees.findIndex((e) => e.employee_id === id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    res.status(200).json({ message: "Karyawan berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
});

app.delete("/api/employees/:employee_id", (req, res) => {
  const id = parseInt(req.params.employee_id);
  const employeeIndex = employees.findIndex((e) => e.employee_id === id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.status(200).json({ message: "Karyawan berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
