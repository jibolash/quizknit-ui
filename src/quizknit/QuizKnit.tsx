import { Button, Flex, FloatButton, Spin, Tour, TourProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import { QuizKnitApi } from "./QuizKnitApi";
import { sampleInput } from "./sampleData";
import {
  QuestionCircleOutlined,
  RocketOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { QuestionAndOptions } from "./QuestionAndOptions";
import { LoadingOutlined } from "@ant-design/icons";
import { SavedQuizModal } from "./SavedQuizModal";

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

export function QuizKnit() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [value, setValue] = useState(sampleInput);
  const [loading, setLoading] = useState(false);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState("");

  const steps: TourProps["steps"] = [
    {
      title: "Enter text",
      description: "Enter text you want to generate a quiz from",
      target: () => ref1.current,
    },
    {
      title: "Generate Quiz",
      description:
        "Click here to generate a quiz based on the text you provided",
      target: () => ref2.current,
    },
    {
      title: "View Quiz",
      description: "Your AI generated quiz questions will appear here",
      target: () => ref3.current,
    },
    // {
    //   title: "Copy Quiz",
    //   description: "Click here to copy the quiz questions",
    //   target: () => ref4.current,
    // },
  ];

  const onGenerateQuiz = async () => {
    setLoading(true);
    if (!value) {
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
    if (quiz.length > 0) {
      try {
        const savedQuiz = await QuizKnitApi.saveQuiz(quiz);
        if (savedQuiz) {
          setSavedQuizId(savedQuiz._id); // add a quiz id key to this object on backend
          setIsModalOpen(true);
          setSavingQuiz(false);
        }
      } catch (e) {
        console.log("e", e);
      }
    }
  };

  return (
    <>
      <Flex justify="center" wrap="wrap" gap={"small"} id="homeContainer">
        <Flex vertical gap="small" align="center">
          <h3>Enter text</h3>
          <Flex ref={ref1}>
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter text"
              autoSize={{ minRows: 15, maxRows: 15 }}
              style={{
                width: isMobile ? 350 : 450,
              }}
              disabled={loading}
              id="inputTextArea"
              // allowClear
            />
          </Flex>
          <Flex justify="center" ref={ref2}>
            <Button
              type="primary"
              onClick={onGenerateQuiz}
              loading={loading}
              icon={<RocketOutlined />}
              //   disabled={value.length === 0}
              size="large"
              style={{ backgroundColor: "#604CE2" }}
            >
              Generate Quiz
            </Button>
          </Flex>
        </Flex>
        <Flex vertical gap="small" align="center">
          <div>
            {quiz.length > 0 ? (
              <Flex gap={24} align="center">
                <h3>Questions</h3>
                {savingQuiz ? (
                  <Spin indicator={<LoadingOutlined spin />} />
                ) : (
                  <Button
                    type="default"
                    icon={<SaveOutlined />}
                    onClick={saveQuiz}
                  />
                )}
              </Flex>
            ) : (
              <h3 style={{ visibility: "hidden" }}>Welcome!</h3>
            )}
          </div>
          <Flex ref={ref3} style={{ width: "500px" }} vertical gap="12px">
            {quiz.length < 1 && (
              <Flex
                style={{
                  padding: "32px",
                  borderRadius: "15px",
                  backgroundColor: "white",
                  justifyContent: "center",
                  height: "50px",
                }}
                vertical
                gap="12px"
              >
                <div>
                  Just exploring? Click <strong>Generate Quiz</strong> to try
                  out a sample quiz using our demo text about the Milky Way!"
                </div>
              </Flex>
            )}
            {quiz.length > 0 &&
              quiz.map((questionItem, index) => (
                <QuestionAndOptions
                  questionItem={questionItem}
                  index={index}
                  key={index}
                />
              ))}
          </Flex>
          {loading && <Spin indicator={<LoadingOutlined spin />} />}
        </Flex>
      </Flex>
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        onClick={() => setOpenTour(true)}
      />
      <SavedQuizModal
        quizId={savedQuizId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
