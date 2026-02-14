import mongoose from "mongoose";

const connectDB = () => {

    mongoose.connect(process.env.MONGO_URI as string)

        .then(() => {
            console.log("Connected to MongoDB");
        })

        .catch((err: Error) => {
            console.error("Connection error:", err);
        });

};

export default connectDB;
