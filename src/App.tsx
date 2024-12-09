import { ConfigProvider, Flex, Space, Tour, TourProps } from "antd";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { QuizKnit } from "./quizknit/QuizKnit";
import { ViewQuiz } from "./quizknit/ViewQuiz";
import { About } from "./About";
import { Explore } from "./quizknit/Explore";
import { useRef, useState } from "react";
// import { SignIn } from "./SignIn";
// import { SignUp } from "./SignUp";
// import { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  // const [user, setUser] = useState();

  // const getUser = async () => {
  //   try {
  //     const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     console.log(data.user);
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);

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
    {
      title: "Explore",
      description:
        "Test your knowledge by exploring quizzes created by other users.",
      target: () => ref4.current,
    },
  ];

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
            align="center"
            id="navbar"
            style={{ height: "60px", backgroundColor: "#604CE2" }}
            justify="space-between"
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
                </Space>
              </Flex>
            </NavLink>
            <Flex style={{ marginRight: "12px", color: "white" }} gap={4}>
              <Flex ref={ref4}>
                <NavLink
                  to={"/explore"}
                  className={({ isActive }) =>
                    isActive ? "activeNavLink" : "inactiveNavLink"
                  }
                >
                  Explore
                </NavLink>
              </Flex>
            </Flex>
          </Flex>
          <Flex id="main" justify="center">
            <Routes>
              <Route
                path="/"
                element={
                  <QuizKnit
                    tourSteps={{ ref1, ref2, ref3 }}
                    setOpenTour={setOpenTour}
                  />
                }
                // element={
                //   user ? <QuizKnit user={user} /> : <Navigate to={"/login"} />
                // }
              />
              <Route path="/quiz/:id" element={<ViewQuiz />} />
              <Route path="/about" element={<About />} />
              <Route path="/explore" element={<Explore />} />
              {/* <Route path="/login" element={<SignIn />} /> */}
              {/* <Route path="/signup" element={<SignUp />} /> */}
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
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
    </ConfigProvider>
  );
}

export default App;
