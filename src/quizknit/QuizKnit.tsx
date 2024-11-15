import {
  Button,
  Flex,
  FloatButton,
  Radio,
  Space,
  Spin,
  Tour,
  TourProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import { QuizKnitApi } from "./QuizKnitApi";
import { sampleInput, sampleQuiz } from "./sampleData";
import {
  CheckOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { QuestionAndOptions } from "./QuestionAndOptions";

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
  const ref4 = useRef(null);

  const [value, setValue] = useState(sampleInput);
  const [loading, setLoading] = useState(false);
  const [resultValue, setResultValue] = useState(sampleQuiz);
  const [copyShowing, setCopyShowing] = useState(true);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

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
    setResultValue("Generating quiz...");
    if (!value) {
      return;
    }
    const quizTextInput: QuizTextInput = {
      textInput: value,
    };
    try {
      const createdQuiz = await QuizKnitApi.generateQuiz(quizTextInput);
      console.log("createdQuiz", createdQuiz);
      if (createdQuiz) {
        setQuestions(createdQuiz);
        setResultValue(createdQuiz);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      console.log("Please enter text input");
    }
  };

  const onCopyClicked = () => {
    setCopyShowing(false);
    navigator.clipboard.writeText(resultValue);
    setTimeout(() => {
      setCopyShowing(true);
    }, 3000);
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
              disabled={value.length === 0}
              size="large"
              style={{ backgroundColor: "#604CE2" }}
            >
              Generate Quiz
            </Button>
          </Flex>
        </Flex>
        <Flex vertical gap="small" align="center">
          <div>
            {questions.length > 0 ? (
              <h3>Questions</h3>
            ) : (
              <h3 style={{ visibility: "hidden" }}>Welcome!</h3>
            )}
          </div>
          <Flex ref={ref3} style={{ width: "500px" }} vertical gap="12px">
            {/* <TextArea
              value={resultValue}
              // onChange={(e) => setResultValue(e.target.value)}
              placeholder="Enter text"
              autoSize={{ minRows: 25, maxRows: 25 }}
              style={{ width: isMobile ? 350 : 450, caretColor: "transparent" }}
              disabled={loading}
            /> */}
            {questions.length < 1 && (
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
            {questions.length > 0 &&
              questions.map((questionItem, index) => (
                <QuestionAndOptions
                  questionItem={questionItem}
                  index={index}
                  key={index}
                />
              ))}
          </Flex>
          {loading && <Spin />}
          {/* {!loading && resultValue && (
            <Button
              ref={ref4}
              onClick={onCopyClicked}
              icon={copyShowing ? <CopyOutlined /> : <CheckOutlined />}
            />
          )} */}
        </Flex>
      </Flex>
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{ right: 24, top: 10 }}
        onClick={() => setOpenTour(true)}
      />
    </>
  );
}

let questionsArr = [
  {
    question: "From Earth, the Milky Way appears as:",
    options: [
      {
        text: "A hazy band of light",
        isCorrectAnswer: true,
      },
      {
        text: "A spiral galaxy",
        isCorrectAnswer: false,
      },
      {
        text: "A bright star",
        isCorrectAnswer: false,
      },
      {
        text: "A circle in the sky",
        isCorrectAnswer: false,
      },
    ],
  },
  {
    question: "The term Milky Way is a translation of the Latin:",
    options: [
      {
        text: "Via lactea",
        isCorrectAnswer: false,
      },
      {
        text: "Galaxías kýklos",
        isCorrectAnswer: true,
      },
      {
        text: "Hazy band",
        isCorrectAnswer: false,
      },
      {
        text: "Solar System",
        isCorrectAnswer: false,
      },
    ],
  },
  {
    question:
      "Who was the first to resolve the band of light into individual stars with his telescope?",
    options: [
      {
        text: "Galileo Galilei",
        isCorrectAnswer: true,
      },
      {
        text: "Edwin Hubble",
        isCorrectAnswer: false,
      },
      {
        text: "Harlow Shapley",
        isCorrectAnswer: false,
      },
      {
        text: "Heber Doust Curtis",
        isCorrectAnswer: false,
      },
    ],
  },
];
