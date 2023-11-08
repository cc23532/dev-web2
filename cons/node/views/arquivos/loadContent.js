// JavaScript para carregar conteúdo dinâmico
function loadContent(option) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Limpa o conteúdo existente

    if (option === 'Agendar Consulta') {
        // Carrega o formulário de agendamento de consulta
        contentDiv.innerHTML = `
            <h2>Agendar Consulta</h2>
            <!-- Inclua o formulário de agendamento de consulta aqui -->
        `;
    } else if (option === 'Alterar Dados') {
        // Carrega o formulário para alterar dados
        contentDiv.innerHTML = `
            <h2>Alterar Dados</h2>
            <!-- Inclua o formulário para alterar dados aqui -->
        `;
    } else {
        // Se nenhuma opção correspondente for encontrada, exiba uma mensagem padrão
        contentDiv.innerHTML = `
            <h2>Conteúdo Selecionado</h2>
            <p>Aqui você pode exibir o conteúdo correspondente à opção de menu selecionada.</p>
        `;
    }
}
