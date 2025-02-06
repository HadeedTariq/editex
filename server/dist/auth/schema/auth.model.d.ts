import mongoose, { Document } from 'mongoose';
export interface UserDocument extends Document {
    username: string;
    email: string;
    avatar?: string;
    password: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    passion: string;
}
export declare const userSchema: mongoose.Schema<UserDocument, mongoose.Model<UserDocument, any, any, any, mongoose.Document<unknown, any, UserDocument> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserDocument>> & mongoose.FlatRecord<UserDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
