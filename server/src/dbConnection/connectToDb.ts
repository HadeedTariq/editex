import { connect } from 'mongoose';

export async function connectToDb(uri: string) {
  try {
    await connect(uri);
    console.log('connected to db');
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}
