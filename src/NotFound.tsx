import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Flex vertical justify="center" align="center" gap={20}>
      <Flex>404 | This page does not exist.</Flex>
      <Typography.Text>
        Click
        <Link to="/explore" style={{ color: "gray" }}>
          {" "}
          here
        </Link>{" "}
        to explore existing quizzes.
      </Typography.Text>
    </Flex>
  );
}
