document.addEventListener("DOMContentLoaded", async () => {
    const rocaContainer = document.getElementById("roca-cards");
    const outrosContainer = document.getElementById("demais-peoes");

    if (!rocaContainer || !outrosContainer) return;

    const peoesNaRoca = await listarNaRoca();
    const peoesForaRoca = await listarForaDaRoca();

    rocaContainer.innerHTML = peoesNaRoca.map(p => `
        <div class="col">
            <div class="card card-fazenda h-100 position-relative shadow">
                <span class="position-absolute top-0 end-0 badge badge-roca m-2">Na roça</span>
                <img src="${p.foto}" class="card-img-top" alt="${p.nome}" style="height: 240px; object-fit: cover;">
                <div class="card-body text-center d-flex flex-column justify-content-between">
                    <h5 class="card-title">${p.nome}</h5>
                    <button onclick="votarNoPeao('${p.id}', '${p.nome}')" class="btn btn-danger w-100 mt-2 fw-bold">
                        Votar para eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    outrosContainer.innerHTML = peoesForaRoca.map(p => `
        <div class="col">
            <div class="card card-fazenda text-center p-2 h-100 shadow-sm">
                <img src="${p.foto}" class="card-img-top rounded" alt="${p.nome}" style="height: 100px; object-fit: cover;">
                <small class="mt-2 fw-bold text-truncate">${p.nome}</small>
            </div>
        </div>
    `).join('');
});

async function votarNoPeao(id, nome) {
    await registrarVoto(id);
    
    let meusVotos = parseInt(localStorage.getItem("meus_votos") || "0", 10) + 1;
    localStorage.setItem("meus_votos", meusVotos);

    const alertArea = document.getElementById("alert-area");
    alertArea.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show mt-3 shadow-sm" role="alert">
            Você votou para eliminar <strong>${nome}</strong>! Você já votou <strong>${meusVotos}</strong> vez(es).
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}