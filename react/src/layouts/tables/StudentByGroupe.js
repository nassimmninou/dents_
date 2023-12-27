import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistiques = () => {
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState({
    id: null,
    code: "",
    year: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const url = "http://localhost:8080/api/v1/groupes";
  const url1 = "http://localhost:8080/api/v1/students/groupe";

  const fetchMajors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const response = await axios.get(`${url1}/${major.id}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleMajor = (e) => {
    const selectedMajor = majors.find(
      (m) => m.id === parseInt(e.target.value, 10)
    );
    setMajor(selectedMajor || { id: null, code: "", year: "" });
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  useEffect(() => {
    if (major.id !== null) {
      fetchStudents();
    }
  }, [major.id]);

  return (
    <div className="font-body w-1/3">
      {!loading ? (
        <div className="flex flex-col items-center w-full">
          <select
            className="flex text-gray-700 outline-none border-indigo-300 border py-3 pl-4 rounded-xl focus:ring-1 w-full m-3"
            onChange={handleMajor}
          >
            <option className="text-gray-700">Select groupe</option>
            {majors.map((m) => (
              <option key={m.id} value={m.id}>
                {m.year}
              </option>
            ))}
          </select>
          {!loadingStudents ? (
            students.length === 0 ? (
              <p>No data to display</p>
            ) : (
              <div className="border rounded-xl text-lg p-5 text-gray-700 rounded-xl w-full bg-white bg-opacity-70">
                <div className="flex items-center mb-2 bg-gray-100 p-1">
                  <span className="text-center font-semibold text-gray-900 w-1/5">
                    id
                  </span>
                  <span className="text-center font-semibold text-gray-900 w-2/5">
                    firstName
                  </span>
                  <span className="text-center font-semibold text-gray-900 w-2/5">
                    lastName
                  </span>
                </div>
                {students.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center mb-1 border-b w-full"
                  >
                    <span className="text-center w-1/5">{s.id}</span>
                    <span className="text-center w-2/5">{s.firstName}</span>
                    <span className="text-center w-2/5">{s.lastName}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <span>Loading students...</span>
          )}
        </div>
      ) : (
        <p>Loading majors...</p>
      )}
    </div>
  );
};

export default Statistiques;
