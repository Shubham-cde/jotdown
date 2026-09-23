import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

const getToken = () => {
  return localStorage.getItem("token");
};

/* =========================
   GET ALL NOTES
========================= */
export const getNotes = async () => {
  const token = getToken();

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* =========================
   GET TRASH NOTES
========================= */
export const getTrashNotes = async () => {
  const token = getToken();

  const res = await axios.get(`${API_URL}/trash`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* =========================
   CREATE NOTE
========================= */
export const createNote = async (noteData) => {
  const token = getToken();

  const res = await axios.post(API_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

/* =========================
   UPDATE NOTE
========================= */
export const updateNote = async (id, noteData) => {
  const token = getToken();

  const res = await axios.put(`${API_URL}/${id}`, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

/* =========================
   DELETE NOTE
========================= */
export const deleteNote = async (id) => {
  const token = getToken();

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};