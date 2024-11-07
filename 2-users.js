const express = require("express");
const app = express();
const PORT = 3000;

let users = [];
let userId = 1;

app.use(express.json());

app.post("/api/users", (req, res) => {
  const user = req.body;
  user.user_id = userId++;
  users.push(user);
  res.status(201).json({ message: "Pengguna berhasil ditambahkan", user_id: user.user_id });
});

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/api/users/:user_id", (req, res) => {
  const id = parseInt(req.params.user_id);
  const user = users.find((u) => u.user_id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
 });

app.put("/api/users/:user_id", (req, res) => {
  const id = parseInt(req.params.user_id);
  const userIndex = users.findIndex((u) => u.user_id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json({ message: "Pengguna berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
});

app.delete("/api/users/:user_id", (req, res) => {
  const id = parseInt(req.params.user_id);
  const userIndex = users.findIndex((u) => u.user_id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
