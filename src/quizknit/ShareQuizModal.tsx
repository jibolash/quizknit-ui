import { Button, Flex, Modal, Typography } from "antd";

interface SharedQuizModalProps {
  quizId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
}

export function ShareQuizModal({
  isModalOpen,
  setIsModalOpen,
}: SharedQuizModalProps) {
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Share Quiz"
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} type="primary">
          Close
        </Button>,
      ]}
    >
      <Flex vertical align="center">
        <p>Share quiz with the link below.</p>
        <Typography.Paragraph copyable style={{ fontSize: "16px" }}>
          {window.location.href}
        </Typography.Paragraph>
      </Flex>
    </Modal>
  );
}
