const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [50, "Title can not be more than 50 characters"],
    },
    slug: String,
    content: {
      type: String,
      required: [true, "Please add the content of the post"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// create post slug from the name
PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = model("Post", PostSchema);
