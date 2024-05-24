// import _mongoose, { connect } from "mongoose";

// declare global {
//   var mongoose: {
//     promise: ReturnType<typeof connect> | null;
//     conn: typeof _mongoose | null;
//   };
// }

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI || MONGODB_URI.length === 0) {
//   throw new Error("Please add your MongoDB URI to .env.local");
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections from growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     console.log("🚀 Using cached connection");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = connect(MONGODB_URI!, opts)
//       .then((mongoose) => {
//         console.log("✅ New connection established");
//         return mongoose;
//       })
//       .catch((error) => {
//         console.error("❌ Connection to database failed");
//         throw error;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectDB;

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};
async function connectMongo() {
    if (!MONGO_URI) {
        console.error('Please define the MONGO_URI environment variable inside .env.local');
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');
    }
    if (cached.connection) {
        console.log('=> using cached database instance');
        return cached.connection;
    }
    if (!cached.promise) {
        console.log('=> using new database instance');
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);
    }
    try {
        console.log('=> using promise to connect to database');
        cached.connection = await cached.promise;
    } catch (e) {
        console.error('=> an error occurred while connecting to database:', e);
        cached.promise = undefined;
        throw e;
    }
    console.log('=> connection to database successful');
    return cached.connection;
}
export default connectMongo;