import { CalendarOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { Link } from "react-router-dom";
import { QuizKnitApi } from "./QuizKnitApi";
import { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { Quiz } from "./QuizKnit";

export function Explore() {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);

  const {
    loading: _loading,
    status: _status,
    error: _error,
    execute: fetchAllQuizzes,
  } = useAsync(() => QuizKnitApi.getAllQuizzes(), [], {
    onSuccess(result) {
      setAllQuizzes(result);
    },
  });

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  return (
    <Flex wrap gap={"small"} style={{ margin: "12px" }}>
      {allQuizzes.map((quiz) => (
        <Flex>
          <Link to={`/quiz/${quiz._id}`}>
            <Card>
              <strong>{quiz.quizTitle}</strong>
              {quiz.dateCreated && (
                <p style={{ color: "gray", margin: "0", fontSize: "12px" }}>
                  <CalendarOutlined />{" "}
                  {new Date(quiz.dateCreated).toDateString()}
                </p>
              )}
            </Card>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
}
