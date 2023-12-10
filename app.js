
credentials = require('./middi/credentials.js');
const corsOptions = require('./config/corsOptions.js');
const express =require("express")
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;
const cors = require("cors")
const app = express()


app.use(fileUpload({
    useTempFiles:true
}))
 

app.use(express.json())


// app.use(cors({
//   origin: "http://localhost:3000",
//   // origin: "https://ssu-admin.netlify.app",
// }))

app.use(cors(corsOptions));

  

cloudinary.config({
    cloud_name: "decjoyrmj",
    api_key: "627647724186355",
    api_secret: "mw_DjfFMzfZ2pKOWv1hNyuP8T0A"
  });
   
////// routing will be here ///////

const customerDetailsroute = require("./Routes/customerDetailsRoute.js")


app.use("/customerDetails", customerDetailsroute);


module.exports = app;











/* 
const blogData = require("./routes/blogRoute")
app.use("/admin", blogData)



const user = require("./routes/userRoute")
app.use("/user", user)




const adminSuggestion = require("./routes/adminSuggesstionRoute.js")
app.use("/admin", adminSuggestion)


const admin = require("./routes/adminRoute")
app.use("/admin", admin)


const dummyTemplate = require("./routes/adminDummy")
app.use("/adminDummy", dummyTemplate)


const ResumeExample = require("./routes/resumeExampleRoute")
app.use("/adminContent", ResumeExample)


 */
