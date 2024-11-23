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

  const {
    loading: loading,
    status: status,
    error: error,
    execute: loadQuiz,
  } = useAsync(() => QuizKnitApi.getQuizWithId(id || ""), [], {
    onSuccess(result) {
      console.log("result", result);
      setQuiz(result);
    },
    onError(e) {
      console.log(loading);
      console.log("error", e);
    },
  });

  useEffect(() => {
    try {
      loadQuiz();
    } catch (e) {}
  }, []);

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
