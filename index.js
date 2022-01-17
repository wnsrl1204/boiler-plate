const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

const config = require('./config/key');

const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요 ~')
})


app.post('/register',(req, res) => {
    //회원 가입시 필요한 정보를 클라이언트에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body);

    //mongo db에서 오는 메서드
    user.save((err, doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})