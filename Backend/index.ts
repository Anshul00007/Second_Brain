import  Express  from "express";
import {z} from "zod"
import bcrypt from "bcrypt"
import { ContentModel, LinksModel, UserModel } from "./d.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./secrets.js";
import Userauth from "./middleware.js";
import random from "./random.js";
import cors from "cors"

const app = Express();

app.use(Express.json())
app.use(cors())


app.post("/api/v1/signup",async (req,res)=>{

  const Validation = z.object({
    username: z.string().max(10).min(3),
    password: z.string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character")
  });
  

const parseddatawithsuccess = Validation.safeParse(req.body);

if (!parseddatawithsuccess.success){
     res.status(411).json({
    message:"Error in inputs!!"
    })
    return
}


const {username,password}= req.body

const hasedPassword = await bcrypt.hash(password, 7)
try{
await UserModel.create({
  username, password: hasedPassword
})


res.status(200).json({
  message: "Your are done signing up!!"
})
}catch(e){
  res.status(403).json({
    message: "Username Already Exists!!"
  })
}

})

//@ts-ignore
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
      return res.status(403).json({
          message: "Username not found",
      });
  }

  const recheck = await bcrypt.compare(password, user.password);
  if (!recheck) {
      return res.status(403).json({
          message: "Incorrect password",
      });
  }

  const token = jwt.sign({ id: user._id }, JWT_PASSWORD);
  res.json({ token: token });
});


//@ts-ignore
app.post("/api/v1/content",  Userauth ,async (req,res)=>{
const {link,type,title} = req.body
await ContentModel.create({
  
  link:link,
  type:type,
  userId: req.userId,
  title:title,
  tags:[]
})
return res.status(200).json({
  message:"Contents added!!"
})
})
//@ts-ignore

app.get("/api/v1/content", Userauth , async (req,res)=>{
const userId=req.userId 
const contents =await ContentModel.findOne({
  userId:userId
}).populate("userId","username")
res.json({
  contents
})
})

//@ts-ignore

app.delete("/api/v1/content", Userauth,async (req,res)=>{
const contentId = req.body.contentId;

 await ContentModel.deleteOne({
   id:contentId,
    userId:req.userId
 })
 res.status(200).json({
  message:"Deleted Sucessfully!!"
 })

})


//@ts-ignore
app.put("/api/v1/content", Userauth, async (req, res) => {
  const { contentId, link } = req.body;

  
  if (!contentId || !link) {
    return res.status(400).json({
      message: "ContentId and link are required",
    });
  }

  try {
    const updatedContent = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId: req.userId },
      { $set: { link: link } },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({
        message: "Content not found or you do not have permission to update it.",
      });
    }

    return res.status(200).json({
      message: "Content updated successfully!",
      content: updatedContent,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "An error occurred while updating the content",
    });
  }
});





//@ts-ignore

app.post("/api/v1/brain/shareapp", Userauth, async (req, res) => {
  const share = req.body.share;
  if (share) {
      const existingLink = await LinksModel.findOne({
          userId: req.userId
      });
      if (existingLink) {
          res.json({
              hash: existingLink.hash
          });
          return;
      }
      const hash = random(20);  
      const expiration = Date.now() + 24 * 60 * 60 * 1000; 
      await LinksModel.create({
          userId: req.userId,
          hash: hash,
          expiration: expiration
      });
      res.json({
          hash
      });
  } else {
      await LinksModel.deleteOne({
          userId: req.userId
      });
      res.json({
          message: "Removed link"
      });
  }
});


//@ts-ignore

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  
  
  const link = await LinksModel.findOne({ hash });
  if (!link) {
      return res.status(404).json({
          message: "This link is invalid or has been removed."
      });
  }

  
  if (Date.now() > link.expiration) {
      return res.status(410).json({
          message: "This link has expired."
      });
  }

  
  const content = await ContentModel.find({ userId: link.userId });

  if (!content || content.length === 0) {
      return res.status(404).json({
          message: "No content found for this link."
      });
  }

  
  const user = await UserModel.findOne({ _id: link.userId });
  if (!user) {
      return res.status(411).json({
          message: "User not found."
      });
  }

  res.json({
      username: user.username,  
      content: content
  });
});







async function main(){
await mongoose.connect()
app.listen()
}
main()