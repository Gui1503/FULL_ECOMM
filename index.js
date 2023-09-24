

const express =  require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extend: true}))

app.get('/',(req , res)=>{
res.send(`
<div>
    <form method="POST">
        <input name="email" placeholder="email">
        <input name="senha" placeholder="senha">
        <input name="confirmaSenha" placeholder="confirma Senha">

        <button>cadastrar</button>
    </form>

</div>`)
})
app.post('/', (req , res) =>{
console.log(req.body)
res.send('Tudo certo....')
})


app.listen(5050, ()=>{
    console.log("server no ar....")
})