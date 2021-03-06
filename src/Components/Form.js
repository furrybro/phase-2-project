import React, { useState } from "react";

function Form ({ handleAddQuestion }) {
    const [ formQuestion, setFormQuestion ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ answer, setAnswer ] = useState(false);


    function newQuestionText(e) {
        e.preventDefault();
        setFormQuestion(e.target.value);
    }
   
    function newCategory(e) {
        e.preventDefault();
        setCategory(e.target.value);
    }

    function newAnswerTrue(e) {
        setAnswer(true);
    }

    function newAnswerFalse(e) {
        setAnswer(false);
    }

    function submitForm(e) {
        e.preventDefault();

        const newQuestionObj = {
            category: category,
            type: "boolean",
            difficulty: "easy",
            question: formQuestion,
            correct_answer: answer.toString(),
            incorrect_answers: [
                (!answer).toString()
            ]
        };

        console.log("newquestionobj", newQuestionObj);

        fetch("http://localhost:3000/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestionObj)
        })
        .then(resp => resp.json())
        .then(data => {
            handleAddQuestion(data);
            setFormQuestion("");
            setCategory("");
            setAnswer(false);
        })
    }

    return (
        <>
        <h1 id="hello">Add Your Own Trivia Question</h1>
        <div id="form">
            <form onSubmit={submitForm}>
                <input id="formInput" onChange={newQuestionText} value={formQuestion} name="question" type="text" placeholder="New trivia question..."/><br></br>
                    <select onChange={newCategory} value={category} name="category" id="dropDown">
                        <option value="" disabled>Select a category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="History">History</option>
                        <option value="Sports">Sports</option>
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="Politics">Politics</option>
                        <option value="Animals">Animals</option>
                        <option value="Science">Science</option>
                        <option value="Vehicles">Vehicles</option>
                    </select>
                    <div id="radioButtons">
                        <input type="radio" name="correct_answer" value={answer} onChange={newAnswerTrue} checked={answer}/>
                         <label>TRUE</label>
                        <input type="radio" name="correct_answer" value={!answer} onChange={newAnswerFalse}/>
                        <label>FALSE</label>
                    </div>
                <input id="submit" type="submit" />
            </form>
        </div>
        </>
    )
}

export default Form;