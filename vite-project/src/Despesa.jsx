import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Formulario({ onDespesaAdicionada }) {
  const [show, setShow] = useState(false);
  const [despesa, setDespesa] = useState('');
  const [valor, setValor] = useState('');
  const [vencimento, setVencimento] = useState('');

  const fechar = () => setShow(false);
  const abrir = () => setShow(true);

  const Adicionar = () => {
    const novaDespesa = {
      despesa: despesa,
      valor: parseFloat(valor),
      vencimento: vencimento,
    };

    onDespesaAdicionada(novaDespesa);
    fechar();
    setDespesa('');
    setValor('');
    setVencimento('');
  };

  return (
    <>
      <Button variant="primary mt-5" onClick={abrir}>
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
          <Button variant="primary" onClick={Adicionar}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Despesa() {
  const [listaDespesas, setListaDespesas] = useState(
    JSON.parse(localStorage.getItem('despesas')) || []
  );
  const [valorDisponivel, setValorDisponivel] = useState(
    parseFloat(localStorage.getItem('valorDisponivel')) || 0
  );
  const [despesaMaisProxima, setDespesaMaisProxima] = useState(null);

  const adicionarDespesa = (despesa) => {
    setListaDespesas([...listaDespesas, despesa]);
    setValorDisponivel(valorDisponivel - despesa.valor);
  };

  const calcularTotalDespesas = () => {
    let total = 0;
    listaDespesas.forEach((despesa) => {
      total +=despesa.valor;
    });
    return total.toFixed(2);
  };

  const calcularDiasRestantes = (vencimento) => {
    const dataVencimento = new Date(vencimento);
    const dataAtual = new Date();
    const diferencaTempo = dataVencimento.getTime() - dataAtual.getTime();
    const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
    return diferencaDias;
  };

  const limparDespesas = () => {
    setListaDespesas([]);
    setValorDisponivel(0);
    localStorage.removeItem('despesas');
    localStorage.removeItem('valorDisponivel');
  };

  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(listaDespesas));
    localStorage.setItem('valorDisponivel', valorDisponivel.toString());

    const despesasOrdenadas = [...listaDespesas];
    despesasOrdenadas.sort((a, b) => {
      const diasA = calcularDiasRestantes(a.vencimento);
      const diasB = calcularDiasRestantes(b.vencimento);
      return diasA - diasB;
    });
    setDespesaMaisProxima(despesasOrdenadas[0]);
  }, [listaDespesas, valorDisponivel]);

  return (
    <div className="container">
      <Formulario onDespesaAdicionada={adicionarDespesa} />
      <div className="row mt-5">
        <div className="col-9">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Vencimento</th>
                <th scope="col">Situação</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {listaDespesas.map((despesa, index) => (
                <tr key={index}>
                  <td>{despesa.despesa}</td>
                  <td>R$ {despesa.valor.toFixed(2)}</td>
                  <td>{despesa.vencimento}</td>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault${index}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckDefault${index}`}
                      >
                        Paga
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Total de Despesas</Card.Title>
              <Card.Text>R$ {calcularTotalDespesas()}</Card.Text>
              <Form>
                <Form.Group controlId="formValorDisponivel">
                  <Form.Label>Valor Disponível</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Insira o valor disponível"
                    value={valorDisponivel}
                    onChange={(e) => setValorDisponivel(parseFloat(e.target.value))}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          {despesaMaisProxima && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Próxima Despesa</Card.Title>
<Card.Text>
                  <strong>Descrição:</strong> {despesaMaisProxima.despesa}
                </Card.Text>
                <Card.Text>
                  <strong>Valor:</strong> R$ {despesaMaisProxima.valor}
                </Card.Text>
                <Card.Text>
                  <strong>Dias Restantes:</strong> {calcularDiasRestantes(despesaMaisProxima.vencimento)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          <Button variant="danger mt-4" onClick={limparDespesas}>
            Limpar Despesas
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Despesa;
