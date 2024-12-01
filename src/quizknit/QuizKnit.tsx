import { Button, Flex, Spin, Tour, TourProps, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import { QuizKnitApi } from "./QuizKnitApi";
import { sampleInput } from "./sampleData";
import { RocketOutlined, SaveOutlined } from "@ant-design/icons";
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
      description: "Enter text you want to generate a quiz from.",
      target: () => ref1.current,
    },
    {
      title: "Generate Quiz",
      description:
        "Click here to generate a quiz based on the text you provided.",
      target: () => ref2.current,
    },
    {
      title: "View Quiz",
      description:
        "Your AI generated quiz questions will appear here. You will be able to save the quiz afterwards.",
      target: () => ref3.current,
    },
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
        const savedQuizId = await QuizKnitApi.saveQuiz(quiz);
        if (savedQuizId) {
          setSavedQuizId(savedQuizId); // add a quiz id key to this object on backend
          setIsModalOpen(true);
          setSavingQuiz(false);
        }
      } catch (e) {
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
          <Flex ref={ref3} vertical gap="12px">
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
              <Flex ref={ref1}>
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
              <Flex justify="center" ref={ref2}>
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
            ref={ref3}
            vertical
            gap="12px"
            style={{
              padding: "20px",
              backgroundColor: "white",
              width: !isMobile ? "625px" : undefined,
            }}
          >
            {quiz.length < 1 && (
              <Flex vertical gap="12px">
                <Typography.Text>
                  Your AI generated quiz will appear here.
                </Typography.Text>
                <Typography.Text>
                  Just exploring? Try out QuizKnit using our demo text about the
                  milky way.
                </Typography.Text>
                <Typography.Text>
                  Click{" "}
                  <strong
                    onClick={() => setOpenTour(true)}
                    style={{ cursor: "pointer", color: "#604CE2" }}
                  >
                    here
                  </strong>{" "}
                  for a quick app tour.
                </Typography.Text>
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
            {quiz.length > 0 && (
              <Flex justify="center">
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={saveQuiz}
                  loading={savingQuiz}
                >
                  Save Quiz
                </Button>
              </Flex>
            )}
          </Flex>

          {loading && <Spin indicator={<LoadingOutlined spin />} />}
        </Flex>
      </Flex>
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
      <SavedQuizModal
        quizId={savedQuizId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
