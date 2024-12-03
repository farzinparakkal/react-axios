import userSchema from "./model/user.model.js"
import nodemailer from 'nodemailer'

import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } = pkg

const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // secure: false, // true for port 465, false for other ports
    auth: {
      user: "farzinparakkal135@gmail.com",
      pass: "bpmi whpr zwkz wfdq",
    },
  })

export async function addUser(req, res) {
    // console.log(req.body);
    const { username, email, pwd, cpwd } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
        if (!(username && email && pwd && cpwd))
            return res.status(500).send({ msg: "fields are empty" })
        if (pwd != cpwd)
            return res.status(500).send({ msg: "pass not match" })
        bcrypt.hash(pwd, 10).then((hpwd) => {
            userSchema.create({ username, email, pass: hpwd })
            res.status(201).send({ msg: "Successfull" })
        }).catch((error) => {
            console.log(error)
        })
    }else{
        res.status(500).send({msg:"email already used "})
    }
}

export async function login(req, res) {
    // console.log(req.body);
    const { email, pass } = req.body
    if (!(email && pass))
        return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user)
        return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    // console.log(success);
    if (success !== true)
        return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.JWT_KEY, { expiresIn: "24h" })
    // console.log(token)
    res.status(201).send({ token })
}



export async function verifyEmail(req,res) {
    const {email}=req.body
    // console.log(email);
    if (!(email))  {
        return res.status(500).send({msg:"fields are empty"})
    }
    const user= await userSchema.findOne({email})        
    if (!(user)) {
        const info = await transporter.sendMail({
            from: 'farzinparakkal135@gmail.com', // sender address
            to: email, // list of receivers
            subject: "verify", // Subject line
            text: "VERIFY! your email", // plain text body
            html: `
    <div class=" page" style="width: 500px; height: 300px; display: flex; 
    align-items: center; justify-content: center; flex-direction: column;
     background-color: gainsboro;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; ">
        <h2>Email verification</h2>
        <p>Click This Button to verify its you</p>
        <a href="http://localhost:5173/register"><button style="padding: 5px 15px; border: none; border-radius: 4px; 
        background-color: white;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 18px; color: red; font-style: italic;" >Verify</button></a>
    </div>`, // html body
        })
        console.log("Message sent: %s", info.messageId)
        res.status(200).send({msg:"Verificaton email sented"})
    }else{
        return res.status(500).send({msg:"email exist"})
    }
}

export async function getUser(req, res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    // console.log(usr);
    // const data=await postSchema.find()
    // console.log(data);
    res.status(200).send(usr); 
}