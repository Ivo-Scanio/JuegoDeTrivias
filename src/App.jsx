import { useEffect, useState } from "react";
import { Question } from "./components/Question";
import { useFetchQuestion } from "./hooks/useFechQuestion";
import { EndScreen } from "./components/EndScreen";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [restart, setRestart] = useState(false);
  const {Questions,isLoading} = useFetchQuestion(restart);

  //Cada vez que termina el juego reinicia las variables
  useEffect(() => {
    if (startGame&& !endGame){
      setCurrentQuestionIndex(0);
      setCorrectAnswers(0);
    }
  }, [endGame,startGame]);

  //NextQuestion se usa para cambiar a la sig pregunta 
  //al finalizar muestra la pantalla de carga y cambia la preguntas
  const NextQuestion = () => {
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setRestart(!restart);
      handleEndGame();
    }
  };

  //Cambia la bariable para inicial con las preguntas o 
  // salir al menu al precionar salir en la patalla de EndScreen
  const handleStartGame = () => {
    setStartGame(!startGame);
    setEndGame(false);
  };

  //Modifica la variable para mostrar o dejar de mostrar la pantalla de EndScreen
  const handleEndGame = () => {
    setEndGame(!endGame);
  };

  //Cada vez q se responde una respuesta correcta el contador aumenta
  const handleCorrectAnswer = (option) => {
    if (option) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  //Se guarda la pregunta actual para mandarla al componente
  const currentQuestion = Questions[currentQuestionIndex];
  return (
    <div className="content">
      {!startGame ? (<>
        <button onClick={handleStartGame}>Jugar</button>
      </>
      ) : !endGame ? (
        <Question key={currentQuestion.question}
          data={currentQuestion}
          onNextQuestion={NextQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          isLoading={isLoading} />

      ) : (
        <EndScreen
          correctAnswers={correctAnswers}
          totalQuestions={Questions.length}
          handleEndGame={handleEndGame}
          handleStartGame={handleStartGame}
        />
      )

      }
    </div>
  )
}

export default App;
