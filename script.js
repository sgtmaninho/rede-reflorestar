// =========================================================
// REDE REFLORESTAR - JavaScript integrado ao Bootstrap
// 1) Modo escuro (localStorage)   2) Contador da meta
// 3) Filtro de espécies           4) Calculadora
// 5) Modal de adoção              6) Validação do formulário
// 7) Fechar o menu do celular ao clicar num link
// 8) Galeria do viveiro (Modal)  9) Navbar ao rolar a página
// 10) Máscara do telefone
// =========================================================


// Formata números no padrão brasileiro (vírgula decimal)
function formatar(numero, casas) {
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}


// ---------- 1) MODO ESCURO ----------
// O Bootstrap 5.3 muda as cores quando <html> tem data-bs-theme="dark".
// Guardamos a escolha no localStorage para lembrar na próxima visita.
const html = document.documentElement;
const btnTema = document.getElementById('btnTema');

function aplicarTema(tema) {
    html.setAttribute('data-bs-theme', tema);
    // Troca o ícone do Bootstrap Icons: sol no modo escuro, lua no claro
    btnTema.innerHTML = tema === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
}

let temaSalvo = 'light';
try { temaSalvo = localStorage.getItem('tema') || 'light'; } catch (e) {}
aplicarTema(temaSalvo);

btnTema.addEventListener('click', () => {
    const novoTema = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    aplicarTema(novoTema);
    try { localStorage.setItem('tema', novoTema); } catch (e) {}
});


// ---------- 2) CONTADOR DA META ----------
// Troque MUDAS_ADOTADAS pelo número real quando tiver.
const META = 10000;
const MUDAS_ADOTADAS = 3742;

const contador = document.getElementById('contador');
const metaBarra = document.getElementById('metaBarra');
const porcentoMeta = Math.round((MUDAS_ADOTADAS / META) * 100);

const inicio = performance.now();
function animarContador(agora) {
    const progresso = Math.min((agora - inicio) / 1500, 1);
    contador.innerText = formatar(Math.round(MUDAS_ADOTADAS * progresso), 0);
    if (progresso < 1) requestAnimationFrame(animarContador);
}
requestAnimationFrame(animarContador);

metaBarra.style.width = porcentoMeta + '%';
metaBarra.parentElement.setAttribute('aria-valuenow', porcentoMeta);
document.getElementById('metaTexto').innerText = porcentoMeta + '% da meta de ' + formatar(META, 0);


// ---------- 3) FILTRO DE ESPÉCIES ----------
// Usa a classe .d-none do Bootstrap para esconder os cards.
const botoesFiltro = document.querySelectorAll('#filtros .btn');
const colunasEspecie = document.querySelectorAll('.especie-col');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');

        const escolhido = botao.dataset.filtro;
        colunasEspecie.forEach(col => {
            const tipos = col.dataset.tipo.split(' ');
            const mostrar = escolhido === 'todas' || tipos.includes(escolhido);
            col.classList.toggle('d-none', !mostrar);
        });
    });
});


// ---------- 4) CALCULADORA ----------
// Fatores de emissão aproximados em kg de CO2 (fins educativos)
const FATORES = {
    energia: 0.06,       // por kWh (matriz elétrica brasileira)
    gasolina: 0.16,      // por km
    etanol: 0.04,        // por km
    eletrico: 0.01,      // por km
    nenhum: 0,
    botijao: 39,         // por botijão de 13 kg
    refeicaoCarne: 4,    // por refeição com carne vermelha
    voo: 300             // por voo nacional ida e volta
};
const KG_POR_MUDA = 150;  // CO2 que uma muda nativa absorve ao crescer

const valor = id => Number(document.getElementById(id).value) || 0;

function calcular() {
    const pessoas = Math.max(1, valor('pessoas'));
    const combustivel = document.getElementById('combustivel').value;

    const categorias = [
        { nome: 'Energia',     kg: valor('energia') * FATORES.energia * 12 },
        { nome: 'Carro',       kg: valor('km') * FATORES[combustivel] * 12 },
        { nome: 'Gás',         kg: valor('gas') * FATORES.botijao * 12 },
        { nome: 'Alimentação', kg: valor('carne') * FATORES.refeicaoCarne * 52 },
        { nome: 'Voos',        kg: valor('voos') * FATORES.voo }
    ];

    const totalKg = categorias.reduce((soma, c) => soma + c.kg, 0);
    const maior = Math.max(...categorias.map(c => c.kg), 1);
    const mudas = Math.ceil(totalKg / KG_POR_MUDA);

    document.getElementById('mudas').innerText = formatar(mudas, 0);
    document.getElementById('total').innerText = formatar(totalKg / 1000, 1);
    document.getElementById('porPessoa').innerText = formatar(totalKg / 1000 / pessoas, 1);
    document.getElementById('anel').style.setProperty('--porcento', Math.min(mudas, 100));

    // Cada categoria vira uma barra de progresso do Bootstrap
    document.getElementById('categorias').innerHTML = categorias.map(c => `
        <li class="mb-2">
            <div class="d-flex justify-content-between texto-capim">
                <span>${c.nome}</span><span>${formatar(c.kg / 1000, 2)} t</span>
            </div>
            <div class="progress" style="height: 6px;">
                <div class="progress-bar ${c.kg === maior ? 'bg-ipe' : 'bg-success'}" style="width: ${(c.kg / maior) * 100}%"></div>
            </div>
        </li>
    `).join('');
}

