const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "banco",
});

app.use(express.json());
app.use(cors());


app.post("/register", (req, res)=>{
    const nome = req.body.nome;
    const idade = req.body.idade;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const password = req.body.password;
    const telefone = req.body.telefone;
    const country = req.body.country;
    const cidade = req.body.cidade;

    db.query("SELECT * from users WHERE email = ?", [email], 
    (err, resultado) => {
        if (err) {
            res.send(err);
        }
        if(resultado.length == 0){
            db.query("INSERT INTO users (nome, idade, sexo, email, password, telefone, country, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nome, idade, sexo, email,password, telefone, country, cidade], (err, resultado)=>{
                if(err){
                    res.send(err);
                }
                res.send({msg: "Cadastrado com sucesso!"});
            }
            );
        }else{
            res.send({msg: "Usuario já cadastrado!"});
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * from users WHERE email = ? and password = ?",
     [email, password], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            res.send({msg: "Usuario logado com sucesso!"});
        }
        else{
            res.send({msg: "Usuario não cadastrado"}); 
        }
    }
    );
})

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});
