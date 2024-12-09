import { Button, Flex, Spin, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { QuizKnitApi } from "./QuizKnitApi";
import { sampleInput } from "./sampleData";
import { RocketOutlined, SaveOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { QuestionAndOptions } from "./QuestionAndOptions";
import { LoadingOutlined } from "@ant-design/icons";
import { SavedQuizModal } from "./SavedQuizModal";
import { Link } from "react-router-dom";

export type QuizTextInput = {
  textInput: string;
};

interface Option {
  text: string;
  isCorrectAnswer: boolean;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface Quiz {
  _id: string;
  quizTitle: string;
  questions: Question[];
  dateCreated: string;
}

interface QuizKnitProps {
  tourSteps: {
    ref1: React.MutableRefObject<null>;
    ref2: React.MutableRefObject<null>;
    ref3: React.MutableRefObject<null>;
  };
  setOpenTour: React.Dispatch<React.SetStateAction<boolean>>;
}

export function QuizKnit(props: QuizKnitProps) {
  const [value, setValue] = useState(sampleInput);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState("");

  const onGenerateQuiz = async () => {
    setLoading(true);
    if (!value.trim()) {
      setLoading(false);
      alert("No text provided!");
      return;
    }
    const quizTextInput: QuizTextInput = {
      textInput: value,
    };
    try {
      const createdQuiz = await QuizKnitApi.generateQuiz(quizTextInput);
      if (createdQuiz) {
        setQuiz(createdQuiz);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      alert("Could not generate quiz, please try again")!;
    }
  };

  const saveQuiz = async () => {
    setSavingQuiz(true);
    if (quiz && quiz.questions.length > 0) {
      try {
        const savedQuizId = await QuizKnitApi.saveQuiz(quiz);
        if (savedQuizId) {
          setSavedQuizId(savedQuizId); // add a quiz id key to this object on backend
          setIsModalOpen(true);
          setSavingQuiz(false);
        }
      } catch (e) {
        console.log("e", e);
        alert("Could not save quiz, please try again later");
        setSavingQuiz(false);
      }
    }
  };

  return (
    <>
      <Flex
        justify="center"
        wrap="wrap"
        gap={"small"}
        id="homeContainer"
        style={{ padding: "12px" }}
      >
        <Flex vertical gap="small" align="center">
          <Flex ref={props.tourSteps.ref3} vertical gap="12px">
            <Flex
              style={{
                padding: "20px",
                backgroundColor: "white",
              }}
              vertical
              gap="12px"
              align="center"
            >
              <Typography.Text>
                Type or paste text you want to generate a quiz from in the
                textbox and click{" "}
                <strong style={{ color: "#604CE2" }}>Generate Quiz</strong>{" "}
                below
              </Typography.Text>
              <Flex ref={props.tourSteps && props.tourSteps.ref1}>
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Type or paste text you want to generate a quiz from here"
                  autoSize={{ minRows: 15 }}
                  style={{
                    // width: "100%",
                    width: isMobile ? 350 : 550,
                  }}
                  disabled={loading}
                  id="inputTextArea"
                />
              </Flex>
              <Flex justify="center" ref={props.tourSteps.ref2}>
                <Button
                  type="primary"
                  onClick={onGenerateQuiz}
                  loading={loading}
                  icon={<RocketOutlined />}
                  disabled={value.length === 0}
                  size="large"
                  style={{ backgroundColor: "#604CE2" }}
                >
                  Generate Quiz
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical gap="small" align="center">
          <Flex
            ref={props.tourSteps.ref3}
            vertical
            gap="12px"
            style={{
              padding: "20px",
              backgroundColor: "white",
              width: !isMobile ? "625px" : undefined,
            }}
          >
            {quiz == undefined && (
              <Flex vertical gap="12px">
                <Typography.Text>
                  Your AI generated quiz will appear here.
                </Typography.Text>
                <Typography.Text>
                  Just exploring? Try out QuizKnit using our demo text about the
                  milky way.
                </Typography.Text>
                <Typography.Text>
                  You can also view quizzes created by other users by in our
                  <Link to={"/explore"} style={{ color: "#604CE2" }}>
                    {" "}
                    <strong>Explore</strong>
                  </Link>{" "}
                  page.
                </Typography.Text>
                <Typography.Text>
                  Click{" "}
                  <strong
                    onClick={() => props.setOpenTour(true)}
                    style={{ cursor: "pointer", color: "#604CE2" }}
                  >
                    here
                  </strong>{" "}
                  for a quick app tour.
                </Typography.Text>
              </Flex>
            )}
            {quiz &&
              quiz.questions.length > 0 &&
              quiz.questions.map((questionItem, index) => (
                <QuestionAndOptions
                  questionItem={questionItem}
                  index={index}
                  key={index}
                />
              ))}
            {quiz && quiz.questions.length > 0 && (
              <Flex justify="center">
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={saveQuiz}
                  loading={savingQuiz || loading}
                >
                  Save Quiz
                </Button>
              </Flex>
            )}
          </Flex>

          {loading && <Spin indicator={<LoadingOutlined spin />} />}
        </Flex>
      </Flex>
      <SavedQuizModal
        quizId={savedQuizId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
