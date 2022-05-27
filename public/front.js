let btn_fechar_nova_enquete = document.getElementById("fechar-nova-enquete");
let btn_fechar_enquete_selecionada = document.getElementById("fechar-enquete-selecionada");
let enquete_selecionada_id = null;

const cor_anterior = '#ffd6a1';
const cor_atual = '#a1ffba';
const cor_fechada = '#5c53fc';

axios.get('/enquetes/')
    .then(function (response) {
        let enquetes = response.data
        console.log(enquetes);
        enquetes.forEach(renderEnquete);
    })

setInterval(function () {
    if(enquete_selecionada_id != null){
        axios.get('/opcoes/byEnquete/'+enquete_selecionada_id)
            .then(function (response) {
                let opcoes = response.data;
                let radio_opcoes = document.getElementById("opcoes-selecionada").getElementsByTagName("label");
                for(let i = 0; i < radio_opcoes.length; i++){
                    radio_opcoes[i].children[1].innerHTML = opcoes[i].qt_votos;
                }
            })
    }
}, 1000);

function renderOpcao(opcao){
    let label = document.createElement('label');
    let input = document.createElement('input');
    let span = document.createElement('span');
    
    input.type = 'radio';
    input.id = 'ops'+opcao.id;
    input.name = 'opcao-selecionada';
    input.classList.add('opcao-selecionada');
    input.value = opcao.id;

    span.classList.add('qt-votos');
    span.innerHTML = opcao.qt_votos;

    label.appendChild(input);
    label.innerHTML += opcao.resposta + " ";
    label.appendChild(span);
    document.getElementById("opcoes-selecionada").appendChild(label);
    document.getElementById("opcoes-selecionada").appendChild(document.createElement('br'));
}

function renderEnquete(enquete){
    let card = document.createElement('div');
    let div_titulo = document.createElement('div');
    let title = document.createElement('h3');
    let datas = document.createElement('p');
    let button = document.createElement('button');

    card.classList.add('card');

    title.classList.add('card-title');
    title.innerHTML = enquete.titulo;
    
    enquete.dt_inicio = converterData(enquete.dt_inicio);
    enquete.dt_fim = converterData(enquete.dt_fim);
    
    datas.innerHTML = "Início: " + enquete.dt_inicio.toLocaleDateString() + " " + enquete.dt_inicio.toLocaleTimeString();
    datas.innerHTML += " - Fim: " + enquete.dt_fim.toLocaleDateString() + " " + enquete.dt_fim.toLocaleTimeString();

    verificarPrazo(enquete.dt_inicio, enquete.dt_fim, function(cor){
        card.style.backgroundColor = cor;
    });

    button.className = 'btn btn-primary';
    button.innerHTML = 'Responder';
    button.onclick = function() {
        selecionarEnquete(this);
        mostrar("container-enquete-selecionada");
    }.bind(enquete)

    div_titulo.appendChild(title);
    div_titulo.appendChild(datas);
    card.appendChild(div_titulo);
    card.appendChild(button);
    document.getElementById("lista-enquetes").appendChild(card);
}

function mostrar(containerId){
    document.getElementById(containerId).style.display = "flex";
}

function fechar(containerId){
    document.getElementById(containerId).style.display = "none";
}

