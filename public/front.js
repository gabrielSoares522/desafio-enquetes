let btn_fechar_nova_enquete = document.getElementById("fechar-nova-enquete");
let btn_fechar_enquete_selecionada = document.getElementById("fechar-enquete-selecionada");

axios.get('/enquetes/')
  .then(function (response) {
    let enquetes = response.data
    console.log(enquetes);
    enquetes.forEach(renderEnquete);
    
  })
function renderOpcao(opcao){
    //<input type="radio" id="ops1" name="opcao-selecionada" value="1">
    //<label for="ops1">Opcao A <span class="qt-votos">0</span></label><br>
    let label = document.createElement('label');
    let input = document.createElement('input');
    let span = document.createElement('span');
    //label.className = 'opcao-selecionada';
    input.type = 'radio';
    input.id = 'ops'+opcao.id;
    input.name = 'opcao-selecionada';
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
    card.className = 'card';
    let title = document.createElement('h3');
    title.className = 'card-title';
    title.innerHTML = enquete.titulo;
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.innerHTML = 'Responder';
    button.onclick = function() {
        selecionarEnquete(this);
        mostrar("container-enquete-selecionada");
    }.bind(enquete)

    card.appendChild(title);
    card.appendChild(button);
    document.getElementById("lista-enquetes").appendChild(card);
}

function mostrar(containerId){
    document.getElementById(containerId).style.display = "flex";
}

function fechar(containerId){

    document.getElementById(containerId).style.display = "none";
}

function criarEnquete(event){
    event.preventDefault()
}
function votar(event){
    event.preventDefault()
}

function selecionarEnquete(enquete){
    var [dt_inicio,ti_inicio] = enquete.dt_inicio.split(/[T]/);
    dt_inicio = dt_inicio.split('-').reverse().join('/');
    ti_inicio = ti_inicio.split(':');

    var [dt_fim,ti_fim] = enquete.dt_fim.split(/[T]/);
    dt_fim = dt_fim.split('-').reverse().join('/');
    ti_fim = ti_fim.split(':');

    document.getElementById("titulo-enquete-selecionada").innerHTML = enquete.titulo;
    
    document.getElementById("dt-inicio").innerHTML = "inicio: " + dt_inicio + " " + ti_inicio[0] + ":" + ti_inicio[1];
    document.getElementById("dt-fim").innerHTML = "fim: " + dt_fim + " " + ti_fim[0] + ":" + ti_fim[1];
    document.getElementById("opcoes-selecionada").innerHTML = "";
    axios.get('/opcoes/byEnquete/'+enquete.id)
        .then(function (response) {
            console.log(response.data);
            let opcoes = response.data;
            opcoes.forEach(renderOpcao);
        })
}
btn_fechar_nova_enquete.addEventListener("click",
function (event) {
    
    event.preventDefault();
    fechar("container-nova-enquete");
});

btn_fechar_enquete_selecionada.addEventListener("click",
function (event) {
    event.preventDefault();
    fechar("container-enquete-selecionada");
});

function adicionarOpcao(){
    let opcao = document.getElementById("nova-opcao").value;
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