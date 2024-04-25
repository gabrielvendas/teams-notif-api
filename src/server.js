const app = require('./app');
const port = process.env.PORT || 63147;

app.listen(port, () => console.log(`Server is running on port ${port}`));