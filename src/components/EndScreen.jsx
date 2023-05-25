
export const EndScreen = ({correctAnswers,totalQuestions,handleEndGame,handleStartGame}) => {
  return (
    <div>
        <h1>¡Has terminado!</h1>
        <h2>Obtuviste un puntaje de: {correctAnswers} / {totalQuestions}</h2>
        <button onClick={handleEndGame}>Jugar otra vez</button>
        <button onClick={handleStartGame}>Salir</button>
    </div>
  )
}
