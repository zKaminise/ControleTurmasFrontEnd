import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Table, Container } from "react-bootstrap";
import api, { setAuthToken } from "../services/api";
import ModalAluno from "../components/ModalAluno";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [filteredAlunos, setFilteredAlunos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("");
  const [selectedAluno, setSelectedAluno] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchAlunos();
    } else {
      window.location.href = "/";
    }
  }, []);

  const fetchAlunos = async () => {
    const response = await api.get("/alunos");
    setAlunos(response.data);
    setFilteredAlunos(response.data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    filterAlunos(searchTerm, selectedTurma);
  };

  const handleTurmaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const turma = e.target.value;
    setSelectedTurma(turma);
    filterAlunos(search, turma);
  };

  const filterAlunos = (searchTerm: string, turma: string) => {
    const filtered = alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (turma ? aluno.turmasEnum === turma : true)
    );
    setFilteredAlunos(filtered);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      await api.delete(`/alunos/${id}`);
      toast.success('Aluno excluído com sucesso!');
      fetchAlunos();
    }
  };

  const handleEdit = (aluno: any) => {
    setSelectedAluno(aluno);
    setShowModal(true);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedAluno({
      nome: "",
      telefone: "",
      turmasEnum: "",
      transporteEscolar: "",
      adultosResponsaveis: [],
    });
    setShowModal(true);
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (isCreating) {
      await api.post('/alunos', selectedAluno);
      toast.success('Aluno cadastrado com sucesso!');
    } else {
      await api.put(`/alunos/${selectedAluno.id}`, selectedAluno);
      toast.success('Dados do aluno alterados com sucesso!');
    }
    setShowModal(false);
    fetchAlunos();
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="shadow-sm">
        <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <img
            src="https://images.vexels.com/media/users/3/252027/isolated/preview/7d8e277792f119b7d5f52dfb0b4ca11c-a-rga-o-de-acidente-vascular-cerebral-humano.png"
            alt="Logo"
            style={{ width: '55px', height: '55px', marginRight: '10px' }}
          /> Controle de Alunos
        </Navbar.Brand>
        
        <Button variant="success" onClick={handleCreate}>
            Cadastrar Aluno
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Control
            type="text"
            placeholder="Busque pelo nome da criança"
            value={search}
            onChange={handleSearch}
            style={{ width: "50%" }}
          />
          <Form.Select
            value={selectedTurma}
            onChange={handleTurmaChange}
            className="w-auto"
          >
            <option value="">Todas turmas</option>
            <option value="Turma 1A">Turma 1A</option>
            <option value="Turma 1B">Turma 1B</option>
            <option value="Turma 1C">Turma 1C</option>
            <option value="Turma 2A">Turma 2A</option>
            <option value="Turma 2B">Turma 2B</option>
            <option value="Turma 2C">Turma 2C</option>
            <option value="Turma 2D">Turma 2D</option>
            <option value="Turma 3A">Turma 3A</option>
            <option value="Turma 3B">Turma 3B</option>
            <option value="Turma 3C">Turma 3C</option>
            <option value="Turma 4A">Turma 4A</option>
            <option value="Turma 4B">Turma 4B</option>
            <option value="Turma 4C">Turma 4C</option>
            <option value="Turma 5A">Turma 5A</option>
            <option value="Turma 5B">Turma 5B</option>
            <option value="Turma 5C">Turma 5C</option>
            <option value="Turma 6A">Turma 6A</option>
            <option value="Turma 6B">Turma 6B</option>
            <option value="Turma 6C">Turma 6C</option>
            <option value="Turma 7A">Turma 7A</option>
            <option value="Turma 7B">Turma 7B</option>
            <option value="Turma 7C">Turma 7C</option>
            <option value="Turma 8A">Turma 8A</option>
            <option value="Turma 8B">Turma 8B</option>
            <option value="Turma 8C">Turma 8C</option>
            <option value="Turma 9A">Turma 9A</option>
            <option value="Turma 9B">Turma 9B</option>
            <option value="Turma 9C">Turma 9C</option>
          </Form.Select>

        </div>

        <Table striped bordered hover>
          <thead className="bg-primary text-light">
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Telefone</th>
              <th>Transporte Escolar</th>
              <th>Responsáveis</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.turmasEnum}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.transporteEscolar}</td>
                <td>
                  {aluno.adultosResponsaveis.map((responsavel: any) => (
                    <div key={responsavel.id}>
                      {responsavel.nome} ({responsavel.grauParentesco})
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(aluno)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(aluno.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {selectedAluno && (
        <ModalAluno
          show={showModal}
          handleClose={() => setShowModal(false)}
          aluno={selectedAluno}
          setAluno={setSelectedAluno}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default Dashboard;
