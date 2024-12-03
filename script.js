document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const closeButton = document.getElementById('close-button');
    const comprarBtn = document.getElementById("comprar-btn");

    // Adiciona evento de clique para abrir/fechar o menu hamburguer
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Alterna a classe active
    });

    // Adiciona evento de clique para fechar o menu
    closeButton.addEventListener('click', () => {
        navMenu.classList.remove('active'); // Remove a classe active ao fechar
    });

    // Função para digitar o texto
    const text = "Feira do Gotham City.";
    let index = 0;

    function type() {
        if (index < text.length) {
            document.getElementById("typed").textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type(); // Inicia a digitação

    // Aplica o efeito de fade-in em todas as seções ao carregar
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add("fade-in");
        }, index * 200); // Atraso para cada seção
    });

    // Código para verificar o carregamento das imagens
    var images = document.querySelectorAll('img');
    var totalImages = images.length;
    var loadedImages = 0;

    images.forEach(function(image) {
        image.onload = function() {
            loadedImages++;
            if (loadedImages === totalImages) {
                // Remover o loader quando todas as imagens forem carregadas
                const loader = document.querySelector('.loader');
                if (loader) {
                    loader.style.display = 'none';
                }
            }
        };
    });

    // Código para mudar a cor do cabeçalho ao rolar
    window.addEventListener('scroll', function() {
        var header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#333'; // cor ao rolar
        } else {
            header.style.backgroundColor = 'transparent'; // cor original
        }
    });

    // Código para smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Estoque inicial
    const estoqueInicial = {
        bolo: 10,
        esfiha: 10,
        conePequeno: 10,
        coneGrande: 10,
        mousse: 10,
        refri: 10,
        jogo: 10
    };

    // Carregar estoque do Local Storage
    function carregarEstoque() {
        const estoque = JSON.parse(localStorage.getItem('estoque'));
        return estoque ? estoque : estoqueInicial;
    }

    // Atualizar o estoque no Local Storage
    function atualizarEstoque(estoque) {
        localStorage.setItem('estoque', JSON.stringify(estoque));
    }

    // Atualizar a exibição do estoque
    function atualizarExibicaoEstoque(estoque) {
        document.getElementById('estoque-bolo').innerText = estoque.bolo;
        document.getElementById('estoque-esfiha').innerText = estoque.esfiha;
        document.getElementById('estoque-cone-pequeno').innerText = estoque.conePequeno;
        document.getElementById('estoque-cone-grande').innerText = estoque.coneGrande;
        document.getElementById('estoque-mousse').innerText = estoque.mousse;
        document.getElementById('estoque-refri').innerText = estoque.refri;
        document.getElementById('estoque-jogo').innerText = estoque.jogo;
    }

    // Função para processar a compra
    function processarCompra() {
        const estoque = carregarEstoque();
        const boloQuantidade = parseInt(document.getElementById('bolo').value);
        const esfihaQuantidade = parseInt(document.getElementById('esfiha').value);
        const conePequenoQuantidade = parseInt(document.getElementById('cone-pequeno').value);
        const coneGrandeQuantidade = parseInt(document.getElementById('cone-grande').value);
        const mousseQuantidade = parseInt(document.getElementById('mousse').value);
        const refriQuantidade = parseInt(document.getElementById('refri').value);
        const jogoQuantidade = parseInt(document.getElementById('jogo').value);

        // Verifica se a quantidade solicitada é válida e se há estoque suficiente
        if (boloQuantidade > estoque.bolo || esfihaQuantidade > estoque.esfiha || 
            conePequenoQuantidade > estoque.conePequeno || coneGrandeQuantidade > estoque.coneGrande || 
            mousseQuantidade > estoque.mousse || refriQuantidade > estoque.refri || 
            jogoQuantidade > estoque.jogo) {
            alert("Quantidade solicitada excede o estoque disponível.");
            return;
        }

        // Atualiza o estoque
        estoque.bolo -= boloQuantidade;
        estoque.esfiha -= esfihaQuantidade;
        estoque.conePequeno -= conePequenoQuantidade;
        estoque.coneGrande -= coneGrandeQuantidade;
        estoque.mousse -= mousseQuantidade;
        estoque.refri -= refriQuantidade;
        estoque.jogo -= jogoQuantidade;

        // Atualiza o Local Storage e a exibição
        atualizarEstoque(estoque);
        atualizarExibicaoEstoque(estoque);

        // Alerta de confirmação
        alert("Compra realizada com sucesso!");

        // Copiar o número de telefone para a área de transferência
        const numeroTelefone = "+5518991515340";
        navigator.clipboard.writeText(numeroTelefone).then(() => {
            alert(" pix copiado para area de transferencia após a compra mande o comprovante em nosso grupo");
        }).catch(err => {
            console.error("Erro ao copiar o número de telefone: ", err);
        });
    }

    // Asegure-se de que o evento de clique do botão chama a função corretamente
    comprarBtn.addEventListener("click", processarCompra);

    // Inicializa a exibição do estoque ao carregar a página
    const estoque = carregarEstoque();
    atualizarExibicaoEstoque(estoque);
});


