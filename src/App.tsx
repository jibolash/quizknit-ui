import { ConfigProvider, Flex, Space } from "antd";
import { NavLink, Route, Routes } from "react-router-dom";
import { QuizKnit } from "./quizknit/QuizKnit";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "green",
        },
        components: {
          Button: {
            defaultShadow: "0 0 0 rgba(0, 0, 0, 0.02)",
            primaryShadow: "0 0 0 rgba(0, 0, 0, 0.02)",
            borderRadiusLG: 25,
          },
          Input: {
            paddingBlock: 6,
          },
        },
      }}
    >
      <Flex vertical style={{ minHeight: "100vh" }}>
        <Flex vertical style={{ flexGrow: 1 }}>
          <Flex
            justify="center"
            align="center"
            id="navbar"
            style={{ height: "60px", backgroundColor: "green" }}
          >
            <Space align="end">
              <NavLink
                to="/"
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "Open Sans",
                }}
              >
                <strong>Quiz Knit</strong>
              </NavLink>
            </Space>
          </Flex>
          <Flex id="main" justify="center">
            <Routes>
              <Route path="/" element={<QuizKnit />} />
            </Routes>
          </Flex>
        </Flex>
        <Flex
          justify="center"
          align="center"
          vertical
          id="footer"
          style={{ height: "60px" }}
        >
          <Flex>
            <strong style={{ color: "black" }}>QuizKnit</strong>
          </Flex>
          <Flex>Copyright &copy; 2024, Mayowa Sogbein</Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
