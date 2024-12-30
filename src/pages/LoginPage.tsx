import React, { useState } from 'react';
import { Form, Button, Modal, Container, Card } from 'react-bootstrap';
import api from '../services/api';

const LoginPage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Erro no login. Verifique suas credenciais.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', registerData);
      alert('Usuário registrado com sucesso!');
      setShowRegister(false);
    } catch (error) {
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ backgroundImage: 'url(./src/assets/bkgLoginImage.jpg)', backgroundSize: 'cover'}}
    >
      <Card className="shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4 w-100">
            Entrar
          </Button>
          <Button
            variant="link"
            className="mt-3 w-100 text-primary"
            onClick={() => setShowRegister(true)}
          >
            Registrar-se
          </Button>
        </Form>
      </Card>

      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="registerUsername">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
                value={registerData.username}
                onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={registerData.password}
                onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Registrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LoginPage;
