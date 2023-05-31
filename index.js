const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectToMongoDB = require("./database/database");
const Game = require("./database/models/Game");
const { isValidObjectId } = require("mongoose");
const mongoose = require("mongoose");
const JWTSecret = "asodniasodnasopdnjopawshndopashnod";





// Database
connectToMongoDB()
    .then(() => {
        console.log("Conexão feita com sucesso");
    }).catch((err) => {
        console.log(err);
    })
// Database

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function auth(req, res, next) {

    const authToken = req.headers['authorization'];

    if (authToken != undefined) {

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Invalid Token" });
            } else {

                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        })

    } else {
        res.status(401);
        res.json({ err: "Invalid Token" })
    }




};



var DB = {
    users: [
        {
            id: 1,
            name: "Victor Lima",
            email: "victordevtb@guiadoprogramador.com",
            password: "nodejs<3"
        },
        {
            id: 20,
            name: "Guilherme",
            email: "guigg@gmail.com",
            password: "java123"

        }
    ]

}


app.get("/games", auth,  (req, res) => {


    Game.find()
        .then((games) => {
            res.status(200).json({games, _links: HATEOAS});
        }).catch((err) => {
            console.log(err);
        })

});


app.get("/game/:id", auth, (req, res) => {

const gameId = req.params.id;


    if (!isValidObjectId(gameId)) {
        res.status(400).json({ error: "Invalid Id" });
        return;
    }

    Game.findById(gameId)
        .then((game) => {
            if (game) {
                res.status(200).json({game, _links: HATEOAS});
            } else {
                res.sendStatus(404);
            }
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
});


app.post("/game", auth, (req, res) => {
    const { title, price, year } = req.body;


    if (!title || !price || !year) {
        res.status(400).json({ error: "Incomplete Data" });
        return;
    }


    const newGame = new Game({
        title,
        price,
        year,
    });

    newGame.save()
        .then((game) => {
            res.status(200).json(game);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.delete("/game/:id", auth, (req, res) => {

    const gameId = req.params.id;




    if (!isValidObjectId(gameId)) {
        res.status(400).json({ error: "Invalid Id" });
        return;
    }

    Game.findByIdAndRemove(gameId)
        .then((deletedGame) => {
            if (deletedGame) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })



});

app.put("/game/:id", auth, (req, res) => {

    const gameId = req.params.id


    if (!isValidObjectId(gameId)) {
        res.status(400).json({ error: "Invalid Id" });
        return;
    }

    const { title, price, year } = req.body;

    if (!title && !price && !year) {
        res.status(400).json({ error: "No data provided for update" });
        return;
      }


    const updateData = {};
    if (title) updateData.title = title;
    if (price) updateData.price = price;
    if (year) updateData.year = year;

    Game.findByIdAndUpdate(gameId, updateData, { new: true })
        .then((updatedGame) => {
            if (updatedGame) {
                res.status(200).json(updatedGame);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });



});


app.post("/auth", (req, res) => {

    var { email, password } = req.body;

    if (email != undefined) {

        var user = DB.users.find(u => u.email == email);

        if (user != undefined) {

            if (user.password == password) {

                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: "falha interna" });
                    } else {

                        res.status(200);
                        res.json({ token: token });

                    }
                })



            } else {
                res.status(401);
                res.json({ err: "Invalid credentials!" })
            }

        } else {
            res.status(404)
            res.json({ err: "O email enviado não existe na base de dados!" })
        }

    } else {
        res.status(400);
        res.json({ err: "o E-mail enviado é inválido" })
    }


})


app.listen(25062, () => {
    console.log("Api Rodando")
});