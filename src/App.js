// import React, { useState, useEffect } from "react";

// const ColorGame = () => {
//   const [rgbColor, setRgbColor] = useState(generateRandomColor());
//   const [options, setOptions] = useState(generateColorOptions(rgbColor));
//   const [feedback, setFeedback] = useState("");
//   const [timer, setTimer] = useState(60);
//   const [round, setRound] = useState(1);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0); // Track the player's score

//   // Generate a random RGB color
//   function generateRandomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
//   }

//   // Generate random color options including the correct one
//   function generateColorOptions(correctColor) {
//     const options = [correctColor];
//     while (options.length < 3) {
//       const randomColor = generateRandomColor();
//       if (!options.includes(randomColor)) {
//         options.push(randomColor);
//       }
//     }
//     return options.sort(() => Math.random() - 0.5); // Shuffle the options
//   }

//   // Reset for a new round
//   const resetRound = () => {
//     if (round < 10) {
//       const newColor = generateRandomColor();
//       setRgbColor(newColor);
//       setOptions(generateColorOptions(newColor));
//       setFeedback("");
//       setTimer(60);
//       setRound((prevRound) => prevRound + 1);
//     } else {
//       setGameOver(true);
//     }
//   };

//   // Handle user's guess
//   const handleGuess = (guess) => {
//     if (gameOver) return;

//     if (guess === rgbColor) {
//       setFeedback("Correct!");
//       setScore((prevScore) => prevScore + 10); // Increment score by 10
//       resetRound();
//     } else {
//       setFeedback("Wrong!");
//     }
//   };

//   // Timer countdown
//   useEffect(() => {
//     if (gameOver || timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer, gameOver]);

//   // Handle timeout
//   useEffect(() => {
//     if (timer === 0) {
//       setFeedback("Timeout!");
//       resetRound();
//     }
//   }, [timer]);

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Color Guessing Game</h1>
//       {!gameOver ? (
//         <>
//           <p>Round: {round} / 10</p>
//           <p>Time Left: {timer}s</p>
//           <p>Score: {score}</p>
//           <p>
//             Guess the color: <strong>{rgbColor}</strong>
//           </p>
//           <div
//             style={{
//               backgroundColor: rgbColor,
//               width: "150px",
//               height: "150px",
//               margin: "20px auto",
//               borderRadius: "10px",
//               border: "2px solid #000",
//             }}
//           ></div>
//           <div>
//             {options.map((color) => (
//               <button
//                 key={color}
//                 onClick={() => handleGuess(color)}
//                 style={{
//                   backgroundColor: color,
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 20px",
//                   margin: "10px",
//                   cursor: "pointer",
//                   borderRadius: "5px",
//                 }}
//               >
//                 {color}
//               </button>
//             ))}
//           </div>
//           {feedback && (
//             <p style={{ marginTop: "20px", fontSize: "18px" }}>{feedback}</p>
//           )}
//         </>
//       ) : (
//         <>
//           <h2>Game Over! Thanks for playing.</h2>
//           <p>
//             Your Total Score: <strong>{score}</strong>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default ColorGame;
import React, { useState, useEffect } from "react";

const ColorGame = () => {
  const [rgbColor, setRgbColor] = useState(generateRandomColor());
  const [options, setOptions] = useState(generateColorOptions(rgbColor));
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(20);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => parseInt(localStorage.getItem("bestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  // Generate a random RGB color
  function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Generate random color options including the correct one
  function generateColorOptions(correctColor) {
    const options = [correctColor];
    while (options.length < 4) {
      const randomColor = generateRandomColor();
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle the options
  }

  // Reset for a new round
  const resetRound = () => {
    if (round < 20) {
      const newColor = generateRandomColor();
      setRgbColor(newColor);
      setOptions(generateColorOptions(newColor));
      setFeedback("");
      setTimer(20);
      setRound((prevRound) => prevRound + 1);
    } else {
      setGameOver(true);
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem("bestScore", score);
      }
    }
  };

  // Handle user's guess
  const handleGuess = (guess) => {
    if (gameOver) return;

    if (guess === rgbColor) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 10); // Increment score by 10
      resetRound();
    } else {
      setFeedback("Wrong!");
    }
  };

  // Timer countdown
  useEffect(() => {
    if (gameOver || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [timer, gameOver]);

  // Handle timeout
  useEffect(() => {
    if (timer <= 0) {
      setFeedback("Timeout!");
      resetRound();
    }
  }, [timer]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>KOLOR</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          fontSize: "18px",
        }}
      >
        <p>TIME: {timer.toFixed(1)}s</p>
        <p>ROUND: {round} / 20</p>
        <p>SCORE: {score}</p>
        <p>BEST: {bestScore}</p>
      </div>
      {!gameOver ? (
        <>
          <p style={{ fontSize: "24px", marginBottom: "20px" }}>
            What KOLOR is this?
          </p>
          <div
            style={{
              backgroundColor: rgbColor,
              width: "150px",
              height: "150px",
              margin: "20px auto",
              borderRadius: "50%",
              border: "2px solid #000",
            }}
          ></div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            {options.map((color) => (
              <button
                key={color}
                onClick={() => handleGuess(color)}
                style={{
                  backgroundColor: color,
                  width: "100px",
                  height: "100px",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                }}
              ></button>
            ))}
          </div>
          {feedback && (
            <p style={{ marginTop: "20px", fontSize: "18px" }}>{feedback}</p>
          )}
        </>
      ) : (
        <>
          <h2>Game Over! Thanks for playing.</h2>
          <p>
            Your Total Score: <strong>{score}</strong>
          </p>
        </>
      )}
      <footer style={{ marginTop: "40px", fontSize: "14px", color: "#555" }}>
        <p>
          KOLOR © 2024 by moro (
          <a
            href="https://twitter.com/alterebro"
            target="_blank"
            rel="noopener noreferrer"
          >
            @alterebro
          </a>
          )
        </p>
        <a
          href="https://www.buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#ffd700",
            color: "#000",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Buy me a coffee
        </a>
      </footer>
    </div>
  );
};

