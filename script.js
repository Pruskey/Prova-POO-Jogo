const canvas = document.getElementById('JCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keydown', function(atirar) {
    if (atirar.code == 'Space') {
        let projetil = new Projetil(jogador.x + jogador.largura / 2 - 10, jogador.y, 20, 20, './tiro.png', -5)
        projeteis.push(projetil)
    }
})

document.addEventListener('keydown', function(esquerda) {
    if (esquerda.code == 'ArrowLeft') {
        jogador.velocidade_x = -5;
    }
})

document.addEventListener('keydown', function(direita) {
    if (direita.code == 'ArrowRight') {
        jogador.velocidade_x = 5;
    }
})

document.addEventListener('keyup', function(e) {
    if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') {
        jogador.velocidade_x = 0;
    }
})

class Criatura {
    constructor(x, y, largura, altura, imagem) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.imagem = new Image()
        this.imagem.src = imagem
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
    }
}

class Invader extends Criatura {
    constructor(x, y, largura, altura, imagem, velocidade_y) {
        super(x, y, largura, altura, imagem)
        this.velocidade_y = velocidade_y
    }

    atualizar() {
        this.y += this.velocidade_y
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
    }
}

class Jogador extends Criatura {
    constructor(x, y, largura, altura, imagem, velocidade_x) {
        super(x, y, largura, altura, imagem)
        this.velocidade_x = velocidade_x
    }

    atualizar() {
        this.x += this.velocidade_x
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
    }
}

class Projetil extends Criatura {
    constructor(x, y, largura, altura, imagem, velocidade_y) {
        super(x, y, largura, altura, imagem)
        this.velocidade_y = velocidade_y
    }

    atualizar() {
        this.y += this.velocidade_y
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
    }
}

let invader = new Invader(200, 10, 80, 70, './math.png', 0.1)
const jogador = new Jogador(400, 500, 50, 80, './arma.png', 0)
const projeteis = []
let pontuacao = 0

function desenharPontuacao() {
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Pontuação: ' + pontuacao, 10, 30)
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (jogador.x > 910){
        jogador.x = 910
    } else if (jogador.x <0){
        jogador.x = 0
    }
    jogador.atualizar()

    for (let projetil of projeteis) {
        projetil.atualizar()
        projetil.desenhar()

        if (colisao(projetil, invader)) {
            invader = new Invader(Math.random() * (canvas.width - 80), 10, 80, 70, './math.png', 0.1)
            pontuacao += 10

            const index = projeteis.indexOf(projetil)
            if (index > -1) {
                projeteis.splice(index, 1)
            }
        }

        if (projetil.y < 0) {
            const index = projeteis.indexOf(projetil)
            if (index > -1) {
                projeteis.splice(index, 1)
            }
        }
    }


    invader.atualizar()
    invader.desenhar()

    jogador.desenhar()

    desenharPontuacao()

    requestAnimationFrame(loop)
}

function colisao(projetil, invader) {
    return projetil.x < invader.x + invader.largura &&
           projetil.x + projetil.largura > invader.x &&
           projetil.y < invader.y + invader.altura &&
           projetil.y + projetil.altura > invader.y
}

invader.imagem.onload = function() {
    loop()
}
