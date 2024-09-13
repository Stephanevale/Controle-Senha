let fila = [];

const categorias = [
    { nome: "Agendamentos", id: 1, codigo: "AG" },
    { nome: "Clínica", id: 2, codigo: "CL" },
    { nome: "Aplicação de medicamentos", id: 3, codigo: "AM" },
    { nome: "Exames", id: 4, codigo: "EX" },
    { nome: "Comercial", id: 5, codigo: "CO" },
];

const guiches = [
    {
        id: 1,
        categoriasId: [categorias[0].id, categorias[1].id, categorias[2].id],
    },
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
        const numero = 1 + Math.floor(Math.random() * (100 - 1) + 1);
        const senhaAleatoria = `${categoria.codigo}${numero}`;

        fila.push({ categoriaId, senha: senhaAleatoria });

        const listagemSenhas = $("#listagemSenhasGeradas");
        const senhaGerada = $(`<li class="item-fila">${senhaAleatoria}</li>`);
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
    }
});
