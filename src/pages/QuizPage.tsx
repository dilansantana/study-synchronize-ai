
import React from 'react';
import Layout from '@/components/Layout';
import QuizComponent from '@/components/QuizComponent';

const QuizPage: React.FC = () => {
  return (
    <Layout>
      <QuizComponent timeLimit={90} />
    </Layout>
  );
};

export default QuizPage;
