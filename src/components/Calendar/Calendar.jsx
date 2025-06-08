import { useEffect, useState } from 'react';
import './Calendar.css';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';
import Form from '../Form/Form';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import logoSimulab from '../../assets/logoSimulabSemFundo.png';

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  while (days.length < 42) {
    days.push(null);
  }

  return days;
};

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const Calendar = ({ setLogged }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [visible, setVisible] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [allActivities, setAllActivities] = useState([]);
  const [room, setRoom] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (room !== '')
      handleGetActivities();
    else
      setAllActivities([])
  }, [room])

  const handleCleanForm = () => {
    setEditMode(false);
    setForm({
      id_sala: '',
      titulo: '',
      professor: '',
      solicitante: '',
      descricao: '',
      data_hora_inicio: '',
      data_hora_fim: '',
      dia: ''
    });
  }

  const getHourAndMinutes = (dateTimeString) => {
    const [date, time] = dateTimeString.split(' ');
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
  }

  const handleGetActivities = async () => {
    if (!room) return;
    setLoading(true);

    try {

      // const response = await fetch('https://rockmuriae.com.br/sistema/api/get_atividades.php?id_sala=1&id_atividade=9');
      const response = await fetch(`https://rockmuriae.com.br/sistema/api/get_atividades_2.php?id_sala=${room}`);
      const data = await response.json();

      if (data.success) {
        // console.log('Atividades:', data?.data);
        setAllActivities(data?.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const [form, setForm] = useState({
    id_sala: '',
    titulo: '',
    professor: '',
    solicitante: '',
    descricao: '',
    data_hora_inicio: '',
    data_hora_fim: '',
    dia: ''
  });

  const handleFillForm = (activity, day) => {
    setForm(activity);
    setModalId(day);
    setVisible(!visible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleVerifyDayError = () => {
  //   let error = false;
  //   const beginDate = form?.data_hora_inicio.split('-');
  //   const endDate = form?.data_hora_fim.split('-');
  //   if (!editMode) {
  //     if (Number(beginDate[2].slice(0, 2)) != modalId || Number(endDate[2].slice(0, 2)) != modalId) {
  //       error = true;
  //     }
  //   } else {
  //     if (Number(beginDate[2].slice(0, 2)) != form?.dia || Number(endDate[2].slice(0, 2)) != form?.dia) {
  //       error = true;
  //     }
  //   }
  //   return error;
  // }

  const handleRemoveActivity = async () => {
    const confirmar = window.confirm("Tem certeza que deseja deletar esta atividade?");

    if (!confirmar) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://rockmuriae.com.br/sistema/api/delete.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_atividade: form?.id_atividade }),
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        handleGetActivities();
        setVisible(false);
        console.log('Atividade deletada com sucesso!');
      } else {
        setLoading(false);
        console.warn('Erro:', data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao deletar a atividade:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (handleVerifyDayError()) {
    //   toast.warning('Data divergente da previamente selecionada!')
    //   return;
    // }
    setLoading(true);
    // if (form.dia === 0 || form.dia === "" && !editMode) {
    //   form.dia = modalId;
    // } else {
    //   form.dia = Number(form?.data_hora_inicio.split('-')[2].slice(0, 2))
    // }
    form.dia = Number(form?.data_hora_inicio.split('-')[2].slice(0, 2))
    form.id_sala = room;

    try {
      const response = await fetch('https://rockmuriae.com.br/sistema/api/postEdit2.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setForm({
          id_sala: '',
          titulo: '',
          professor: '',
          solicitante: '',
          descricao: '',
          data_hora_inicio: '',
          data_hora_fim: '',
          dia: ''
        });
        setLoading(false);
        toast.success('Evento salvo com sucesso!')
        handleGetActivities();
        setVisible(!visible)
      } else {
        setLoading(false);
        toast.warning('Erro: ' + result.message)
        setMessage('Erro: ' + result.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Erro de conexão com o servidor.');
      console.error(error);
    }
  };

  const days = generateCalendar(year, month);

  const nextMonth = () => {
    console.log(month);
    setMonth((m) => (m === 11 ? 0 : m + 1));
    if (month === 11) setYear((y) => y + 1);
  };

  const prevMonth = () => {
    setMonth((m) => (m === 0 ? 11 : m - 1));
    if (month === 0) setYear((y) => y - 1);
  };

  return (
    <>
      <div className='calendarHeader'>
        <img src={logoSimulab} alt="Logo Simulab" />
        <div className='logout'>
          <label>Logout</label>
          <Icon name={'cilAccountLogout'} iconSize='26px' cursor='pointer' onClick={() => {
            setLogged(false);
            localStorage.removeItem('data');
          }} />
        </div>
      </div>
      <div className="calendarContainer">
        <Loading show={loading} />
        {/* <button onClick={handleGetActivities}>TESTAR</button> */}
        <select className="form-control rounded-0 mb-2" onChange={(e) => setRoom(e.target.value)}>
          <option value=""> -- Selecione uma sala -- </option>
          <option value="1">Simulação 1</option>
          <option value="2">Simulação 2</option>
          <option value="3">Simulação 3</option>
          <option value="4">Simulação 4</option>
          <option value="5">Observação 1</option>
          <option value="6">Observação 2</option>
          <option value="7">Observação 3</option>
          <option value="8">Observação 4</option>
          <option value="9">Debriefing 1</option>
          <option value="10">Habilidades 1</option>
          <option value="11">Habilidades 2</option>
          <option value="12">Consultório 1</option>
          <option value="13">Consultório 2</option>
          <option value="14">Sala de imagem</option>
        </select>
        <Modal
          title="Formulário de evento"
          visible={visible}
          setVisible={() => {
            setVisible(!visible);
            handleCleanForm();
          }}
          content={
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              message={message}
              editMode={editMode}
              handleRemoveActivity={handleRemoveActivity}
              setVisible={setVisible} />
          }
        />
        <div className="header">
          <button onClick={prevMonth} className="button">
            ◀
          </button>
          <div className="title">
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className="button">
            ▶
          </button>
        </div>

        <div className="calendar">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d, i) => (
            <div key={i} className="dayHeader">
              {d}
            </div>
          ))}
          {days.map((day, i) => (
            <div key={i} className="cell">
              <div className="plusButtonContainer">
                {day !== null && (
                  <div
                    className="plusButton"
                    onClick={() => {
                      handleCleanForm();
                      setModalId(day);
                      room !== '' && setVisible(!visible)
                    }}
                  >
                    <Icon name={'cilPlus'} />
                  </div>
                )}
                {day}
              </div>
              <div className='activitiesContainer'>
                {allActivities.filter((activity) => {
                  const data = new Date(activity.data_hora_inicio);
                  const mesDaAtividade = data.getMonth() + 1;
                  const anoDaAtividade = data.getFullYear();
                  return mesDaAtividade === month + 1 && anoDaAtividade === year;
                }).map((activity, idx) => (
                  day === activity?.dia &&
                  <div key={idx} className='activity' onClick={() => {
                    setEditMode(true);
                    handleFillForm(activity, day);
                  }}>
                    <div>
                      {getHourAndMinutes(activity?.data_hora_inicio)}
                    </div>
                    <div>
                      {activity?.titulo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Calendar;
