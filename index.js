const express = require('express');
const app = express();
const port = 3001;
const studentRouters = require('./routers/studentRouters');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/foods', studentRouters);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});