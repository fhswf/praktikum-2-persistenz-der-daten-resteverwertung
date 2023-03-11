import express from 'express';
import DB from './db.js'

const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */
app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});


//
// YOUR CODE HERE
//
// Implement the following routes:
// GET /todos/:id

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await db.queryById(id);
    res.send(todo);
});

// POST /todos
app.post('/todos', async (req, res) => {
    const { title, due, status } = req.body;
    const newTodo = await db.create({ title, due, status });
    res.send(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, due, status } = req.body;
    const updatedTodo = await db.update(id, { title, due, status });
    res.send(updatedTodo);
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await db.delete(id);
    res.send({ message: `Todo with id ${id} has been deleted.` });
});

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

