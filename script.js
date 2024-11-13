const form  = document.getElementById('form-atividade');
const imgAprovado = '<img src="Imagens/aprovado.png" alt="Emoji festejando" />'; //Puxando as iamgens da pasta "Imagens"
const imgReprovado = '<img src="Imagens/reprovado.png" alt="Emoji triste" />'; // Puxando as imagens da pasta "Imagens"
const atividades = []; // pegando oq a pessoa digitar
const notas = []; // pegando oq a pessoa digitar
const spanAprovado =  '<span class="resultado aprovado">Aprovado</span>'; // texto que aparece quando o aluno é aprovado 
const spanReprovado =  '<span class="resultado Reprovado">Reprovado</span>'; // textgo que aparece quando o aluno é reprovado
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = ''; //Precisa estar no escopo global para funcionar || Funcionando para adicionar linhas na tabela.

form.addEventListener('submit', function(e) { //Chama oq foi solicitado ao apertar no botão 
    e.preventDefault(); //Removendo o comportamento de atualizar pagina

    adicionarLinha(); //Adicionando Linha
    atualizaTabela(); //Atualizando a tabela
    atualizaMediaFinal(); //Atualiza a media final do aluno
});

//Organiznado o codigo

function adicionarLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade'); //Variavel para adicionar o nome do Aluno
    const inputNotaAtividade = document.getElementById('nota-atividade'); //Variavle para adicionar a nota do Aluno

    if (atividades.includes(inputNomeAtividade.value)) { //Corrigindo o erro de colocar 2x a mesma matéria
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>'; //Adicionando informações no corpo da tabela. || recebendo o codigo html como string
        linha += `<td>${inputNomeAtividade.value}</td>`; //Exatamente um linha = linha + 'outro conteudo'
        linha += `<td>${inputNotaAtividade.value}</td>`; //Caso esteja sem isso, vai acontecer das coisas ficarem em espaços errados (O emoji pode ficar na segunda coluna caso eu delete essa linha do com)
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}` //Utilizando operador ternario!! (basicamente um if/else)
        linha += `<tr/>`;

        linhas += linha; // Adicionando mais linhas
    }

    inputNomeAtividade.value = ''; //Limpa o campo 
    inputNotaAtividade.value = ''; //Limpa o campo
}

function atualizaTabela(){ 
    const corpoTabela = document.querySelector('tbody'); // A parte do corpo da tabela, onde é inserido os dados desejados.
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // puxando do HTML, colocando o valor na media final 
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; // puxando do HTML, colocando o texto no final baseado na nota do aluno.
}

function calculaMediaFinal(){
    let somaDasNotas = 0; 

    for(let i = 0; i < notas.length; i++){ //Basicamnete é somar a quantidade de notas que o aluno teve, ou seja, quantidade de notas/notas = media final
        somaDasNotas += notas[i]; // Toda vez que for inserido alguma nota nova vai subir esse numero, fazendo com que o calculo no final de certo
    }

    return media = somaDasNotas / notas.length; // fazendo o calculo e retornando o valor
}