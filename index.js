document.querySelector('#ipca').addEventListener('click',function(){
    obterDados("ipca");
});

document.querySelector('#uf').addEventListener('click',function(){
    obterDados('uf');
});

document.querySelector('#ipca').addEventListener('click',function(){
    obterDadosCotacaoDoipca(1);
});

function obterDados(valor){
    let url = `http://api.bcb.gov.br/dados/serie/bcdata.sgs.4449/dados?formato=json&${valor}dataInicial=01/01/2010&dataFinal=31/12/2019`; // detalhe de como colocar os input de dados ($variáveis) inclusas na string
    const api = new XMLHttpRequest(); // definindo variáve api recebe novo xmlhttprequest
    api.open('GET', url, true); // pegando a url aberta GET 
    api.send(); // enviando
    
    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){            
            let dados = JSON.parse(this.responseText);
            //console.log(dados.serie[1]['fecha']);
            //console.log(dados.serie);
            let resultado = document.querySelector('#resultado');
            resultado.innerHTML = '';
            let i = 0;
            for (let item of dados.serie){
                resultado.innerHTML +=  `<li> Data: ${(item.fecha).substr(0, 10)} - Valor: $ ${item.valor} - moeda: ${dados.codigo}</li>`;
                i+=1;
                if(i==10){
                    break;
                }
            }            
        }else{
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<b>Erro ao procurar os dados</b>`;
        }
    }     
}

function obterDadosCotacaoDoipca(){
    let url = `http://api.bcb.gov.br/dados/serie/bcdata.sgs.4449/dados?formato=json&${valor}dataInicial=01/01/2010&dataFinal=31/12/2019`; // detalhe de como colocar os input de dados ($variáveis) inclusas na string`;
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let dados = JSON.parse(this.responseText);
            console.log(dados.valores.USD);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<p><b>Valor do ${dados.valores.USD.nome}:</b> ${dados.valores.USD.valor}</p>`
        }else{
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<b>Erro ao procurar os dados, 1 semana de estudos de API do Eros, agradço a oportunidade e aguardo contato.</b>`;
        }
    }   
}