export default ColorGame;
// import React, { useState, useEffect } from "react";

// const ColorGame = () => {
//   const [rgbColor, setRgbColor] = useState(generateRandomColor());
//   const [options, setOptions] = useState(generateColorOptions(rgbColor));
//   const [feedback, setFeedback] = useState("");
//   const [timer, setTimer] = useState(20);
//   const [round, setRound] = useState(1);
//   const [score, setScore] = useState(0);
//   const [bestScore, setBestScore] = useState(
//     () => parseInt(localStorage.getItem("bestScore")) || 0
//   );
//   const [gameOver, setGameOver] = useState(false);

//   // Generate a random RGB color
//   function generateRandomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
//   }

//   // Generate random color options including the correct one
//   function generateColorOptions(correctColor) {
//     const options = [correctColor];
//     while (options.length < 4) {
//       const randomColor = generateRandomColor();
//       if (!options.includes(randomColor)) {
//         options.push(randomColor);
//       }
//     }
//     return options.sort(() => Math.random() - 0.5); // Shuffle the options
//   }

//   // Reset for a new round
//   const resetRound = () => {
//     if (round < 20) {
//       const newColor = generateRandomColor();
//       setRgbColor(newColor);
//       setOptions(generateColorOptions(newColor));
//       setFeedback("");
//       setTimer(20);
//       setRound((prevRound) => prevRound + 1);
//     } else {
//       setGameOver(true);
//       if (score > bestScore) {
//         setBestScore(score);
//         localStorage.setItem("bestScore", score);
//       }
//     }
//   };

//   // Handle user's guess
//   const handleGuess = (guess) => {
//     if (gameOver) return;

//     if (guess === rgbColor) {
//       setFeedback("Correct!");
//       setScore((prevScore) => prevScore + 10); // Increment score by 10
//       resetRound();
//     } else {
//       setFeedback("Wrong!");
//     }
//   };

//   // Timer countdown
//   useEffect(() => {
//     if (gameOver || timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 0.1);
//     }, 100);

//     return () => clearInterval(interval);
//   }, [timer, gameOver]);

//   // Handle timeout
//   useEffect(() => {
//     if (timer <= 0) {
//       setFeedback("Timeout!");
//       resetRound();
//     }
//   }, [timer]);

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "20px",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>KOLOR</h1>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           marginBottom: "20px",
//           fontSize: "18px",
//         }}
//       >
//         <p>TIME: {timer.toFixed(1)}s</p>
//         <p>ROUND: {round} / 20</p>
//         <p>SCORE: {score}</p>
//         <p>BEST: {bestScore}</p>
//       </div>
//       {!gameOver ? (
//         <>
//           <p style={{ fontSize: "24px", marginBottom: "20px" }}>
//             What KOLOR is this?
//           </p>
//           <div
//             style={{
//               backgroundColor: rgbColor,
//               width: "150px",
//               height: "150px",
//               margin: "20px auto",
//               borderRadius: "50%",
//               border: "2px solid #000",
//             }}
//           ></div>
//           <div
//             style={{ display: "flex", justifyContent: "center", gap: "20px" }}
//           >
//             {options.map((color) => (
//               <button
//                 key={color}
//                 onClick={() => handleGuess(color)}
//                 style={{
//                   backgroundColor: color,
//                   width: "100px",
//                   height: "100px",
//                   border: "none",
//                   borderRadius: "50%",
//                   cursor: "pointer",
//                   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
//                 }}
//               ></button>
//             ))}
//           </div>
//           {feedback && (
//             <p style={{ marginTop: "20px", fontSize: "18px" }}>{feedback}</p>
//           )}
//         </>
//       ) : (
//         <>
//           <h2>Game Over! Thanks for playing.</h2>
//           <p>
//             Your Total Score: <strong>{score}</strong>
//           </p>
//         </>
//       )}
//       <footer style={{ marginTop: "40px", fontSize: "14px", color: "#555" }}>
//         <p>
//           KOLOR © 2024 by moro (
//           <a
//             href="https://twitter.com/alterebro"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             @alterebro
//           </a>
//           )
//         </p>
//         <a
//           href="https://www.buymeacoffee.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             display: "inline-block",
//             padding: "10px 20px",
//             backgroundColor: "#ffd700",
//             color: "#000",
//             textDecoration: "none",
//             borderRadius: "5px",
//             marginTop: "10px",
//           }}
//         >
//           Buy me a coffee
//         </a>
//       </footer>
//     </div>
//   );
// };

// export default ColorGame;
