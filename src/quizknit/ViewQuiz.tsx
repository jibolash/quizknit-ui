import { Button, Flex } from "antd";
import { useAsync } from "react-async-hook";
import { useParams } from "react-router-dom";
import { QuizKnitApi } from "./QuizKnitApi";
import { useEffect, useState } from "react";
import { QuestionAndOptions } from "./QuestionAndOptions";
import { Quiz } from "./QuizKnit";
import { ShareAltOutlined } from "@ant-design/icons";
import { ShareQuizModal } from "./ShareQuizModal";

export function ViewQuiz() {
  let { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Flex align="center" justify="space-between">
        <h3>{quiz?.quizTitle}</h3>
        <Button
          type="default"
          shape="circle"
          icon={<ShareAltOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
      </Flex>
      {quiz &&
        quiz.questions.length > 0 &&
        quiz.questions.map((questionItem, index) => (
          <QuestionAndOptions
            questionItem={questionItem}
            index={index}
            key={index}
          />
        ))}
      <ShareQuizModal
        quizId={quiz?._id || ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Flex>
  );
}