document.addEventListener("DOMContentLoaded", function() {
    const adminLoginBtn = document.getElementById("admin-login-btn");
    const adminPassword = document.getElementById("admin-password");
    const adminSection = document.getElementById("admin-section");
    const adminEstoque = document.getElementById("admin-estoque");
    const adminSaveBtn = document.getElementById("admin-save-btn");

    // Método para validar a senha
    function validarSenha(senha) {
        // Senha codificada ou oculta na função
        return senha === "30301520";
    }

    // Função para exibir a área de edição de estoque
    function mostrarAdminArea() {
        adminSection.querySelector("#admin-login").style.display = 'none';
        adminEstoque.classList.remove("hidden");
    }

    // Função para carregar o estoque
    function carregarEstoque() {
        const estoque = JSON.parse(localStorage.getItem('estoque'));
        return estoque ? estoque : estoqueInicial; // Se não houver estoque, retorna o estoque inicial
    }

    // Função para atualizar o estoque no localStorage
    function atualizarEstoque(estoque) {
        localStorage.setItem('estoque', JSON.stringify(estoque));
    }

    // Função para atualizar a exibição do estoque
    function atualizarExibicaoEstoque(estoque) {
        document.getElementById('estoque-bolo').innerText = estoque.bolo;
        document.getElementById('estoque-esfiha').innerText = estoque.esfiha;
        document.getElementById('estoque-cone-pequeno').innerText = estoque.conePequeno;
        document.getElementById('estoque-cone-grande').innerText = estoque.coneGrande;
        document.getElementById('estoque-mousse').innerText = estoque.mousse;
        document.getElementById('estoque-refri').innerText = estoque.refri;
        document.getElementById('estoque-jogo').innerText = estoque.jogo;
    }

    // Verificar senha de admin
    adminLoginBtn.addEventListener("click", function() {
        const senha = adminPassword.value;
        if (validarSenha(senha)) {
            mostrarAdminArea();
        } else {
            alert("Senha incorreta!");
        }
    });

    // Salvar as alterações no estoque
    adminSaveBtn.addEventListener("click", function() {
        const novoEstoque = {
            bolo: parseInt(document.getElementById("admin-bolo").value) || 0,
            esfiha: parseInt(document.getElementById("admin-esfiha").value) || 0,
            conePequeno: parseInt(document.getElementById("admin-cone-pequeno").value) || 0,
            coneGrande: parseInt(document.getElementById("admin-cone-grande").value) || 0,
            mousse: parseInt(document.getElementById("admin-mousse").value) || 0,
            refri: parseInt(document.getElementById("admin-refri").value) || 0,
            jogo: parseInt(document.getElementById("admin-jogo").value) || 0
        };

        // Atualiza o estoque no LocalStorage e na exibição
        atualizarEstoque(novoEstoque);
        atualizarExibicaoEstoque(novoEstoque);
        alert("Estoque atualizado com sucesso!");
    });

    // Inicialização do estoque (caso o localStorage não tenha nada)
    const estoqueInicial = {
        bolo: 10,
        esfiha: 10,
        conePequeno: 10,
        coneGrande: 10,
        mousse: 10,
        refri: 10,
        jogo: 10
    };

    // Carregar o estoque inicial do localStorage e exibir
    const estoque = carregarEstoque();
    atualizarExibicaoEstoque(estoque);
});
