import { Flex, Modal, Image, Typography } from "antd";
import imgUrl from "../assets/share-img.png";

interface SavedQuizModalProps {
  quizId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
}

export function SavedQuizModal({
  quizId,
  isModalOpen,
  setIsModalOpen,
}: SavedQuizModalProps) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   if (!quizId) {
  //     return (
  //       <Flex vertical align="center">
  //         <h3>Could not save, please try again!</h3>
  //       </Flex>
  //     );
  //   }
  return (
    <Modal
      // title="Save Quiz"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Flex vertical align="center">
        <Image width={200} src={imgUrl} preview={false} />
        <h3>Your quiz has been saved!</h3>
        <p>Share it with the link below.</p>
        <Typography.Paragraph copyable style={{ fontSize: "16px" }}>
          {`${window.location.href}quiz/${quizId}`}
        </Typography.Paragraph>
      </Flex>
    </Modal>
  );
}
