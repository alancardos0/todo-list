const input = document.getElementById('tarefaInput')
const listaAfazer = document.getElementById('listaAfazer')

const deletarTarefa = (indexDoArrayArgumento) =>{
  let tarefas = pegarTarefaDoLocalStorage();
  tarefas.list.splice(indexDoArrayArgumento, 1)
  salvarTarefaNoLocalStorage(tarefas);
  refreshElementList();
}
refreshElementList();

function tamanhoDoElemento(){
  return input.value.length;
}

function refreshElementList(){
    listaAfazer.innerHTML = '';
    let tarefas = pegarTarefaDoLocalStorage();
    tarefas.list.forEach((element,indexDoArrayParametro)=>{
      let li = document.createElement("li");
      listaAfazer.appendChild(li);

      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox'
      checkbox.setAttribute('class','checkbox-task')
      checkbox.checked = element.completed;
      checkbox.setAttribute("onclick", `mudarBooleanoDaTarefa(${indexDoArrayParametro})`);
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(element.text));

      let deleteButton = document.createElement('button')
      deleteButton.setAttribute("class","btn-thrash")
      deleteButton.setAttribute("onclick", `deletarTarefa(${indexDoArrayParametro})`)
      let i = document.createElement('i')
      i.setAttribute("class","fa fa-trash")
      deleteButton.appendChild(i)
      li.appendChild(deleteButton)
    })
}

function adicionarNaLista(){
  if(tamanhoDoElemento() > 0){
    armazenaLocalStorage();
    refreshElementList();
  } 
}

function armazenaLocalStorage(){
  let tarefas = pegarTarefaDoLocalStorage();
  tarefas.list.push({text:input.value, completed: false})
  salvarTarefaNoLocalStorage(tarefas);
}

function mudarBooleanoDaTarefa(indexDoArray){
  let tarefas = pegarTarefaDoLocalStorage();
  tarefas.list[indexDoArray].completed = !tarefas.list[indexDoArray].completed
  salvarTarefaNoLocalStorage(tarefas);
}

function pegarTarefaDoLocalStorage(){
  let agenda = localStorage.getItem('agenda');
  let listaDeTarefas = JSON.parse(agenda) || {list:[]}
  return listaDeTarefas;
}

function salvarTarefaNoLocalStorage(dados){
  localStorage.setItem('agenda',JSON.stringify(dados));
}

