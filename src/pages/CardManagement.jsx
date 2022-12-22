import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CardManagement() {
  const navigate = useNavigate();
  const [cards, setCards] = useState();
  const location = useLocation();
  const data = location.state?.data;

  const [newCardTitle, setNewCardTitle] = useState();
  const [editedCardTitle, setEditedCardTitle] = useState();
  const [editedCardDescription, setEditedCardDescription] = useState();
  const [newCardDescription, setNewCardDescription] = useState();
  const [inputState, setInputState] = useState("");

  const [withOverlay, setWithOverlay] = useState("");
  const [toggleCreateCard, setToggleCreateCard] = useState("");
  const [toggleEditCard, setToggleEditCard] = useState("");
  const [toggleDeleteCard, setToggleDeleteCard] = useState("");

  const url = `https://l.study-link-demo.com/cards`;
  let author = data;
  let status;

  // console.log(status)

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "PUT", "DELETE");

  const toastCardAdded = () => {
    toast.success("New card successfully added!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastFillInput = () => {
    toast.error("Please fill the input fields properly!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastCardDeleted = () => {
    toast.success("Card successfully deleted!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastCardEdited = () => {
    toast.success("Card successfully edited!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastLoggedOut = () => {
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const toastSomethingWentWrong = () => {
    toast.error("Something went wrong. Please log in again", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  function getAllCards() {
    if (author && author.includes("@")) {
      fetch(url + "/" + author)
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((data) => {
          setCards(data);
        });
      if (status) {
        navigate("/");
        toastSomethingWentWrong();
      }
    } else {
      navigate("/");
    }
  }

  function addNewCard() {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
        title: newCardTitle,
        description: newCardDescription,
        author: author,
      }),
    });
    setToggleCreateCard({ state: "" });
    setWithOverlay("");
    setNewCardTitle("");
    setNewCardDescription("");
    toastCardAdded();
  }

  function updateCard() {
    fetch(url + "/" + toggleEditCard.id, {
      method: "PUT",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
        title: editedCardTitle,
        description: editedCardDescription,
      }),
    });
    setToggleEditCard({ state: "" });
    setWithOverlay("");
    setEditedCardTitle("");
    setEditedCardDescription("");
    toastCardEdited();
  }

  function deleteCard() {
    fetch(url + "/" + toggleDeleteCard.id, {
      method: "DELETE",
      mode: "cors",
      headers: headers,
    });
    setToggleDeleteCard({ state: "" });
    setWithOverlay("");
    toastCardDeleted();
  }

  useEffect(() => {
    getAllCards();
  }, [cards]);

  return (
    <div className={`cardManagement ${withOverlay}`}>
      <ToastContainer />
      <div className="cardManagementNavbar">
        <div className="cardManagementEmailPlaceholder">{author}</div>
        <button
          onClick={() => {
            author = "";
            getAllCards();
            toastLoggedOut();
          }}
          className="logOutBtn"
        >
          Log out
        </button>
      </div>
      <div className="createCardBtnPlaceholder">
        <button
          className="createCardBtn"
          onClick={() => {
            setToggleCreateCard({ state: "active" });
            setWithOverlay("withOverlay");
          }}
        >
          Create card
        </button>
      </div>
      <div className="cardsPlaceholder">
        {cards?.map((card) => {
          return (
            <div key={card.id} className="card">
              <div className="cardTitle">{card.title}</div>
              <div className="cardBody">{card.description}</div>
              <div className="cardBtns">
                <button
                  className="cardBtn"
                  onClick={() => {
                    setToggleEditCard({ state: "active", id: card.id });
                    setWithOverlay("withOverlay");
                    setEditedCardTitle(card.title);
                    setEditedCardDescription(card.description);
                  }}
                >
                  Edit
                </button>
                <button
                  className="cardBtn"
                  onClick={() => {
                    setToggleDeleteCard({ state: "active", id: card.id });
                    setWithOverlay("withOverlay");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        onClick={() => {
          setToggleCreateCard({ state: "" });
          setToggleEditCard({ state: "" });
          setToggleDeleteCard("");
          setWithOverlay("");
        }}
        className={`overlay ${toggleCreateCard.state || ""} ${
          toggleEditCard.state || ""
        } ${toggleDeleteCard.state || ""}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`createCard ${toggleCreateCard.state || ""}`}
        >
          <div className="closeModalPlaceholder">
            <div
              className="closeModal"
              onClick={() => {
                setToggleCreateCard({ state: "" });
                setWithOverlay("");
              }}
            ></div>
          </div>
          <span>CREATE CARD</span>
          <form action="">
            <div className="createCardTitlePlaceholder">
              <label className={`${inputState}`} htmlFor="createCardTitle">
                Title
              </label>
              <input
                value={newCardTitle || ""}
                onChange={(e) => {
                  setNewCardTitle(e.target.value);
                }}
                type="text"
                id="createCardTitle"
                className={`${inputState}`}
              />
            </div>
            <div className="createCardDescriptionPlaceholder">
              <label
                htmlFor="createCardDescription"
                className={`${inputState}`}
              >
                Description
              </label>
              <input
                type="text"
                value={newCardDescription || ""}
                onChange={(e) => {
                  setNewCardDescription(e.target.value);
                }}
                id="createCardDescription"
                className={`${inputState}`}
              />
            </div>
            <div className="createCardBtns">
              <button
                type="button"
                onClick={() => {
                  setToggleCreateCard({ state: "" });
                  setWithOverlay("");
                  setNewCardTitle("");
                  setNewCardDescription("");
                  setInputState("");
                }}
              >
                Close
              </button>
              <input
                type="button"
                onClick={() => {
                  if (newCardTitle && newCardDescription) {
                    addNewCard();
                    setInputState("");
                  } else {
                    setInputState("red");
                    toastFillInput();
                  }
                }}
                value={"Create"}
              />
            </div>
          </form>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`editCard ${toggleEditCard.state || ""}`}
        >
          <div className="closeModalPlaceholder">
            <div
              className="closeModal"
              onClick={() => {
                setToggleEditCard({ state: "" });
                setWithOverlay("");
              }}
            ></div>
          </div>
          <span>EDIT CARD</span>
          <form action="">
            <div className="editCardTitlePlaceholder">
              <label className={`${inputState}`} htmlFor="editCardTitle">
                Title
              </label>
              <input
                value={editedCardTitle || ""}
                onChange={(e) => {
                  setEditedCardTitle(e.target.value);
                }}
                type="text"
                id="editCardTitle"
                className={`${inputState}`}
              />
            </div>
            <div className="editCardDescriptionPlaceholder">
              <label className={`${inputState}`} htmlFor="editCardDescription">
                Description
              </label>
              <input
                value={editedCardDescription || ""}
                onChange={(e) => {
                  setEditedCardDescription(e.target.value);
                }}
                type="text"
                id="editCardDescription"
                className={`${inputState}`}
              />
            </div>
            <div className="editCardBtns">
              <button
                type="button"
                onClick={() => {
                  setToggleEditCard({ state: "" });
                  setWithOverlay("");
                  setEditedCardTitle("");
                  setEditedCardDescription("");
                  setInputState("");
                }}
              >
                Close
              </button>
              <input
                onClick={() => {
                  if (editedCardTitle && editedCardDescription) {
                    updateCard();
                    setInputState("");
                  } else {
                    setInputState("red");
                    toastFillInput();
                  }
                }}
                type="button"
                value={"Save"}
              />
            </div>
          </form>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`deleteCard ${toggleDeleteCard.state || ""}`}
        >
          <span>DELETE CARD</span>
          <p>Are you sure you want to delete card?</p>
          <div className="deleteCardBtns">
            <button
              type="button"
              onClick={() => {
                setToggleDeleteCard("");
                setWithOverlay("");
              }}
            >
              Close
            </button>
            <input onClick={deleteCard} type="button" value={"Delete"} />
          </div>
        </div>
      </div>
    </div>
  );
}
