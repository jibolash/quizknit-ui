import { Button, Flex, Spin } from "antd";
import { useAsync } from "react-async-hook";
import { useParams } from "react-router-dom";
import { QuizKnitApi } from "./QuizKnitApi";
import { useEffect, useState } from "react";
import { QuestionAndOptions } from "./QuestionAndOptions";
import { Quiz } from "./QuizKnit";
import { LoadingOutlined, ShareAltOutlined } from "@ant-design/icons";
import { ShareQuizModal } from "./ShareQuizModal";

export function ViewQuiz() {
  let { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    loading: loadingQuiz,
    // status: status,
    // error: error,
    execute: loadQuiz,
  } = useAsync(() => QuizKnitApi.getQuizWithId(id || ""), [], {
    onSuccess(result) {
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

  if (loadingQuiz) {
    return (
      <Flex vertical gap="12px" style={{ marginTop: "12px" }}>
        <Spin indicator={<LoadingOutlined spin />} />
      </Flex>
    );
  }

  if (!quizLoaded) {
    return (
      <Flex
        vertical
        gap="12px"
        style={{
          marginTop: "12px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <p>
          Could not load quiz, please confirm the link to the quiz is correct
        </p>
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      gap="12px"
      style={{
        marginTop: "12px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
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
