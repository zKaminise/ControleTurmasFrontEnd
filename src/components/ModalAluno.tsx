import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface ModalAlunoProps {
  show: boolean;
  handleClose: () => void;
  aluno: any;
  setAluno: (aluno: any) => void;
  handleSave: () => void;
}

const ModalAluno: React.FC<ModalAlunoProps> = ({
  show,
  handleClose,
  aluno,
  setAluno,
  handleSave,
}) => {
  const [nomeErro, setNomeErro] = useState("");

  const verificarNomeDisponivel = async (nome: string) => {
    if (!nome.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/alunos/check-nome?nome=${nome}`
      );
      const data = await response.json();
      if (data) {
        setNomeErro(
          "O aluno já está cadastrado no sistema. Para mudar algo, acione a coordenação."
        );
      } else {
        setNomeErro("");
      }
    } catch (error) {
      console.error("Erro ao verificar o nome:", error);
      setNomeErro("Erro ao verificar o nome. Tente novamente.");
    }
  };

  const handleResponsavelChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedResponsaveis = [...aluno.adultosResponsaveis];
    updatedResponsaveis[index][field] = value;
    setAluno({ ...aluno, adultosResponsaveis: updatedResponsaveis });
  };

  const addResponsavel = () => {
    setAluno({
      ...aluno,
      adultosResponsaveis: [
        ...aluno.adultosResponsaveis,
        { nome: "", grauParentesco: "" },
      ],
    });
  };

  const removeResponsavel = (index: number) => {
    const updatedResponsaveis = aluno.adultosResponsaveis.filter(
      (_: any, i: number) => i !== index
    );
    setAluno({ ...aluno, adultosResponsaveis: updatedResponsaveis });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4" controlId="formNome">
            <Form.Label>
              <strong>Nome do Aluno</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={aluno.nome}
              onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
              onBlur={(e) => verificarNomeDisponivel(e.target.value)}
              placeholder="Digite o nome completo"
              required
            />
            {nomeErro && (
              <div style={{ color: "red", marginTop: "5px" }}>{nomeErro}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formTelefone">
            <Form.Label>
              <strong>Telefone do Responsável</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              value={aluno.telefone}
              onChange={(e) => setAluno({ ...aluno, telefone: e.target.value })}
              placeholder="Digite o telefone atualizado do responsável"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formTransporte">
            <Form.Label>
              <strong>Transporte Escolar</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="transporteEscolar"
              value={aluno.transporteEscolar}
              onChange={(e) =>
                setAluno({ ...aluno, transporteEscolar: e.target.value })
              }
              placeholder="Digite o nome do transportador (se aplicável)"
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formTurma">
            <Form.Label>
              <strong>Turma do Aluno</strong>
            </Form.Label>
            <Form.Select
              name="turmasEnum"
              value={aluno.turmasEnum}
              onChange={(e) =>
                setAluno({ ...aluno, turmasEnum: e.target.value })
              }
            >
              <option value="">Selecione</option>
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
          </Form.Group>

          <h4>Responsáveis</h4>
          {aluno.adultosResponsaveis.map((responsavel: any, index: number) => (
            <Card className="p-3 mb-3" key={index}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId={`responsavelNome-${index}`}>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={responsavel.nome}
                      onChange={(e) =>
                        handleResponsavelChange(index, "nome", e.target.value)
                      }
                      placeholder="Nome do responsável"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId={`responsavelParentesco-${index}`}>
                    <Form.Label>Parentesco</Form.Label>
                    <Form.Select
                      value={responsavel.grauParentesco}
                      onChange={(e) =>
                        handleResponsavelChange(
                          index,
                          "grauParentesco",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="Pai">Pai</option>
                      <option value="Mãe">Mãe</option>
                      <option value="Avó/Avô">Avó/Avô</option>
                      <option value="Irmao">Irmão</option>
                      <option value="Irmão">Irmã</option>
                      <option value="Tio/Tia">Tio/Tia</option>
                      <option value="Primo/Prima">Primo/Prima</option>
                      <option value="Transporte Escolar">Transporte Escolar</option>
                      <option value="Outro">Outro</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    variant="danger"
                    onClick={() => removeResponsavel(index)}
                    className="w-100 d-flex justify-content-center align-items-center"
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}

          <Button
            variant="success"
            onClick={addResponsavel}
            className="w-100 mb-4"
          >
            Adicionar mais um Responsável
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAluno;
