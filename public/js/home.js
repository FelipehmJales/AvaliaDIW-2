document.addEventListener("DOMContentLoaded", async () => {
    const containerResumo = document.getElementById("roca-resumo");
    if (!containerResumo) return;

    const peoesNaRoca = await listarNaRoca();
    containerResumo.innerHTML = peoesNaRoca.map(p => `
        <div class="col-md-4">
            <div class="card card-fazenda p-2 d-flex flex-row align-items-center gap-3 shadow-sm">
                <img src="${p.foto}" alt="${p.nome}" class="rounded-circle" width="60" height="60" style="object-fit: cover;">
                <span class="fw-bold">${p.nome}</span>
            </div>
        </div>
    `).join('');
});