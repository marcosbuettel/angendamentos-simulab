import './Login.css';
import logoFaminas from '../../assets/logoFaminasSemfundo.png';
import logoSimulab from '../../assets/logoSimulabSemFundo.png';
import { useState } from 'react';
import Loading from '../Loading/Loading';

const Login = ({ setLogged }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    usuario: '',
    senha: ''
  });

  const handleSaveLogin = () => {
    const time = new Date().toISOString();
    const data = {
      logged: true,
      time: time,
    };

    localStorage.setItem('data', JSON.stringify(data));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://rockmuriae.com.br/sistema/api/validar_usuario.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: form.usuario, senha: form.senha }),
      });

      const data = await response.json();

      if (data.success) {
        handleSaveLogin();
        setLogged(true)
        setLoading(false);
        console.log("Login bem-sucedido!");
      } else {
        setLoading(false);
        console.log(`Erro: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.log("Erro na requisição: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="loginBackground">
      <Loading show={loading} />
      <div className="loginContainer">
        {/* <div className='loginLeftSide'>
          <h2>Sistema de agendamento</h2>
          <div className="loginCenteredContent">
            <h3>Faça login</h3>
          </div>
        </div> */}
        <div className='loginRightSide'>
          <div className="formGroup mb-4 col-md-10">
            <label htmlFor="usuario">E-mail *</label>
            <input value={form.usuario} type="text" id="usuario" name="usuario" required className="form-control rounded-0" onChange={handleChange} />
          </div>

          <div className="formGroup mb-4 col-md-10">
            <label htmlFor="senha">Senha *</label>
            <input value={form.senha} type="password" id="senha" name="senha" required className="form-control rounded-0" onChange={handleChange} />
          </div>


          <div className='form-group col-md-10 d-flex justify-content-start align-items-start'>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary rounded-0 custom-color">Entrar</button>
          </div>

          <div className='loginFooter col-md-10'>
            <div className='logoFaminas'>
              <img src={logoFaminas} alt="Logo Faminas" />
            </div>
            <div className='logoSimulab'>
              <img src={logoSimulab} alt="Logo Simulab" />
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default Login;