const calcForm = document.getElementById('calcForm');
calcForm.addEventListener('input', calcular);
calcForm.addEventListener('submit', e => e.preventDefault());

document.getElementById('carne').addEventListener('input', e => {
    document.getElementById('carneValor').innerText = e.target.value;
});

calcular();   // mostra um exemplo ao abrir a página


// ---------- 5) MODAL DE ADOÇÃO ----------
// Abre o Modal do Bootstrap pelo JavaScript, como no material da aula:
// const meuModal = new bootstrap.Modal(elemento); meuModal.show();
const elementoModal = document.getElementById('modalAdocao');
const modalAdocao = new bootstrap.Modal(elementoModal);

document.querySelectorAll('.btn-adotar').forEach(botao => {
    botao.addEventListener('click', () => {
        document.getElementById('modalPlano').innerText = botao.dataset.plano;
        document.getElementById('modalValor').innerText = botao.dataset.valor + ' por mês';
        modalAdocao.show();
    });
});

// O link "Ir para o contato" fecha o modal antes de rolar a página
document.getElementById('modalIrContato').addEventListener('click', () => {
    modalAdocao.hide();
});


// ---------- 6) VALIDAÇÃO DO FORMULÁRIO ----------
// Usa as classes .is-valid e .is-invalid do Bootstrap.
const contatoForm = document.getElementById('contatoForm');
const retorno = document.getElementById('formRetorno');

contatoForm.addEventListener('submit', evento => {
    evento.preventDefault();   // não recarrega a página

    let tudoCerto = true;
    contatoForm.querySelectorAll('input, textarea').forEach(campo => {
        const valido = campo.checkValidity();
        campo.classList.toggle('is-valid', valido);
        campo.classList.toggle('is-invalid', !valido);
        if (!valido) tudoCerto = false;
    });

    if (!tudoCerto) {
        retorno.hidden = true;
        return;
    }

    const nome = document.getElementById('nome').value.trim();
    retorno.innerText = 'Obrigado, ' + nome + '! Seu interesse foi registrado nesta página.';
    retorno.hidden = false;

    contatoForm.reset();
    contatoForm.querySelectorAll('input, textarea').forEach(c => c.classList.remove('is-valid'));
});


// ---------- 7) MENU DO CELULAR ----------
// Fecha o menu hambúrguer ao clicar em um link
const menu = document.getElementById('menu');
const menuColapso = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('show')) menuColapso.hide();
    });
});


// ---------- 8) GALERIA DO VIVEIRO ----------
// Ao clicar numa foto, ela abre grande dentro de um Modal do Bootstrap.
const modalGaleria = new bootstrap.Modal(document.getElementById('modalGaleria'));
const galeriaFoto = document.getElementById('galeriaFoto');
const galeriaLegenda = document.getElementById('galeriaLegenda');

document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => {
        galeriaFoto.src = item.dataset.foto;
        galeriaFoto.alt = item.dataset.legenda;
        galeriaLegenda.innerText = item.dataset.legenda;
        modalGaleria.show();
    });
});


// ---------- 9) NAVBAR AO ROLAR ----------
// Deixa a navbar mais baixa e com sombra depois que a página rola um pouco.
const navbar = document.getElementById('navbar');

function verificarRolagem() {
    navbar.classList.toggle('rolando', window.scrollY > 60);
}
window.addEventListener('scroll', verificarRolagem);
verificarRolagem();


// ---------- 10) MÁSCARA DO TELEFONE ----------
// Enquanto a pessoa digita, o número vira (61) 90000-0000.
const telefone = document.getElementById('telefone');

telefone.addEventListener('input', () => {
    const numeros = telefone.value.replace(/\D/g, '').slice(0, 11);
    let formatado = numeros;

    if (numeros.length > 2) {
        formatado = '(' + numeros.slice(0, 2) + ') ' + numeros.slice(2);
    }
    if (numeros.length > 6) {
        const meio = numeros.length === 11 ? 7 : 6;
        formatado = '(' + numeros.slice(0, 2) + ') ' + numeros.slice(2, meio) + '-' + numeros.slice(meio);
    }
    telefone.value = formatado;
});
