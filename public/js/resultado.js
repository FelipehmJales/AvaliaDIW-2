document.addEventListener("DOMContentLoaded", () => {
    carregarTelaResultado();
});

async function carregarTelaResultado() {
    const container = document.getElementById("resultado-container");
    const totalEl = document.getElementById("total-votos");

    if (!container || !totalEl) return;

    const peoesNaRoca = await listarNaRoca();
    const votos = await listarVotos();
    const totalVotos = votos.length;

    totalEl.innerText = totalVotos;

    if (totalVotos === 0) {
        container.innerHTML = `
            <div class="card card-fazenda p-5 text-center shadow">
                <p class="fs-5 mb-3">Nenhum voto ainda. É você quem decide quem vai para o brejo.</p>
                <div>
                    <a href="votacao.html" class="btn btn-danger btn-lg">Ir para a votação</a>
                </div>
            </div>
        `;
        return;
    }

    const resultadoOrdenado = calcularResultado(peoesNaRoca, votos);

    container.innerHTML = resultadoOrdenado.map((p, idx) => `
        <div class="card card-fazenda p-3 mb-3 shadow">
            <div class="d-flex align-items-center gap-3">
                <img src="${p.foto}" alt="${p.nome}" class="rounded" width="70" height="70" style="object-fit: cover;">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <h5 class="mb-0">
                            ${p.nome}
                            ${idx === 0 ? '<span class="badge bg-danger ms-2">Sairia hoje</span>' : ''}
                        </h5>
                        <span class="fw-bold">${p.percentual}% (${p.votos} votos)</span>
                    </div>
                    <div class="progress" style="height: 22px;">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${p.percentual}%;" aria-valuenow="${p.percentual}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function confirmarEZerarVotos() {
    await zerarVotos();
    localStorage.removeItem("meus_votos");
    
    const modalElement = document.getElementById("modalZerar");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
    
    carregarTelaResultado();
}