const Form = ({ handleChange, handleSubmit, form, message, setVisible, editMode, handleRemoveActivity }) => {
  return (
    <div style={{ margin: 'auto' }} >
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="form-group col-md-6">
            <label>Data/Hora Início *:</label>
            <input
              className="form-control rounded-0"
              type="datetime-local"
              name="data_hora_inicio"
              value={form.data_hora_inicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label>Data/Hora Fim *:</label>
            <input
              className="form-control rounded-0"
              type="datetime-local"
              name="data_hora_fim"
              value={form.data_hora_fim}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* {editMode &&
          <div className="row mb-3">
            <div className="form-group col-md-6">
              <label>Trocar dia:</label>
              <input
                className="form-control rounded-0"
                type="text"
                name="dia"
                value={form.dia}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        } */}
        <div className="row mb-3">
          <div className="form-group col-md-12">
            <label>Título  *:</label>
            <input
              className="form-control rounded-0"
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group col-md-6">
            <label>Professor *:</label>
            <input
              className="form-control rounded-0"
              type="text"
              name="professor"
              value={form.professor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label>Solicitante *:</label>
            <input
              className="form-control rounded-0"
              type="text"
              name="solicitante"
              value={form.solicitante}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="form-group col-md-12">
            <label>Descrição:</label>
            <textarea
              className="form-control rounded-0"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-1">
          {editMode &&
            <div className="form-group col-md-2">
              <button type="button" onClick={() => handleRemoveActivity()} className="btn btn-outline-danger rounded-0">Remover</button>
            </div>
          }
          <div className={`form-group ${editMode ? 'col-md-10' : 'col-md-12'} d-flex justify-content-end align-items-end`}>
            <button type="submit" className="btn btn-primary me-2 rounded-0">Salvar</button>
            <button type="button" onClick={() => setVisible(false)} className="btn btn-danger rounded-0">Cancelar</button>
          </div>
        </div>
      </form >

      {/* {message && <p>{message}</p>} */}
    </div >
  );
}

export default Form;