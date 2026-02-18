import express from 'express';

const app = express();
app.use(express.json());
const books= [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',price: 10.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.99 },
  { id: 3, title: '1984', author: 'George Orwell', price: 15.99 }
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/books', (req, res) => {
    res.json(books);
}); 
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id); // <-- important
    const book = books.find(book => book.id === id);    
    res.json(books.find(book => book.id === id) || { error: 'Book not found' });
}); 
app.delete('/api/books/:id', (req, res) => {
    const id=req.params.id;
    const index = books.findIndex(book => book.id ===id );
    books.splice(index, 1);
    console.log(`Book with id ${id} has been deleted.`);
    res.send(`Book with id ${id} has been deleted.`);
});
app.post('/api/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    console.log('New book added:', newBook);
    res.send('New book added successfully!');
});
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id); // <-- important
    const updatedBook = req.body;

    const index = books.findIndex(book => book.id === id); // id est maintenant number
    if (index === -1) {
        return res.status(404).send(`Book with id ${id} not found.`);
    }

    books[index] = { ...books[index], ...updatedBook }; // fusionne l'ancien et le nouveau
    console.log(`Book with id ${id} has been updated:`, books[index]);
    res.send(`Book with id ${id} has been updated successfully!`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');  
});