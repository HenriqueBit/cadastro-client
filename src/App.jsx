import { useEffect, useState } from 'react'
import './App.css'
import Axios from 'axios'
import logo from './assets/logo.svg'
import rodape from './assets/rodapebranco.png'
import { useForm } from 'react-hook-form'


function App() {
  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => Axios.post("http://resicolor.com.br/pintores", (d))

  
  {/* UseStates pra chamar os valores dos estados e cidades */}
  const [estados, setEstados] = useState([])
  const [estadoSelecionado, setEstadoSelecionado] = useState("0")

  {/* UseStates pra chamar os valores dos estados e cidades */}
  const [cidades, setCidades] = useState([])

  
  {/* Useeffect pra capturar os dados da API */}
  useEffect(() => {
    Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then((response) => {
      setEstados(response.data)
    });
  }, []);

  {/* Useeffect pra capturar os municipios baseados no estado escolhido */}
  useEffect(() => {
    Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
    ).then((response) => {
      setCidades(response.data)
    });
  }, [estadoSelecionado]);

  {/* definir o estado setado como estadoSelecionado */}
  function estadoSelecionadoNoCorpo(event) {
    let estado = event.target.value;
    if (estado == "Rondônia") {
      estado = 11;
    } else if (estado == "Acre") {
      estado = 12;
    } else if (estado == "Amazonas") {
      estado = 13;
    } else if (estado == "Roraima") {
      estado = 14;
    } else if (estado == "Pará") {
      estado = 15;
    } else if (estado == "Amapá") {
      estado = 16;
    } else if (estado == "Tocantins") {
      estado = 17;
    } else if (estado == "Maranhão") {
      estado = 21;
    } else if (estado == "Piauí") {
      estado = 22;
    } else if (estado == "Ceará") {
      estado = 23;
    } else if (estado == "Rio Grande do Norte") {
      estado = 24;
    } else if (estado == "Paraíba") {
      estado = 25;
    } else if (estado == "Pernambuco") {
      estado = 26;
    } else if (estado == "Alagoas") {
      estado = 27;
    } else if (estado == "Sergipe") {
      estado = 28;
    } else if (estado == "Bahia") {
      estado = 29;
    } else if (estado == "Minas Gerais") {
      estado = 31;
    } else if (estado == "Espirito Santo") {
      estado = 32;
    } else if (estado == "Rio de Janeiro") {
      estado = 33;
    } else if (estado == "São Paulo") {
      estado = 35;
    } else if (estado == "Paraná") {
      estado = 41;
    } else if (estado == "Santa Catarina") {
      estado = 41;
    } else if (estado == "Rio Grande do Sul") {
      estado = 43;
    } else if (estado == "Mato Grosso do Sul") {
      estado = 50;
    } else if (estado == "Mato Grosso") {
      estado = 51;
    } else if (estado == "Goiás") {
      estado = 52;
    }  else if (estado == "Distrito Federal") {
      estado = 53;
    }
    setEstadoSelecionado(estado);
  }


  return (
    <div className="App">
      <header>
        <div className='logo-superior'><img src={logo} alt="logo"/></div>
        <div className='texto-superior'><span className='iai'>Preencha o formulário abaixo para se cadastrar no nosso</span> <br></br><span className='letra-outline'>programa de capacitação</span><br /><span className='letrinha'>Assim você receberá todas as informações e te avisaremos quando tiver um treinamento próximo de você!</span></div>
      </header>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1.Nome */}
          <div className='label-input'>
            <label htmlFor="input-nome">Nome</label>
            <input type="text" className="input-nome" name="input-nome" {...register("nome")} id="input-nome" required/>
          </div>

          {/* 2.E-mail */}
          <div className='label-input'>
            <label htmlFor="input-email">E-mail</label>
            <input type="email" className="input-email" name="input-email" {...register("email")} id="input-email" required/>
          </div>

          {/* 3.Telefone */}
          <div className='label-input'>
            <label htmlFor="input-telefone">Telefone</label>
            <input type="text" className="input-telefone" name="input-telefone" {...register("telefone")} id="input-telefone" required/>
          </div>

          {/* 4.Estado */}
          <div className='label-input'>
            <label htmlFor="estado">Estado</label>
            <select name="estado" {...register("estado")} id="input-estado" onChange={estadoSelecionadoNoCorpo} className="input-estado">
              <option value="0">Selecione o estado</option>
              {estados.map(estado => (
                <option key={estado.nome} value={estado.nome}>{estado.nome}</option> 
              ))}
            </select>
          </div>

          {/* 5.Cidade */}
          <div className='label-input'>
            <label htmlFor="cidade">Cidade</label>
            <select name="cidade" {...register("cidade")} id="input-cidade"  className="input-cidade">
              <option value="0">Selecione a cidade</option>
              {cidades.map(cidade => (
                <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option> 
              ))}
            </select>
          </div>

          {/* 6.Revenda */}
          <div className='label-input'>
            <label htmlFor="revenda">Revenda que costuma comprar</label>
            <input type="text" {...register("revenda")} className="input-revenda" name="revenda" id="input-revenda" required/>
          </div>
          
          {/* 7.Botão */}
          <div>
            <button type="submit">Quero me cadastrar!</button>
          </div>
        </form>
      </main>
      <footer>
                <div className='texto-inferior'><span>Ao participar da capacitação Pintor Profissa, você atualiza seu conhecimento, garante um super kit da Resicolor e ainda concorre a 1 ano de produtos da Resicolor!</span></div>
                <div className='logo-inferior'><img src={rodape} alt="logo"/></div>
      </footer>
    </div>
  )
}

export default App
