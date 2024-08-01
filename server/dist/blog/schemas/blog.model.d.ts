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
export declare const Blog: import("mongoose").Model<{
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
