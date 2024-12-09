import { GoogleOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
} from "antd";
import { isMobile } from "react-device-detect";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export function SignIn() {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const googleSignIn = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <Flex
      style={{
        backgroundColor: "white",
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "12px",
      }}
      vertical
    >
      <Flex justify="center">
        <Typography.Title level={3}>Sign In</Typography.Title>
      </Flex>
      <Button
        type="default"
        htmlType="submit"
        size="large"
        icon={<GoogleOutlined />}
        onClick={googleSignIn}
      >
        Sign in with Google
      </Button>
      <Divider plain>or</Divider>
      <Form
        name="signup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ minWidth: !isMobile ? "450px" : undefined }}
      >
        <Flex vertical>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input size={"large"} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password size={"large"} />
          </Form.Item>
          <Flex justify="center">
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" size="large">
                Sign In
              </Button>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
