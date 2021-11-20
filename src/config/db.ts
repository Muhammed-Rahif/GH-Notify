import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_CONNECT_URI as string)
        .then((con: any) => {
            console.log(`Mongodb connected with HOST ${con.connection.host}`);
            mongoose.connection.close(function () {
                console.log("Mongoose connection disconnected");
            });
        })
        .catch(console.error);
};

export { connectDatabase };
