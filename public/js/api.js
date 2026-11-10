const API_URL = "http://localhost:3000";

async function listarParticipantes() {
    try {
        const res = await fetch(`${API_URL}/participantes`);
        return await res.json();
    } catch (err) {
        console.error("Erro ao listar participantes:", err);
        return [];
    }
}

async function listarNaRoca() {
    try {
        const res = await fetch(`${API_URL}/participantes?naRoca=true`);
        return await res.json();
    } catch (err) {
        console.error("Erro ao listar peões na roça:", err);
        return [];
    }
}

async function listarForaDaRoca() {
    try {
        const res = await fetch(`${API_URL}/participantes?naRoca=false`);
        return await res.json();
    } catch (err) {
        console.error("Erro ao listar demais peões:", err);
        return [];
    }
}

async function listarVotos() {
    try {
        const res = await fetch(`${API_URL}/votos`);
        return await res.json();
    } catch (err) {
        console.error("Erro ao listar votos:", err);
        return [];
    }
}

async function registrarVoto(participanteId) {
    const novoVoto = {
        participanteId: Number(participanteId),
        data: new Date().toISOString()
    };

    try {
        const res = await fetch(`${API_URL}/votos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoVoto)
        });
        return await res.json();
    } catch (err) {
        console.error("Erro ao registrar voto:", err);
    }
}

async function zerarVotos() {
    try {
        const votos = await listarVotos();
        const apagarPromessas = votos.map(voto => 
            fetch(`${API_URL}/votos/${voto.id}`, { method: "DELETE" })
        );
        await Promise.all(apagarPromessas);
    } catch (err) {
        console.error("Erro ao zerar votos:", err);
    }
}

function calcularResultado(participantesNaRoca, votos) {
    const totalVotos = votos.length;
    const contagem = {};
    
    participantesNaRoca.forEach(p => contagem[p.id] = 0);
    votos.forEach(v => {
        if (contagem[v.participanteId] !== undefined) {
            contagem[v.participanteId]++;
        }
    });

    return participantesNaRoca.map(p => {
        const qtdVotos = contagem[p.id];
        const percentual = totalVotos > 0 ? ((qtdVotos / totalVotos) * 100).toFixed(1) : "0.0";
        return {
            ...p,
            votos: qtdVotos,
            percentual: parseFloat(percentual)
        };
    }).sort((a, b) => b.votos - a.votos);
}