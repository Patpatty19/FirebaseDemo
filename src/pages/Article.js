import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", description: "" });

  useEffect(() => {
    const ref = doc(db, "articles", urlId);
    getDoc(ref).then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setArticle(data);
        setFormData({ title: data.title, author: data.author, description: data.description });
      }
    });
  }, [urlId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const ref = doc(db, "articles", urlId);
    await updateDoc(ref, formData);
    setArticle(formData);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id} style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a new title"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontWeight: "bold" }}>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author's name"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontWeight: "bold" }}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter article description"
                rows="4"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                }}
              />

              <button
                onClick={handleSaveClick}
                style={{
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{article.title}</h2>
              <p>By {article.author}</p>
              <p>{article.description}</p>
              <button
                onClick={handleEditClick}
                style={{
                  padding: "10px",
                  backgroundColor: "#008CBA",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
