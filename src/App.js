import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import "./App.css";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import defpic from "./assets/defaultpic.png";
import logo from "./assets/logo.jpg";

function App() {
  const initialCards = [
    { 
      title: "Val Thorens", 
      image: img1, 
      liked: false 
    },
    { title: "Restaurant terrace", 
      image: img2, 
      liked: false 
    },
    { title: "An outdoor cafe", 
      image: img3, 
      liked: false 
    },
    {
      title: "A very long bridge, over the forest...",
      image: img4,
      liked: false,
    },
    { title: "Tunnel with morning light", 
      image: img5, 
      liked: false 
    },
    { title: "Mountain house", 
      image: img6, 
      liked: false 
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [modalContent, setModalContent] = useState(null);
  const [profile, setProfile] = useState({
    name: "Aliaune Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon...",
    description:
      "Known mononymously as Akon (/ˈeɪkɒn/), is a Senegalese-American singer, record producer, and entrepreneur. An influential figure in modern world",
    image: "./assets/profile.png",
  });

  // function toggleLike(index) {
  //   const newCards = [...cards];
  //   newCards[index].liked = !newCards[index].liked;
  //   setCards(newCards);
  // }

  function openImageModal(card) {
    setModalContent(
      <div className="modal">
        <img src={card.image} alt={card.title} style={{ width: "100%", maxWidth: "500px", borderRadius: "12px" }} />
        <h3 style={{ textAlign: "center", marginTop: "10px" }}>{card.title}</h3>
        <button onClick={() => setModalContent(null)}>Close</button>
      </div>
    );
  }

  useEffect (() => {
    if (!modalContent) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalContent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalContent]);

  function openEditProfile() {
    let newName = profile.name;
    let newDesc = profile.description;
    let newImage = profile.image;

    function handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          newImage = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    setModalContent(
      <div className="modal">
        <h2>Edit Profile</h2>
        <form>
          <input defaultValue={profile.name} onChange={(e) => (newName = e.target.value)} placeholder="Name" />
          <textarea defaultValue={profile.description} onChange={(e) => (newDesc = e.target.value)} placeholder="Description" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={(event) => {
              event.preventDefault();
              setProfile({
                name: newName,
                description: newDesc,
                image: newImage,
              });
              setModalContent(null);
            }}
          >
            Save
          </button>
          <button onClick={() => setModalContent(null)}>Cancel</button>
        </form>
      </div>
    );
  }

  function openNewPost() {
    let title = "";
    let image = "";

    function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          image = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    setModalContent(
      <div className="modal">
        <h2>New Post</h2>
        <form>
          <input placeholder="Title" onChange={(e) => (title = e.target.value)} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={() => {
              if (title && image) {
                setCards([{ title, image, liked: false }, ...cards]);
                setModalContent(null);
              }
            }}
          >
            Create
          </button>
          <button onClick={() => setModalContent(null)}>Cancel</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <header className="logo-icon">
        <img src={logo} alt="Profile" style={{}} />
      </header>

      <main>
        <div className="profile-container">
          <div className="img-details">
            <img src={defpic} alt="Profile" style={{ width: "190px", height: "190px", borderRadius: "12px" }} />
            <div className="profile-details">
              <h2>{profile.name}</h2>
              <p>{profile.description}</p>
              <div className="edit-profile">
                <button onClick={openEditProfile}>Edit Profile</button>
              </div>
            </div>
          </div>
          <div className="new-post">
            <div></div>
            <button onClick={openNewPost}>New Post</button>
          </div>
        </div>

        <section className="gallery">
          {cards.map((card, index) => (
            <article className="gallery-item" key={index}>
              <img
                src={card.image}
                alt={card.title}
                onClick={() => openImageModal(card)}
              />
              <footer className="card-footer">
                <span>{card.title}</span>
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </footer>
            </article>
          ))}
        </section>
      </main>

      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          {modalContent}
        </div>
      )}

      <footer>
        <div className="copyright">
          <div className="copy-container">
            <p>2024 © Spots</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
