$(document).ready(function() {
    // Limpa o localStorage ao carregar a página
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Evento de submit do formulário
    $('#loginForm').on('submit', async function(event) {
        event.preventDefault(); // Evita o reload da página
        console.log("Entrou aqui!")
        const vEmail = $("#username").val();
        const vPassword = $("#password").val();
        const vData = { email: vEmail, password: vPassword };

        $.ajax({
            url: `http://localhost:3333/login`, // URL da API
            type: 'POST',
            data: JSON.stringify(vData),
            contentType: "application/json",
            success: function(response) {
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("token", response.token);

                console.log(response);
                window.location.href = "src/html/page.html";
            },
            error: function(error) {
                console.error('Erro ao fazer a requisição:', error);
                $("#error-message").text("Usuário ou senha inválidos!").show();
            }
        });
    });
});
