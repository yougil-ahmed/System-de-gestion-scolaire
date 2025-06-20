import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ nom: "", prenom: "", email: "" });
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:3000/students");
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3000/students/${editId}`, form);
    } else {
      await axios.post("http://localhost:3000/students", form);
    }
    setForm({ nom: "", prenom: "", email: "" });
    setEditId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Student Management</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button className="bg-green-500 text-white p-2 rounded">
          {editId ? "Update" : "Add"} Student
        </button>
      </form>

      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.nom}</td>
              <td className="border p-2">{s.prenom}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(s)} className="mr-2 text-blue-500">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
