import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario() {
  const [show, setShow] = useState(false);
  const [despesa, setDespesa] = useState('');
  const [valor, setValor] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [listaDespesas, setListaDespesas] = useState([]);

  const fechar = () => setShow(false);
  const mostrar = () => setShow(true);

  const adicionar = () => {
    const novaDespesa = {
      despesa: despesa,
      valor: valor,
      vencimento: vencimento,
    };

    setListaDespesas([...listaDespesas, novaDespesa]);
    fechar();
  };

  return (
    <>
      <Button variant="primary mt-5" onClick={mostrar}>
        Adicionar Despesa
      </Button>

      <Modal show={show} onHide={fechar}>
        <Modal.Header closeButton>
          <Modal.Title>Adicione sua Despesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Despesa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descreva sua despesa"
                value={despesa}
                onChange={(e) => setDespesa(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor da despesa"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Vencimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data do vencimento"
                value={vencimento}
                onChange={(e) => setVencimento(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fechar}>
            Fechar
          </Button>
          <Button variant="primary" onClick={adicionar}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

      <ul>
        {listaDespesas.map((despesa, index) => (
          <li key={index}>
            Despesa: {despesa.despesa}, Valor: {despesa.valor}, Vencimento: {despesa.vencimento}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Formulario;
