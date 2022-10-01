class Produto {
    // Atributos "DADOS DO PRODUTO"
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }




    // Métodos
  
    //Quando o usuário clicar em salvar:
    // 1. CHAMA O MÉTODO lerDados().
    // 2. PEGA OS DADOS É JOGA DENTRO DO OBJETO produto.
    // 3. RETORNA O OBJETO PRO MÉTODO salvar().
    // 4. OS DADOS SÃO RECEBIDOS NA VARIÁVEL PRODUTO.

    // SAlVAR nesse caso significa o botão salvar.
    salvar() {
        // Chamando o método lerDados() dentro do metodo salvar que está com evento de click.
        let produto = this.lerDados();
        // Aqui estamos enviando os dados do produto para valida campos pelos PARAMETROS.
        if (this.validaCampos(produto)) {

            if(this.editId == null) {

                this.adicionar(produto);
            }else{
                this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela();
        //cadastra e limpa campos.
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';

            imgEdit.setAttribute("onClick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png';

            imgDelete.setAttribute("onClick", "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;
    }


    
    preparaEdicao(dados) {

        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar'
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
            
        }
    }

    lerDados() {
        let produto = {};

        produto.id = this.id;
        // Atribuindo o campo produto dentro do objeto produto.
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    // Função vai apenas validar os campos do usuário estão vazios.
    validaCampos(produto) {
        let msg = '';
        // Verificando se o usuário digitou os campos vazios 
        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do Produto \n'
        }

        if (produto.preco == '') {
            msg += '- Informe o preço do Produto \n'
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null;

    }

    deletar(id) {
        
        if(confirm('Deseja realmente deletar o produto ' + id )) {

            let tbody = document.getElementById('tbody');
    
            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
    
            console.log(this.arrayProdutos);
        }

    }



};

// Instanciei a minha classe Produto dentro da variavel produto,
// para reutiliza-la.
// com isso criando um novo OBJETO a partir do meu layout, ou seja,
// a partir da minha classe criada.
var produto = new Produto();
