import mongoose from "mongoose";
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;
const UserSchema = new schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const ContentSchema = new schema({
    link: { type: String, required: true },
    type: { type: String,  },
    title: { type: String, },
    tags: [{ type: objectId, ref: "tags" }],
    userId: { type: objectId, ref: "User", required: true },
});
const TagsSchema = new schema({
    Title: { type: String, required: true, unique: true }
});
const LinksSchema = new schema({
    hash: { type: String, required: true },
    userId: { type: objectId, ref: "User", required: true }
});
const UserModel = mongoose.model("User", UserSchema);
const ContentModel = mongoose.model("content", ContentSchema);
const TagsModel = mongoose.model("tags", TagsSchema);
const LinksModel = mongoose.model("links", LinksSchema);
export { UserModel, ContentModel, TagsModel, LinksModel };
