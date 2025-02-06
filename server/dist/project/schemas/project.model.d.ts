import mongoose, { Document, Types } from 'mongoose';
export interface ProjectDocument extends Document {
    name: string;
    creator: Types.ObjectId;
    reader: Types.ObjectId[];
    contributor: Types.ObjectId[];
    public: boolean;
    password?: string;
}
export declare const projectSchema: mongoose.Schema<ProjectDocument, mongoose.Model<ProjectDocument, any, any, any, mongoose.Document<unknown, any, ProjectDocument> & ProjectDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProjectDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProjectDocument>> & mongoose.FlatRecord<ProjectDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const Project: mongoose.Model<ProjectDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProjectDocument> & ProjectDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
