const express = require("express");
const path= require("path");
const app= express();
const port= process.env.PORT || 5000;
const hbs=require("hbs");

require("./db/conn.js");

const Donor= require("./models/Donor.js");
const Request=require("./models/req.js");
const { homedir } = require("os");

const static_path= path.join(__dirname,"../public");
const templets_path= path.join(__dirname,"../templets/views");
const partials_path= path.join(__dirname,"../templets/partials");
app.use(express.img_path("../templets/views/vecteezy_activism-donor-day-illustration1_DI0421.jpg"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templets_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res) =>{
    res.render('home')
});
app.post('/templets/views/req.hbs', (req, res) => {
    res.render('req');
  })
app.post('/templets/views/index.hbs', (req, res) => {
    res.render('index');
  })

  app.post('/templets/views/donorsfound.hbs', (req, res) => {
    res.render('donorsfound');
  })


app.get("/donor",(req,res) =>{
    res.render("donor")
});


app.post("/donor",async(req,res) =>{
   try{
    const DonorDetails= new Donor({
        Name : req.body.Name ,
        // PhoneNo: req.body.PhoneNo ,
        Age: req.body.Age,
        BG : req.body.BG ,
        State: req.body.State,
        City: req.body.City,
        PinCode : req.body.PinCode ,
        Address : req.body.Address ,
     
    })    
       const donors= await DonorDetails.save();
       console.log(donors)
       res.status(201).render(home);
    

   } catch(error) {
    res.status(400).send(error);

   }
});


app.get("/request",(req,res) =>{
  res.render("req")
});


app.get('/findblood', async (req, res) => {
  try {
   
      const { BG, state, city } = req.query;
      

      const query = {
          ...(BG && { BG: BG }), 
          ...(state && { state: state }), 
          ...(city && { city: city })  }

    
      
      
      const donors = await Donor.find(query);

      console.log(donors)




      res.status(200).json(donors);
  } catch (error) {
      console.error('Error while fetching data', error);
      res.status(500).send('Error while fetching donor information');
  }
});


app.post("/requestblood",async(req,res) =>{
  try{
   const UserReq= new Request({
       State: req.body.State,
       City: req.body.City,
       BG : req.body.BG ,
    
   })    
      const request= await UserReq.save();
      console.log(request)
      res.status(201).render('home');
   

  } catch(error) {
   res.status(400).send(error);

  }
});
// app.get('/get-data', async (req, res) => {
//     try {
//         const data = await Request.find();
//         res.send(data);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }
// );

app.get('/templets/views/req.hbs', (req, res) => {
  res.render('req');
});

app.get('/templets/views/req.hbs', (req, res) => {
  res.render('req');
});

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})