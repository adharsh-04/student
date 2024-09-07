const exp=require('express');;
const app=exp();
const userapi=require('../backend/APIs/userapi')
require('dotenv').config();
const port=process.env.PORT||4000;
app.use('/userapi',userapi);
app.listen(port,()=>console.log(`server is running on port ${port}....`));
