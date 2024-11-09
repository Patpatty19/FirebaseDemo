import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setFormData(snapshot.data());
      } else {
        console.error("Article not found");
        navigate('/');
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const ref = doc(db, 'articles', id);
    try {
      await updateDoc(ref, formData);
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  if (isLoading) return <p>Loading article...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Edit Article</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
        <label style={{ fontWeight: 'bold' }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a new title"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author's name"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter article description"
          rows="4"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
        />

        <button
          onClick={handleSave}
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
