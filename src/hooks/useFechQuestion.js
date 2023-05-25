import { useEffect, useState } from "react";
import {getQuestions} from '../helpers/GetQuestions'

export const useFetchQuestion = (recargar) => {

const [isLoading, setIsLoading] = useState(true)
const [Questions, setQuestions] = useState([]);

  const getPreguntas =async()=>{
    const newQuestions = await getQuestions();
    setQuestions(newQuestions);
    setIsLoading(false);
  }
  //si dectecta unn cambio en recargar llama a getPreguntas
  //para asi cambiar las preguntas
     useEffect(()=>{
        getPreguntas();
     },[recargar])
  return {
    Questions,
    isLoading
  }
}