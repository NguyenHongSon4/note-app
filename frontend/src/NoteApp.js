import React, { useState, useEffect } from 'react';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Gọi API GET khi component render lần đầu
  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Lỗi lấy ghi chú:', err));
  }, []);

  // Xử lý thêm ghi chú
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const newNote = await response.json();

      // Cập nhật giao diện ngay lập tức (không reload)
      setNotes([newNote, ...notes]);

      // Reset form
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Lỗi tạo ghi chú:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Quản lý Ghi chú</h1>

      {/* Form thêm ghi chú */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Tiêu đề ghi chú"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Nội dung ghi chú"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Thêm Ghi Chú
        </button>
      </form>

      {/* Danh sách ghi chú */}
      <div>
        {notes.length === 0 ? (
          <p>Chưa có ghi chú nào.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0' }}>{note.title}</h3>
              <p style={{ margin: '0 0 8px 0' }}>{note.content}</p>
              <small style={{ color: '#666' }}>
                {new Date(note.createdAt).toLocaleString('vi-VN')}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoteApp;