const fila = [];
$(document).ready(() => {
    const categorias = [
        { nome: "Agendamentos", id: 1, codigo: "AG" },
        { nome: "Clínica", id: 2, codigo: "CL" },
        { nome: "Aplicação de medicamentos", id: 3, codigo: "AM" },
        { nome: "Exames", id: 4, codigo: "EX" },
        { nome: "Comercial", id: 5, codigo: "CO" },
    ];
    const listagemCategorias = $("#listagem-categorias");
    categorias.forEach(function (categoria) {
        const itemCategoria = $(
            `<li><button class="botao-senha" data-id="${categoria.id}">${categoria.nome}</button></li>`
        );
        listagemCategorias.append(itemCategoria);
    });
    const botoesSenha = $(".botao-senha");
    botoesSenha.on("click", function () {
        geraSenha($(this).attr("data-id"));
    });
    function geraSenha(categoriaId) {
        const categoria = categorias.find(function(cat){
            return cat.id === parseInt(categoriaId);
        });
        console.log(categoria.codigo);
        const numero = 1 + Math.floor(Math.random() * (100 - 1) + 1);
        const senhaAleatoria = `${categoria.codigo}${numero}`;
        fila.push(senhaAleatoria);
        const listagemSenhas = $("#listagemSenhasGeradas");
        const senhaGerada = $(`<li class="item-fila">${senhaAleatoria}</li>`);
        listagemSenhas.append(senhaGerada);
    }
});
