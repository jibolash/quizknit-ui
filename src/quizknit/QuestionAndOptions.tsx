import { Flex, Radio, Space } from "antd";
import { Question } from "./QuizKnit";
import { useEffect, useState } from "react";

interface QuestionsProps {
  questionItem: Question;
  index: number;
}

export function QuestionAndOptions({ questionItem, index }: QuestionsProps) {
  const [answer, setAnswer] = useState(null);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (answer == null) {
      return;
    }
    setCorrectAnswerSelected(questionItem.options[answer].isCorrectAnswer);
  }, [answer]);

  return (
    <Flex
      vertical
      gap="5px"
      key={index}
      style={{
        padding: "20px",
        borderRadius: "20px",
        backgroundColor: "#F1F5F9",
      }}
    >
      <Flex>
        <strong>
          {index + 1}. {questionItem.question}
        </strong>
      </Flex>
      <Flex vertical gap="12px">
        <Radio.Group
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          value={answer}
        >
          <Space direction="vertical">
            {questionItem.options.map((option, index) => (
              <Radio value={index} key={index}>
                {option.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        {/* {correctAnswerSelected == null && (
          <Flex style={{ height: "18px", opacity: 0 }}>ff</Flex>
        )} */}
        {correctAnswerSelected == false && (
          <Flex style={{ color: "red" }}>Wrong answer, try again</Flex>
        )}
        {correctAnswerSelected && (
          <Flex style={{ color: "green" }}>Correct!</Flex>
        )}
      </Flex>
    </Flex>
  );
}
