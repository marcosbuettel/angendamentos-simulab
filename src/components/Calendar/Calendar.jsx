import { useState } from 'react';
import './Calendar.css';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';

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
    days.push(null); // sempre 6 semanas completas
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

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [visible, setVisible] = useState(false);

  const days = generateCalendar(year, month);

  const nextMonth = () => {
    setMonth((m) => (m === 11 ? 0 : m + 1));
    if (month === 11) setYear((y) => y + 1);
  };

  const prevMonth = () => {
    setMonth((m) => (m === 0 ? 11 : m - 1));
    if (month === 0) setYear((y) => y - 1);
  };

  return (
    <div className="container">
      <Modal
        title="Cadastro de atividade"
        visible={visible}
        setVisible={setVisible}
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
                  onClick={() => setVisible(!visible)}
                >
                  <Icon name={'cilPlus'} />
                </div>
              )}
              {day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
