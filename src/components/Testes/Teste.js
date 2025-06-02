import React, { useState } from 'react';

function FormAtividade() {
  const [form, setForm] = useState({
    id_sala: '',
    titulo: '',
    professor: '',
    solicitante: '',
    descricao: '',
    data_hora_inicio: '',
    data_hora_fim: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://seu-dominio.com/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setMensagem('Atividade cadastrada com sucesso!');
        setForm({
          id_sala: '',
          titulo: '',
          professor: '',
          solicitante: '',
          descricao: '',
          data_hora_inicio: '',
          data_hora_fim: '',
        });
      } else {
        setMensagem('Erro: ' + result.message);
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Cadastrar Atividade</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Sala:
          <input
            type="number"
            name="id_sala"
            value={form.id_sala}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Professor:
          <input
            type="text"
            name="professor"
            value={form.professor}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Solicitante:
          <input
            type="text"
            name="solicitante"
            value={form.solicitante}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Data/Hora Início:
          <input
            type="datetime-local"
            name="data_hora_inicio"
            value={form.data_hora_inicio}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Data/Hora Fim:
          <input
            type="datetime-local"
            name="data_hora_fim"
            value={form.data_hora_fim}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default FormAtividade;
