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

app.post("/trips", (req, res) => {
    const data_inicio = req.body.data_inicio;
    const data_fim = req.body.data_fim;
    const criador = req.body.criador;
    const país = req.body.país;
    const cidade = req.body.cidade;
    const local_hospedagem = req.body.local_hospedagem;

    db.query("INSERT INTO trip (data_inicio, data_fim, criador, país, cidade, local_hospedagem) VALUES (?, ?, ?, ?, ?, ?)",[data_inicio, data_fim, criador, país, cidade, local_hospedagem],
    (err, result) => {
        if (err) {
          console.error('Erro ao inserir viagem: ' + err);
          res.status(500).json({ error: 'Erro interno do servidor' });
          return;
        } 
      });
  });


app.get("/trips", (req, res) => {
    db.query("SELECT * FROM trip", (err, result) => {
        if (err) {
            console.error('Erro ao buscar viagens:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.get("/tripviajantes/:tripId", (req, res) => {
    const trip_id = req.params.tripId; // Obtenha o valor da viagem dos parâmetros da URL

    db.query('SELECT users.nome FROM viajantes JOIN users ON viajantes.viajante_id = users.idusuarios WHERE viajantes.trip_id = ?',
        [trip_id],
        (err, result) => {
            if (err) {
                console.log('Erro ao buscar viajantes' + err);
                res.status(500).send('Erro ao buscar viajantes'); 
                return;
            }

            res.json(result);
        }
    );
});

app.post("/trips/:tripId/join", (req,res) => {
    const trip_id = req.params.tripId;
    const viajante_id = req.body.viajante_id;

    db.query('INSERT INTO viajantes (trip_id, viajante_id) values (?,?)',
    [trip_id,viajante_id],
    (err,result) => {
        if(err){
            console.log('Erro ao inserir viajantes' + err);
            return;
        }else{
            console.log('inserido com sucesso!')
        }
    });
});


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
            const userId = result[0].idusuarios;
            res.send({msg: "Usuario logado com sucesso!", userId:userId});

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
