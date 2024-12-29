var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ContentModel, LinksModel, UserModel } from "./d.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./secrets.js";
import Userauth from "./middleware.js";
import random from "./random.js";
import cors from "cors";
const app = Express();
app.use(Express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
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
    if (!parseddatawithsuccess.success) {
      return res.status(400).json({
        message: "Invalid input!",
        errors: parseddatawithsuccess.error.errors
      });
    }
  
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 7);
  
    try {
      await UserModel.create({
        username,
        password: hashedPassword
      });
      res.status(200).json({
        message: "You are done signing up!"
      });
    } catch (e) {

      res.status(409).json({
        message: "Username Already Exists!",
      });
    }
  });
  
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
app.post("/api/v1/content", Userauth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield ContentModel.create({
        link: link,
        type: type,
        userId: req.userId,
        title: title,
        tags: []
    });
    return res.status(200).json({
        message: "Contents added!!"
    });
}));

//@ts-ignore
app.get("/api/v1/content", Userauth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contents = yield ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        contents
    });
}));
//@ts-ignore
app.delete("/api/v1/content", Userauth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield ContentModel.deleteOne({
        _id:contentId,
        userId: req.userId
    });
    res.status(200).json({
        message: "Deleted Sucessfully!!"
    });
}));


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


function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect();
        app.listen();
    });
}
main();
