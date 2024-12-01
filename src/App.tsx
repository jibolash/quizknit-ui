import { ConfigProvider, Flex, Space } from "antd";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { QuizKnit } from "./quizknit/QuizKnit";
import { Quiz } from "./quizknit/Quiz";
import { About } from "./About";
import { Discover } from "./quizknit/Discover";

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
                  {/* <Flex>
                    <Link to="/discover"></Link>
                  </Flex> */}
                </Space>
              </Flex>
            </NavLink>
          </Flex>
          <Flex id="main" justify="center">
            <Routes>
              <Route path="/" element={<QuizKnit />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/about" element={<About />} />
              <Route path="/discover" element={<Discover />} />
            </Routes>
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          id="footer"
          style={{ height: "60px", margin: "0 12px 0 12px", fontSize: "14px" }}
        >
          <Flex gap={8} align="center" justify="center">
            <span className="logo-footer">Q</span>
            <span style={{ fontWeight: 600 }}>Quiz Knit</span>
          </Flex>
          <Flex>
            <Link to="/about" style={{ color: "gray" }}>
              About
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
