
import { useEffect, useState } from "react";
import { getHistory } from "../api/historyApi";
import { useNavigate } from "react-router-dom";

interface Analysis {
  id: number;
  resume_name: string;
  ats_score: number;
  recruiter_verdict: string;
  created_at: string;
}

export default function History() {
    console.log("History component loaded");
    const [history, setHistory] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analysis History</h1>

      <button
        onClick={() => navigate("/upload")}
        style={{ marginBottom: "20px" }}
      >
        ← Back
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No analyses found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Resume
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                ATS Score
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Verdict
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.resume_name}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.ats_score}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.recruiter_verdict}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}