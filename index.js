let fila = [];
let countGerarSenha = 0;
let senhaAnterior = 0

const categorias = [
    { id: 1, nome: "Agendamentos", codigo: "AG" },
    { id: 2, nome: "Clínica", codigo: "CL" },
    { id: 3, nome: "Aplicação de medicamentos", codigo: "AM" },
    { id: 4, nome: "Exames", codigo: "EX" },
    { id: 5, nome: "Comercial", codigo: "CO" },
];

const guiches = [
    {id: 1,categoriasId: [categorias[0].id, categorias[1].id, categorias[2].id],},
    { id: 2, categoriasId: [categorias[3].id, categorias[4].id]},
];

$(document).ready(() => {
    const listagemCategorias = $("#listagem-categorias");
    categorias.forEach(function (categoria) {
        const itemCategoria = $(
            `<li><button class="botao-senha" data-id="${categoria.id}">${categoria.nome}</button></li>`
        );
        listagemCategorias.append(itemCategoria);
    });

    const botoesSenha = $(".botao-senha");
    botoesSenha.on("click", function () {
        const categoriaId = $(this).attr("data-id");
        geraSenha(parseInt(categoriaId));
    });

    const chamaSenha = $(".botao");
    chamaSenha.on("click", function () {
        const guicheId = $(this).attr("data-guiche-id");
        const guiche = guiches.find(function (gui) {
            return gui.id === parseInt(guicheId);
        });
        const senhaChamada = fila.find(function (senha) {
            return guiche.categoriasId.includes(senha.categoriaId);
        });

        if (senhaChamada) {
            enviaSenhaChamadaParaGuiche(senhaChamada, guicheId)
        }
    });

    function geraSenha(categoriaId) {
        const categoria = categorias.find(function (cat) {
            return cat.id === categoriaId;
        });
        countGerarSenha += 1
        const senhaChamada= `${categoria.codigo}${countGerarSenha}`;

        fila.push({ categoriaId, senha: senhaChamada });

        const listagemSenhas = $("#listagemSenhasGeradas");
        const senhaGerada = $(`<li class="item-fila">${senhaChamada}</li>`);
        listagemSenhas.append(senhaGerada);
    }
    
    function enviaSenhaChamadaParaGuiche(senhaChamada, guicheId) {
        fila = fila.filter(function(item) {
            return item.senha !== senhaChamada.senha
        })
        const listagemSenhas = $("#listagemSenhasGeradas");
        listagemSenhas.html('')
        fila.forEach((item) => {
            const senhaGerada = $(`<li class="item-fila">${item.senha}</li>`);
            listagemSenhas.append(senhaGerada);
        })
        const exibicaoguiche = $(`#senhaguiche${guicheId}`);
        exibicaoguiche.html(senhaChamada.senha);
        

        
        document.getElementById("numeroSenha2").innerText = document.getElementById("numeroSenha").textContent
        let senha = document.getElementById(`senhaguiche${guicheId}`).textContent
        document.getElementById("numeroSenha").innerText = senha
    }
});
