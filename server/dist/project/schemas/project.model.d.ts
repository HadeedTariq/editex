/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProjectDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProjectDocument>> & mongoose.FlatRecord<ProjectDocument> & Required<{
    _id: unknown;
}>>;
export declare const Project: mongoose.Model<ProjectDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProjectDocument> & ProjectDocument & Required<{
    _id: unknown;
}>, any>;
