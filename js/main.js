'use strict';

const form = document.getElementById('register');
const alert = document.querySelector('.alert');
const icon = document.querySelector('.icon');
const msg = document.querySelector('.msg');
const cpfDOM = document.querySelector('#cpf');
const cep = document.querySelector("#cep");
const endereco = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const phone = document.querySelector("#telFixo");
const cel = document.querySelector("#cel");

const alerts = (type) => {
  alert.classList.add('show');

  if(type == "sucess") {
    alert.classList.add('sucess');
    icon.classList.add('sucessIcon');  
    cpfDOM.classList.remove('inputError');  
  }
  else {
    alert.classList.add('error');
    icon.classList.add('erroIcon');
  }

  setTimeout(function(){
    alert.classList.remove('show');
    alert.classList.remove('sucess');
    icon.classList.add('sucessIcon');
    alert.classList.remove('error');
    icon.classList.remove('erroIcon');
  }, 5000)  
}

const validCPF = (event) => {
  const cpfs = cpfDOM.value.replace(/[^0-9]/g, "");
  const size = cpfs.length;
  const number = cpfs.substring(0,9);
  const digit = cpfs.substring(9);
  let fisrtDigit, secondDigit, soma = 0;
  
  if(size == 11) {
    // Primeiro digito
    for(let i = 10; i > 1; i--) {
      soma += number.charAt(10 - i) * i; 
    }
    
    fisrtDigit = (soma*10)%11;

    // Segundo Digito
    soma = 0;
    for(let i = 11; i > 1; i--) {
      soma += cpfs.substring(0,10).charAt(11 - i) * i;
    }

    secondDigit = (soma*10)%11

    // Verifica se é valida
    if(`${fisrtDigit}${secondDigit}` == digit) {
      alerts("sucess");
      msg.innerHTML = "Seus dados foram enviados com sucesso!!!"
      form.reset();
    }
    else {
      alerts("error");
      cpfDOM.classList.add('inputError');
      msg.innerHTML = "CPF não é válido"
    }
  }
  else {
    alerts("error");
    cpfDOM.classList.add('inputError');
    msg.innerHTML = "CPF não é válido"
  }
  event.preventDefault();
}

const consumoCepAPI = async() => {
  const cpes = cep.value.replace(/[^0-9]/g, "");
  const url = `https://viacep.com.br/ws/${cpes}/json/`;
  const data = await fetch(url);
  const address = await data.json();

  if(cpes.length == 8) {
    endereco.value = address.logradouro;
    bairro.value = address.bairro;
    cidade.value = address.localidade;
    estado.value = address.uf;
    phone.value = `(${address.ddd})`;
    cel.value = `(${address.ddd})`;
  }
  else {
    alerts("error");
    cep.classList.add('inputError');
    msg.innerHTML = "CEP é inválido"    
  }

}

form.addEventListener('submit', validCPF);
cep.addEventListener('focusout', consumoCepAPI)
