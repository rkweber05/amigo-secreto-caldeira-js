let amigos = [];

function adicionar() {
    // recupera os campos amigo e lista
    let amigo = document.getElementById('nome-amigo');   
    if (amigo.value == '') {
        alert('Informe o nome do amigo !');
        // ignorar todo o resto dso código e interromper quando for true
        return; // para parar a aplicação
    }

    // verifica se dentro do array possui ja algum nome ja existente
    if (amigos.includes(amigo.value)) {
        alert('Nome ja adicionado');
        return;
    }

    let lista = document.getElementById('lista-amigos');

    // coloca o nome do amigo cadastrado para dentro do array
    amigos.push(amigo.value);

    // bota o valor do amigo dentro da lista
    if (lista.textContent == '') {
        lista.textContent = amigo.value;
    } else {
        lista.textContent += ', ' + amigo.value;
    }

    // quando terminar de cadastrar o amigo, limpa o campo para poder digitar o próoximo
    amigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < amigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

function sortear() {
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos!');
        return;
    }

    embaralha(amigos);
    let listaSorteio = document.getElementById('lista-sorteio');

    for (let i = 0; i < amigos.length; i++) {
        if (i == amigos.length - 1) {
            // se estiver terminado a minha lista, o meu ultimo amigo vai pegar o primeiro da lista
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }
}

function embaralha(lista) {
    // peguei do fisher yates
    for (let indice = lista.length; indice; indice--) {

        const indiceAleatorio = Math.floor(Math.random() * indice);

        // atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] = 
            [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('lista-amigos').innerHTML = '';
}

