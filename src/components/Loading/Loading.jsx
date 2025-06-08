import './Loading.css';

const Loading = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
