import React, { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardText, setCardText] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [cardDescription, setCardDescription] = useState("");

  const handleAddCard = () => {
    if (!cardNumber || !cardText || !cardImage || !cardDescription) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const newCard = {
      id: cardNumber,
      text: cardText,
      imageUrl: URL.createObjectURL(cardImage),
      description: cardDescription,
    };

    setCards([...cards, newCard]);
    setCardNumber("");
    setCardText("");
    setCardImage(null);
    setCardDescription("");
  };

  const handleImageUpload = (event) => {
    setCardImage(event.target.files[0]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.editor}>
        <input
          type="number"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Card Text"
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.input}
        />
        <textarea
          placeholder="Card Description"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
          style={styles.textarea}
        />
        <button style={styles.button} onClick={handleAddCard}>
          Add Card
        </button>
      </div>

      <div style={styles.cardsContainer}>
        {cards.map((card) => (
          <div key={card.id} style={styles.card}>
            <div style={styles.cardNumber}>{card.id}</div>
            <div style={styles.cardContent}>
              <div style={styles.cardText}>{card.text}</div>
              <img
                src={card.imageUrl}
                alt={`Card ${card.id}`}
                style={styles.cardImage}
              />
              <div style={styles.cardDescription}>{card.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  editor: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "60px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // แบ่งการ์ดเป็น 2 คอลัมน์
    gap: "10px",
  },
  card: {
    width: "400px", // ขนาดการ์ด 400x400 พิกเซล
    height: "auto",
    backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // เพิ่มเงา
    position: "relative",
    padding: "10px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center", // จัดตำแหน่งเนื้อหาตรงกลาง
    alignItems: "center", // จัดตำแหน่งเนื้อหาตรงกลาง
  },
  cardNumber: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "16px",
    color: "#aaa", // สีของตัวเลขอ่อนลง
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  cardText: {
    fontSize: "16px",
    color: "#333", // สีของข้อความ
    marginBottom: "10px",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666", // สีของคำอธิบาย
  },
};

export default App;
