import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DBURL = process.env.DATABASEURL
const DBConnection = async () => {
    try {
        await mongoose.connect(DBURL)
        console.log(`Db connected Successfully`)
    } catch (error) {
        console.log(`issue wiht Db connection${error}`);
    }

}
export default DBConnection