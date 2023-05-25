import { useEffect, useState } from "react";

export const Question = ({ data, onNextQuestion, onCorrectAnswer, isLoading }) => {
  const { question, Options, correct_answer } = data
  const [selectedOption, setSelectedOption] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  //Se utilita para mesclar la opciones para q respuesta correcta
  //no aparesca en la misma pocicion. Se ejecuta solo el componente
  useEffect(() => {
    const shuffled = Options.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [Options]);


  //Se encarga de llamar a la funcion que pasa a la sigiente pregunta 
  //al hacer click en una opcion y pinta la respuestas correctas e incorrectas
  const handleOptionClick = (option) => {
    if (selectedOption) {
      setTimeout(onNextQuestion, 2000)
      if (option === correct_answer) {
        return 'correctAnswer'
      }
      return 'wrongAnswer'
    }
  }

  //Verifica si la opcion seleccionada es la correcta y llama al contador 
  const handleCorrectAnswer = (option) => {
    if (option === correct_answer) {
      onCorrectAnswer(true);
    }
  }

  //DecodeEntities sirve para decodifica la variable ingresada para 
  //que "/&quot;" o similare se muestren correctamente
  const decodeEntities = (encodedString) => {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
  }

  return (
    <div className="content">
      {isLoading ? (
        <h1>Cargando Preguntas ...</h1>
      ) : (
        <>
          <h1>{decodeEntities(question)}</h1>
          <div className="contentOptions">
            {shuffledOptions.map((option, index) => (
              <button key={index}
                className={handleOptionClick(option)}
                onClick={() => {
                  setSelectedOption(true)
                  handleCorrectAnswer(option)
                }}
                disabled={selectedOption !== false}
              >{decodeEntities(option)}</button>
            ))}</div>
        </>)}
    </div>
  )
}
