// Cria um servidor usando o express
const express = require('express')
const server = express()
const db = require('./db')
   
/**
 * Configurar arquivos estáticos(CSS, scritps)
 */
    server.use(express.static('public'))

/**
 * Habilitar o uso do req.body
 */
    server.use(express.urlencoded({extended: true}))
    
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
    server.get('/', function (req, res) {

        db.all(`SELECT * FROM ideas`, function (err, rows) {
            if (err) return console.log(err)

            const reverseIdeas = [...rows].reverse()

            let lastIdeas = []
            for (const idea of reverseIdeas) {
                if (lastIdeas.length < 2) {
                    lastIdeas.push(idea)
                }
            }
            return res.render('index.html', { ideas: lastIdeas })
        })
    })
    server.get('/ideas', function (req, res) {
        db.all(`SELECT * FROM ideas`, function (err, rows) {
            if (err) return console.log(err)

            const reverseIdeas = [...rows].reverse()

        return res.render('ideas.html', { ideas: reverseIdeas })
        })
    })
    server.post('/', function (req, res) {
        const query = `
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
            ) VALUES (?,?,?,?,?)    
        `
        const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link,
            
        ]

        db.run(query, values, function (err) {
            if (err){
                console.log(err)
                return res.send('Erro no banco de dados!')
            }
            return res.redirect('/ideas')
        })
    })
//Abre uma porta de numero 3000
    server.listen(3000)