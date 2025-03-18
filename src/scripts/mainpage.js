function carregarCofres() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        return;
    }

    $.ajax({
        url: "http://localhost:3333/cofre",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(response) {
            const cofres = response.cofre;
            $("#cofres").empty();

            if (cofres.length === 0) {
                $("#cofres").append("<p>Nenhum cofre encontrado.</p>");
            } else {
                cofres.forEach(cofre => {
                    $("#cofres").append(`
                        <div class="cofre">
                            <div>
                                <h3>${cofre.name}</h3>
                                <p>Saldo: R$ ${cofre.saldo}</p>
                            </div>
                            <button onclick="abrirCofre(${cofre.id})">Abrir</button>
                        </div>
                    `);
                });
            }
        },
        error: function(error) {
            console.error("Erro ao carregar cofres:", error);
            $("#cofres").html("<p>Erro ao carregar os cofres.</p>");
        }
    });
}

function abrirCofre(id) {
    window.location.href = `cofre.html?id=${id}`;
}

$(document).ready(function() {
    carregarCofres();
});
