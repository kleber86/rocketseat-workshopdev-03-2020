// Cria um servidor usando o express
    const express = require('express')
    const server = express()

    const ideas = [
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
            title: "Cursos de Programação",
            category: "Estudo",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
            title: "Exercícios",
            category: "Saúde",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
            title: "Meditação",
            category: "Mentalidade",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
            title: "Karaoke",
            category: "Diversão em Familia",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
            title: "Pintura",
            category: "Criatividade",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
        {
            img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
            title: "Recortes",
            category: "Criatividade",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, culpa eos. Dicta possimus libero aperiam architecto quas, animi accusantium? Voluptatem excepturi inventore distinctio eos fuga quo autem, reiciendis delectus recusandae?",
            url: "https://www.rocketseat.com.br"
        },
    ]

/**
 * Configurar arquivos estáticos(CSS, scritps)
 */
    server.use(express.static('public'))

/**
 * Configuração do nunjucks
 */
    const nunjucks = require('nunjucks')
    nunjucks.configure('views', {
        express: server,
        noCache: true, // ou false
    })

/**
 * Criando uma rota para o /
 * e recupera o pedido do client
 */
    server.get('/', function(req, res) {
        const reverseIdeas = [...ideas].reverse()

        let lastIdeas = []
        for (const idea of reverseIdeas) {
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }

        return res.render('index.html', { ideas: lastIdeas})
    })
    server.get('/ideas', function(req, res) {
        const reverseIdeas = [...ideas].reverse()

        return res.render('ideas.html', { ideas: reverseIdeas})
    })

//Abre uma porta de numero 3000
    server.listen(3000)