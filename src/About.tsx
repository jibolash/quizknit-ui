import { Flex } from "antd";

export function About() {
  return (
    <Flex style={{ width: "50%" }}>
      <main>
        <section>
          <p>
            Welcome to <strong>QuizKnit</strong>, your go-to tool for turning
            any text into an engaging quiz in seconds! Whether you're a teacher,
            student, or lifelong learner, QuizKnit makes it easy to transform
            knowledge into an interactive format, helping you retain and test
            your understanding.
          </p>
        </section>
        <section>
          <h2>Our Mission</h2>
          <p>
            At QuizKnit, we believe that learning should be accessible,
            engaging, and fun. By leveraging cutting-edge technology, we aim to
            bridge the gap between static content and interactive learning,
            making it easier for everyone to create and share quizzes
            effortlessly.
          </p>
        </section>
        <section>
          <h2>How It Works</h2>
          <ol>
            <li>
              <strong>Enter Text</strong>: Copy and paste any body of text—be it
              an article, chapter, or notes—into our app.
            </li>
            <li>
              <strong>Generate Quiz</strong>: With just one click, QuizKnit
              processes the text and creates a custom quiz tailored to the
              content.
            </li>
            <li>
              <strong>Share &amp; Learn</strong>: Take the quiz yourself or
              share it with others for collaborative learning.
            </li>
          </ol>
        </section>
        <section>
          <h2>Why QuizKnit?</h2>
          <ul>
            <li>
              <strong>Simplicity</strong>: No technical knowledge is needed—just
              enter your text and let QuizKnit do the work.
            </li>
            <li>
              <strong>Efficiency</strong>: Save hours of creating quizzes
              manually.
            </li>
            <li>
              <strong>Versatility</strong>: Great for educators creating
              assessments, students preparing for exams, or anyone curious to
              test their knowledge.
            </li>
          </ul>
        </section>
        <section>
          <h2>Open Source</h2>
          <p>
            QuizKnit is proudly open source. Check out the code on GitHub and
            feel free to contribute or suggest improvements.
          </p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            Have feedback, questions, or suggestions? I'll love to hear from
            you! Reach out via email at{" "}
            <a href="mailto:mayowa.sogbein@gmail.com">
              mayowa.sogbein@gmail.com
            </a>{" "}
            or connect with me on{" "}
            <a href="https://www.linkedin.com/in/mayowa-sogbein/">LinkedIn</a>.
          </p>
        </section>
        <p>Start creating smarter quizzes today with QuizKnit! 🚀</p>
      </main>
    </Flex>
  );
}
