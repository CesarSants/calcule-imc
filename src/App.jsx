import { useState } from 'react'
import './App.css'

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);

  // const calcularIMC = (peso, altura) => {
  //   const alturaEmMetros = altura / 100; 
  //   return (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2);
  // };

  // const envio = (e) => {
  //   e.preventDefault();

  //   if (peso && altura) {
  //     const resultadoIMC = calcularIMC(peso, altura);
  //     setImc(resultadoIMC);
  //   } else {
  //     alert('Por favor, preencha os campos de peso e altura corretamente.');
  //   }
  // };


  const envio = (e) => {
    e.preventDefault();

    if (peso && altura) {
      const alturaEmMetros = altura / 100;
      const imcCalculado = (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2); 

      if (/*isFinite(imcCalculado) && */imcCalculado > 1 && imcCalculado < 700) {
        setImc(imcCalculado);
      } else {
        setImc(null);
        alert('Valores inseridos são inválidos. Por favor, revise os dados.');
      }
    } else {
      setImc(null);
      alert('Por favor, preencha os dois campos.');
    }
  };

  const calcularPosicao = (imc) => {
    const min = 5;
    const max = 50;
    const faixa = max - min;

    if (imc < 5) return 0;
    if (imc > 50) return 100; 

    return ((imc - min) / faixa) * 100; 
  };


  const getImcMessage = (imc) => {
    const imcNumerico = parseFloat(imc);
    
    if (imcNumerico < 18.5) {
      return "Você está abaixo do peso";
    } else if (imcNumerico >= 18.5 && imcNumerico < 25) {
      return "Você está com peso normal";
    } else if (imcNumerico >= 25 && imcNumerico < 30) {
      return "Você está com sobrepeso";
    } else if (imcNumerico >= 30 && imcNumerico < 40) {
      return "Você está com obesidade";
    } else if (imcNumerico >= 40) {
      return "Você está com obesidade mórbida";
    }
  };

  return (
    <div className='container'>
      <header>
        <h1>Calcule o seu IMC:</h1>
      </header>
      <form className='formulario' onSubmit={envio}>
        <div className='inputs'>
          <div className='peso'>
            <label htmlFor='peso'>Digite o seu peso (kg):</label>
            <input
              value={peso}
              id='peso'
              type="number"
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <div className='altura'>
            <label htmlFor='altura'>Digite o sua altura (cm):</label>
            <input
              value={altura}
              id='altura'
              type="number"
              onChange={(e) => setAltura(e.target.value)}
            />
          </div>
        </div>
        <button type='submit'>Calcular</button>
      </form>

      {imc && (
        <>
          <div className="imc-container">
            <div className="imc-regua">
              <div className="imc-range">
                <div className="faixa amarela">Abaixo do Peso (5 - 18.5)</div>
                <div className="faixa verde">Peso Saudável (18.5 - 25)</div>
                <div className="faixa laranja">Sobrepeso (25 - 30)</div>
                <div className="faixa vermelha">Obeso (30 - 40)</div>
                <div className="faixa vinho">Obesidade Mórbida (40 - 50)</div>
              </div>
              <div
                className="visor"
                style={{ left: `${calcularPosicao(imc)}%` }}
              >
                Seu IMC é {imc}
              </div>
            </div>
          </div>
          <p id="mensagem">{getImcMessage(imc)}</p>
        </>
      )}
    </div>
  );
}

export default App
