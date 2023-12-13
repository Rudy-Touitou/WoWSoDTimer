// app.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Importe le fichier CSS
import wowLogo from './assets/Season_of_Discovery_WoW_Classic.png'; // Importe l'image
import pepeRub from './assets/pepeHandrub.gif'; // Importe l'image
import pepeRub2 from './assets/pepeHandrub2.gif'; // Importe l'image
import wowBG from './assets/wowBg.mp4'; // Importe la vidéo
import dancing from './assets/dancing.gif'; // Importe la vidéo

const App = () => {
  // Obtiens la date actuelle
  const currentDate = new Date();

  // Définis la date de fin à aujourd'hui à 22h
  currentDate.setHours(22, 0, 0, 0);
  const endDate = currentDate.getTime();

  // Calcul du temps restant
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = endDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [endDate]);

  // State pour stocker le temps restant
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Mettre à jour le temps restant chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Nettoyer le timer lorsque le composant est démonté
    return () => clearInterval(timer);

  }, [calculateTimeLeft]
  ); // Ajouter calculateTimeLeft comme dépendance de useEffect

  return (
    <div className='background-container'>
      <video className='background-video' autoPlay muted loop>
        <source src={wowBG} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='container'>
        <img className='logo' src={wowLogo} alt="" />
        <div className='compteur gradient-text'>
          <div> {timeLeft.hours} Heures,</div>
          <div> {timeLeft.minutes} Minutes, </div>
          <div>{timeLeft.seconds} Seconds !</div>
        </div>
        <div className='img'>
            <img className='pepe' src={pepeRub2} alt="" />
            <img className='dancing' src={dancing} alt="" />
            <img className='pepe' src={pepeRub} alt="" />
        </div>
      </div>
    </div>
  );
};

export default App;
