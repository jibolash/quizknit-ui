import { ConfigProvider, Flex, Layout, Space } from 'antd'
import { NavLink, Route, Routes } from 'react-router-dom'
import { QuizKnit } from './quizknit/QuizKnit'
import { Content, Footer, Header } from 'antd/es/layout/layout'

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          // borderRadius: 16,
          colorPrimary: '#00152A',
        },
        components: {
          Button: {
          },
          Input: {
            paddingBlock: 6
          }
        }
      }}
    >
      <Layout style={{ paddingTop: 'env(safe-area-inset-top)', height: '100vh' }}>
        <Header>
          <Flex justify="center">
            <Flex justify="center">
              <Space align='end'>
                <NavLink
                  to="/"
                  style={{ color: 'white', fontSize: '20px', fontFamily: 'Open Sans' }}
                >
                  <strong>Quiz Knit</strong>
                </NavLink>
              </Space>
            </Flex>
          </Flex>
        </Header>

        <Content>
          <Routes>
            <Route path='/' element={<QuizKnit />} />
          </Routes>
        </Content>
        <Footer>
          <Flex justify='center' align='center' vertical>
            <Flex>
              <strong>QuizKnit</strong>
            </Flex>
            <Flex>
              Copyright &copy; 2024, Mayowa Sogbein
            </Flex>
          </Flex>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
