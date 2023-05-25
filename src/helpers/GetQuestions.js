export const getQuestions= async()=>{
    
    const url =`https://opentdb.com/api.php?amount=10&type=multiple`
    const resp = await fetch(url);
    const {results} = await resp.json();
   
    //Guardamos para enviar la variables q desean utilizar
    const Questions= results.map((questionData)=>({
        question: questionData.question,
        correct_answer: questionData.correct_answer,
        Options:[questionData.correct_answer, ...questionData.incorrect_answers]
     }));
   
    return Questions;
}