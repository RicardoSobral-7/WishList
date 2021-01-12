import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/challenge14", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

export default mongoose;