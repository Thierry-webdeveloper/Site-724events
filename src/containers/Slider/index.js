import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Renommage de la fonction
  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1,
  );
  const nextCard = () => {
    // Garde fou du premier rendu, * data * vaut null → * byDateAsc * vaut undefined
    if (!byDateAsc) return;
    setTimeout(
      // Correction de la borne supérieure pour *index*
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      () => setIndex(index < byDateAsc.length - 1 ? index + 1 : 0),
      5000,
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {/* Bloc événements */}
      {/* {byDateDesc?.map((event, idx) => ( */}
      {byDateAsc?.map((event, idx) => (
        // Suppression de la boucle imbriquée
        // <>
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Bloc de pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* {byDateDesc.map((_, radioIdx) => ( */}
          {byDateAsc?.map((event, radioIdx) => (
            <input
              // key={`${event.id}`}
              key={event.title}
              type="radio"
              name="radio-button"
              // checked={idx === radioIdx}
              checked={index === radioIdx}
              // Pucettes purement indicatives : slider 100% automatique, pas d'interaction manuelle
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
