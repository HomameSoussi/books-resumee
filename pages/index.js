import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  color: #0e76a8;
  font-size: 2.5em;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 300px;
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0e76a8;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 100%;
  }
  &:hover {
    background-color: #094a6a;
  }
`;

const SummaryContainer = styled.div`
  margin-top: 20px;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SummaryTitle = styled.h2`
  color: #333;
`;

export default function Home() {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/get-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookTitle, author }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <Container>
      <Title>Résumé de Livre</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Titre du Livre"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Auteur (Optionnel)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Button type="submit">Obtenir le Résumé</Button>
      </Form>
      {summary && (
        <SummaryContainer>
          <SummaryTitle>Résumé:</SummaryTitle>
          <p>{summary}</p>
        </SummaryContainer>
      )}
    </Container>
  );
}
