function carregarMudancas(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        return;
    }

    // Buscar dados do cofre para exibir o saldo atual
    $.ajax({
        url: "http://localhost:3333/cofre",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(response) {
            const cofre = response.cofre.find(c => c.id === id);
            if (cofre) {
                $("#cofre-nome").text(cofre.name);
                $("#cofre-saldo").text(`Saldo Atual: R$ ${cofre.saldo}`);
            } else {
                $("#cofre-nome").text("Cofre não encontrado");
            }
        },
        error: function(error) {
            console.error("Erro ao carregar o saldo do cofre:", error);
        }
    });

    // Buscar as mudanças do cofre
    $.ajax({
        url: "http://localhost:3333/mudanca",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(response) {
            const mudancas = response.mudancas.filter(m => m.idCofre === id);
            const tbody = $("#mudancas tbody");
            tbody.empty();

            if (mudancas.length === 0) {
                tbody.append("<tr><td colspan='4'>Nenhuma mudança encontrada.</td></tr>");
            } else {
                mudancas.forEach(mudanca => {
                    const tipo = mudanca.tipo ? "Entrada" : "Saída";
                    tbody.append(`
                        <tr>
                            <td>${mudanca.name}</td>
                            <td>${tipo}</td>
                            <td>R$ ${mudanca.valor}</td>
                            <td>${new Date(mudanca.createdAt).toLocaleString()}</td>
                        </tr>
                    `);
                });
            }
        },
        error: function(error) {
            console.error("Erro ao carregar mudanças:", error);
            $("#mudancas tbody").html("<tr><td colspan='4'>Erro ao carregar mudanças.</td></tr>");
        }
    });
}

function Voltar(){
    window.location.href = "../html/page.html"
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cofreId = parseInt(urlParams.get("id"));
    if (cofreId) {
        carregarMudancas(cofreId);
    } else {
        alert("ID do cofre não fornecido.");
    }
});