async function criarEnquete(){
    let titulo = document.getElementById("novo-titulo").value;
    let dt_inicio = document.getElementById("novo-inicio").value;
    let dt_fim = document.getElementById("novo-fim").value;
    let opcoes = document.getElementById("lista-opcoes").getElementsByClassName("item-opcao");
    let opcoes_nova_enquete = [];

    if(titulo == "" || dt_inicio == "" || dt_fim == "" || opcoes.length == 0){
        alert("Preencha todos os campos!");
        return;
    }

    if(opcoes.length < 3){
        alert("A enquete deve ter no minimo 3 opções");
        return;
    }

    for(let i = 0; i < opcoes.length; i++){
        opcoes_nova_enquete.push(opcoes[i].children[0].innerHTML);
    }

    await axios.post('/enquetes/', {
        titulo: titulo,
        dt_inicio: dt_inicio,
        dt_fim: dt_fim,
        opcoes: opcoes_nova_enquete
    })
    .then(function (response) {
        console.log(response.data);
        renderEnquete(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
    document.getElementById("novo-titulo").value="";
    document.getElementById("novo-inicio").value="";
    document.getElementById("novo-fim").value="";
    document.getElementById("lista-opcoes").innerHTML="";

}

function votar(){
    let opcao_selecionada = document.querySelector('input[name="opcao-selecionada"]:checked');
    const idOpcao = opcao_selecionada.value;

    axios.post('/opcoes/votar/', { idOpcao: idOpcao })
        .then(function (response) {
            console.log(response.data);
            opcao_selecionada.parentNode.children[1].innerHTML = response.data.qt_votos;
        }).catch(function (error) {
            console.log(error);
        });

    opcao_selecionada.checked = false;
}

function converterData(dataString){
    let [data,hora] = dataString.split(/[T]/);
    data = data.split('-');
    hora = hora.split(':');
    let novoFormato = new Date(data[0], data[1]-1, data[2], hora[0], hora[1], 0);
    
    return novoFormato;
}

function verificarPrazo(inicio,fim,callback){
    let dataAtual = new Date();
    let cor;
    if(dataAtual.getTime() < inicio.getTime()){
        cor = cor_anterior;
    } else{
        if(dataAtual.getTime() < fim.getTime()){
            cor = cor_atual;
        } else{
            cor = cor_fechada;
        }
    }
    callback(cor);
}

async function selecionarEnquete(enquete){
    enquete_selecionada_id = enquete.id;

    let opcoes_selecionadas = document.getElementById("opcoes-selecionada");
    document.getElementById("titulo-enquete-selecionada").innerHTML = enquete.titulo;
    document.getElementById("dt-inicio").innerHTML = "Início: " + enquete.dt_inicio.toLocaleDateString() + " " + enquete.dt_inicio.toLocaleTimeString();
    document.getElementById("dt-fim").innerHTML = "Fim: " + enquete.dt_fim.toLocaleDateString() + " " + enquete.dt_fim.toLocaleTimeString();
    opcoes_selecionadas.innerHTML = "";
    
    await axios.get('/opcoes/byEnquete/'+enquete.id)
        .then(function (response) {
            console.log(response.data);
            let opcoes = response.data;
            opcoes.forEach(renderOpcao);
        })
    
    verificarPrazo(enquete.dt_inicio, enquete.dt_fim, function(cor){
        document.getElementById("enquete-selecionada").style.backgroundColor = cor;
        
        let lista_radio = document.getElementById('opcoes-selecionada').getElementsByClassName('opcao-selecionada');
        let btn_votar = document.getElementById("btn-votar");
        console.log(lista_radio)
        if(cor == cor_fechada || cor == cor_anterior){
            btn_votar.disabled  = true;
            for(let i = 0; i < lista_radio.length; i++){
                lista_radio[i].disabled = true;
            }
        }else{
            btn_votar.disabled  = false;
        }
        
    });
}

btn_fechar_nova_enquete.addEventListener("click",
    function () {
        fechar("container-nova-enquete");
    });

btn_fechar_enquete_selecionada.addEventListener("click",
    function () {
        enquete_selecionada_id = null;
        fechar("container-enquete-selecionada");
    });

function adicionarOpcao(){
    let opcao = document.getElementById("nova-opcao").value;
    document.getElementById("nova-opcao").value = "";
    if(opcao == ""){
        return;
    }
    let li = document.createElement('li');
    let button = document.createElement('button');
    let p = document.createElement('p');

    li.classList.add("item-opcao");
    p.innerHTML = opcao;
    button.innerHTML = "Remover";
    button.onclick = function() {
        this.parentNode.remove();
    }
    li.appendChild(p);
    li.appendChild(button);
    document.getElementById("lista-opcoes").appendChild(li);

}