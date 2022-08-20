import React, { useCallback, useEffect, useState } from "react";
import Footer from "../footer/footer";
import styles from "./maker.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Preview from "../preview/preview";
import Menu from "../menu/menu";
import PageTitle from "../page_title/page_title";

const Maker = ({
  FileInput,
  authService,
  cardRepository,
  isDark,
  setIsDark,
}) => {
  const location = useLocation();
  const locationState = location?.state;
  const pathName = location.pathname;
  const navigate = useNavigate();
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(locationState && locationState.id);
  const [menuBtn, setMenuBtn] = useState(false);
  const [show, setShow] = useState(false);
  const theme = isDark === "dark" ? styles.dark : styles.light;

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncItems(
      userId,
      (cards) => {
        setCards(cards);
      },
      "cards"
    );
    return () => stopSync();
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [authService, userId, navigate]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveItem(userId, card, "cards");
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeItem(userId, card, "cards");
  };

  const handleResize = () => {
    window.innerWidth > 992 ? setMenuBtn(false) : setMenuBtn(true);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClick = () => {
    setShow(true);
  };

  return (
    <div className={styles.wrapper}>
      <Menu
        onLogout={onLogout}
        show={show}
        setShow={setShow}
        pathName={pathName}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <section className={styles.maker}>
        <div className={`${styles.top} ${theme}`}>
          <PageTitle title="CARD" />
          {menuBtn && (
            <button className={`${styles.menuBtn} ${theme}`} onClick={onClick}>
              <i className="fas fa-bars"></i>
            </button>
          )}
        </div>
        <div className={styles.container}>
          <Preview
            FileInput={FileInput}
            cards={cards}
            addCard={createOrUpdateCard}
            updateCard={createOrUpdateCard}
            deleteCard={deleteCard}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Maker;
