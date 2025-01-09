import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Table, Container, Modal } from "react-bootstrap";
import api, { setAuthToken } from "../services/api";
import ModalAluno from "../components/ModalAluno";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [filteredAlunos, setFilteredAlunos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("");
  const [selectedAluno, setSelectedAluno] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal de Aluno
  const [showReportModal, setShowReportModal] = useState(false); // Modal de Relatório
  const [isCreating, setIsCreating] = useState(false); // Estado para diferenciar criação/edição

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
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      await api.delete(`/alunos/${id}`);
      toast.success("Aluno excluído com sucesso!");
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
      await api.post("/alunos", {
        ...selectedAluno,
        alunoPodeIrSozinho: selectedAluno.alunoPodeIrSozinho || false, // Garante que o valor será enviado
      });
      toast.success("Aluno cadastrado com sucesso!");
    } else {
      await api.put(`/alunos/${selectedAluno.id}`, {
        ...selectedAluno,
        alunoPodeIrSozinho: selectedAluno.alunoPodeIrSozinho || false, // Garante que o valor será enviado
      });
      toast.success("Dados do aluno alterados com sucesso!");
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
              style={{ width: "55px", height: "55px", marginRight: "10px" }}
            />{" "}
            Controle de Alunos
          </Navbar.Brand>

          <div>
            <Button variant="success" onClick={handleCreate} className="me-2">
              Cadastrar Aluno
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowReportModal(true)}
            >
              Gerar Relatório
            </Button>
          </div>
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
              <th>Embora Sozinho?</th>
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
                <td>{aluno.alunoPodeIrSozinho ? "Sim" : "Não"}</td>
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

        <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Gerar Relatório</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select onChange={(e) => setSelectedTurma(e.target.value)}>
              <option value="">Selecione a Turma</option>
              <option value="TURMA_1A">Turma 1A</option>
              <option value="TURMA_1B">Turma 1B</option>
              <option value="TURMA_1C">Turma 1C</option>
              <option value="TURMA_2A">Turma 2A</option>
              <option value="TURMA_2B">Turma 2B</option>
              <option value="TURMA_2C">Turma 2C</option>
              <option value="TURMA_2D">Turma 2D</option>
              <option value="TURMA_3A">Turma 3A</option>
              <option value="TURMA_3B">Turma 3B</option>
              <option value="TURMA_3C">Turma 3C</option>
              <option value="TURMA_4A">Turma 4A</option>
              <option value="TURMA_4B">Turma 4B</option>
              <option value="TURMA_4C">Turma 4C</option>
              <option value="TURMA_5A">Turma 5A</option>
              <option value="TURMA_5B">Turma 5B</option>
              <option value="TURMA_5C">Turma 5C</option>
              <option value="TURMA_6A">Turma 6A</option>
              <option value="TURMA_6B">Turma 6B</option>
              <option value="TURMA_6C">Turma 6C</option>
              <option value="TURMA_7A">Turma 7A</option>
              <option value="TURMA_7B">Turma 7B</option>
              <option value="TURMA_7C">Turma 7C</option>
              <option value="TURMA_8A">Turma 8A</option>
              <option value="TURMA_8B">Turma 8B</option>
              <option value="TURMA_8C">Turma 8C</option>
              <option value="TURMA_9A">Turma 9A</option>
              <option value="TURMA_9B">Turma 9B</option>
              <option value="TURMA_9C">Turma 9C</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReportModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                  toast.error(
                    "Você precisa estar logado para gerar o relatório."
                  );
                  return;
                }

                if (selectedTurma) {
                  try {
                    const response = await api.get(
                      `/alunos/relatorio/${selectedTurma}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        responseType: "blob", // Garantir que a resposta seja um arquivo PDF
                      }
                    );

                    // Abrir o PDF em uma nova aba
                    const pdfUrl = window.URL.createObjectURL(
                      new Blob([response.data], { type: "application/pdf" })
                    );
                    window.open(pdfUrl, "_blank");

                    toast.success("Relatório gerado com sucesso!");
                  } catch (error) {
                    toast.error("Erro ao gerar o relatório!");
                  }
                } else {
                  toast.error(
                    "Selecione uma turma antes de gerar o relatório!"
                  );
                }
                setShowReportModal(false);
              }}
            >
              Gerar
            </Button>
          </Modal.Footer>
        </Modal>
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
