const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const conn = require('./connect/mongodb');



const port = process.env.PORT;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());





const cookiesRouters = require('./routers/cookies.routers');
const userTypeRouters = require('./routers/usertype.routers');
const usersRouters1 = require('./routers/users1.routers');
const departmentRouter = require('./routers/department.routers');
const employee_types = require('./routers/employee_types.routers');
const group = require('./routers/group.routers');
const holiday_types = require('./routers/holiday_types.routers');
const position = require('./routers/position.routers');
const Country = require('./routers/Country.routers');
const Provice = require('./routers/Provice.routers');
const District = require('./routers/District.routers');
const Village = require('./routers/Village.routers');
const TitleLao = require('./routers/TitleLao.routers');
const TitleEng = require('./routers/TitleEng.routers');
const Gender = require('./routers/Gender.routers');
const Religion = require('./routers/Religion.routers');
const Nationality = require('./routers/Nationality.routers');

app.use("/api", cookiesRouters);
app.use("/api", userTypeRouters);
app.use("/api", usersRouters1);
app.use("/api", departmentRouter);
app.use("/api", employee_types);
app.use("/api", group);
app.use("/api", holiday_types);
app.use("/api", position);
app.use("/api", Country);
app.use("/api", Provice);
app.use("/api", District);
app.use("/api", Village);
app.use("/api", TitleLao);
app.use("/api", TitleEng);
app.use("/api", Gender);
app.use("/api", Religion);
app.use("/api", Nationality);

app.get('/api/server-time', (req, res) => {
    const now = new Date();
    const time = {
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    }
    res.json(time);
})


app.get('/', (req, res) => {
    res.send("This is Server");
    console.log(app.locals.title);

})


app.listen(port, () => {
    console.log('Server listenting on port' + port);
})

exports.app = app;