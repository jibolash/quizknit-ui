import { ConfigProvider, Flex, Space } from "antd";
import { NavLink, Route, Routes } from "react-router-dom";
import { QuizKnit } from "./quizknit/QuizKnit";
import { Quiz } from "./quizknit/Quiz";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#604CE2",
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
            // justify="center"
            align="center"
            id="navbar"
            style={{ height: "60px", backgroundColor: "#604CE2" }}
          >
            <NavLink
              to="/"
              style={{
                color: "white",
                fontSize: "20px",
                marginLeft: "12px",
              }}
            >
              <Flex align="end">
                <Space size={4}>
                  <Flex gap={8}>
                    <span className="logo">Q</span>
                    <span style={{ fontWeight: 600 }}>Quiz Knit</span>
                  </Flex>
                  {/* <Flex>
                    <span style={{ fontSize: "14px" }}>by Mayowa Sogbein</span>
                  </Flex> */}
                </Space>
              </Flex>
            </NavLink>
          </Flex>
          <Flex id="main" justify="center">
            <Routes>
              <Route path="/" element={<QuizKnit />} />
              <Route path="/quiz/:id" element={<Quiz />} />
            </Routes>
          </Flex>
        </Flex>
        <Flex
          justify="center"
          align="center"
          id="footer"
          style={{ height: "60px" }}
        >
          <Flex gap={8} align="center" justify="center">
            <span className="logo-footer">Q</span>
            <span style={{ fontWeight: 600, fontSize: "14px" }}>Quiz Knit</span>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
