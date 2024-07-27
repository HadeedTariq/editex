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
import { Schema } from 'mongoose';
export declare const Notification: import("mongoose").Model<{
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}> & {
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    message: string;
    isWatch: boolean;
    createdAt: Date;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
