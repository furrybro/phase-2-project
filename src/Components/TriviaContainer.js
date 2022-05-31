import React from "react";
import { Card } from "semantic-ui-react";
import TriviaCard from "./TriviaCard";

function TriviaContainer({ questions }) {

    const renderEachQuestion = questions.map((question) => {
        return <TriviaCard key={question.question} question={question}/>
    });

    return (
        <Card.group itemsPerRow={6}>
            <h1>hello from trivia questions</h1>
            {renderEachQuestion}
        </Card.group>
    )
}

export default TriviaContainer;