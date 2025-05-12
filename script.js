const canvas = document.getElementById('JCanvas')
const ctx = canvas.getContext('2d')


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

let invader = new Invader(200, 10, 80, 70, './math.png', 0.1)
const jogador = new Jogador(400, 500, 50, 80, './arma.png', 0)

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    jogador.atualizar()


    invader.atualizar()
    invader.desenhar()

    jogador.desenhar()

    desenharPontuacao()

    requestAnimationFrame(loop)
}

invader.imagem.onload = function() {
    loop()
}
