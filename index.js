$(document).ready(() => {
    const categorias = [
        {nome:"Agendamentos",id: 1},
        {nome:"Clínica",id: 2},
        {nome:"Aplicação de medicamentos",id: 3},
        {nome:"Exames",id: 4},
        {nome:"Comercial",id: 5},
    ];
    const listagemCategorias = $("#listagem-categorias");
    categorias.forEach(function(categoria){
        const itemCategoria = $(`<li><button class="botao-senha">${categoria.nome}</button></li>`);
        listagemCategorias.append(itemCategoria)
    })
})
