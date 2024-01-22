
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

var Book = require("../models/bookModel");
const BOOKS = [
  {
  id:"2",
  name:"xyz",
  author:"abc",
  image:"https://images.unsplash.com/photo-1695408249017-f056cbf795e1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
  description:"write description here",
  prize:"200",
  page:30,
  year:2018,
  publication:"own"
}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register_book', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {

  try {
    const book = new Book(req.body);
    await book.save()
    res.redirect("/show");
  } catch (error) {
    res.send(error);
  }

});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/show', async function(req, res, next) {
  try {
    const books= await Book.find();
    res.render('show_books', { books: books });
  } catch (error) {
    res.send(error);
  }
});

router.get('/details/:id', async function(req, res, next) {
 try {
  const book = await Book.findById(req.params.id);
  res.render("details",{book:book});

 } catch (error) {
  res.send(error);
 }

});

router.get('/delete/:id', async function(req, res, next) {
  try {
    await Book.findByIdAndDelete(req.params.id);
      res.redirect("/show")
  } catch (error) {
     res.send(error);
  }
});

router.get('/update/:id',async function(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    res.render("update",{book:book});
  
   } catch (error) {
    res.send(error);
   }
});

router.post('/update/:id',async function(req, res, next) {
  try {
    await Book.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/details/${req.params.id}`)
  } catch (error) {
     res.send(error);
  }
});

router.get('/send-mail', function(req, res, next) {
  res.render('send-mail');
});

router.post('/send-mail', function(req, res, next) {
  sendmail(req.body.email);
});


function sendmail(email, res) {
  const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
          user: "omtadayma@gmail.com",
          pass: "bgocuwdnuhlkidmq",
      },
  });

  const mailOptions = {
      from: "Omta Pvt. Ltd.<omtadayma@gmail.com>",
      to: email,
      subject: "Password Reset Link",
      // text: "Do not share this link to anyone.",
      html: `This is test Mail`,
  };

  transport.sendMail(mailOptions, (err, info) => {
      if (err) return res.send(err);
      console.log(info);

      return res.send(
          "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
      );
  });
}

module.exports = router;
