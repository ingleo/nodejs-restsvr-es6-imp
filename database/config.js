import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    });

    console.log('Database online!');
  } catch (error) {
    console.log(error);
    throw new Error('An error has ocurred starting the database');
  }
};

