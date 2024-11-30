import { Flex } from "antd";
import { useAsync } from "react-async-hook";
import { useParams } from "react-router-dom";
import { QuizKnitApi } from "./QuizKnitApi";
import { useEffect, useState } from "react";
import { Question } from "./QuizKnit";
import { QuestionAndOptions } from "./QuestionAndOptions";

export function Quiz() {
  let { id } = useParams();
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [quizLoaded, setQuizLoaded] = useState(false);

  const {
    loading: _loading,
    // status: status,
    // error: error,
    execute: loadQuiz,
  } = useAsync(() => QuizKnitApi.getQuizWithId(id || ""), [], {
    onSuccess(result) {
      console.log("result", result);
      setQuizLoaded(true);
      setQuiz(result);
    },
    onError(_e) {
      setQuizLoaded(false);
    },
  });

  useEffect(() => {
    try {
      loadQuiz();
    } catch (e) {}
  }, []);

  if (!quizLoaded) {
    return (
      <Flex vertical gap="12px" style={{ marginTop: "12px" }}>
        <p>
          Could not load quiz, please confirm the link to the quiz is correct
        </p>
      </Flex>
    );
  }

  return (
    <Flex vertical gap="12px" style={{ marginTop: "12px" }}>
      {quiz.length > 0 &&
        quiz.map((questionItem, index) => (
          <QuestionAndOptions
            questionItem={questionItem}
            index={index}
            key={index}
          />
        ))}
    </Flex>
  );
}
