import './App.css';
import Calendar from './components/Calendar/Calendar';

function App() {
  const enviarDadoMockado = async () => {
    const mock = {
      id_atividade: 1,
      id_sala: 1,
      titulo: 'Teste Automático 2',
      professor: 'Prof. Teste',
      solicitante: 'Sistema',
      descricao: 'Esta é uma atividade de teste enviada automaticamente.',
      data_hora_inicio: '2025-06-05 14:00:00',
      data_hora_fim: '2025-06-05 16:00:00',
    };

    try {
      const response = await fetch(
        'https://rockmuriae.com.br/sistema/api/postEdit.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mock),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success) {
        alert('✅ Sucesso ao inserir atividade mockada!');
      } else {
        alert('❌ Erro: ' + result.message);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('❌ Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <button onClick={() => enviarDadoMockado()}>TESTAR</button>
      {/* <Calendar /> */}
    </>
  );
}

export default App;
