import { Schema } from 'mongoose';
export declare const Blog: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    content: string;
    category: "dsa" | "general" | "cp" | "dp";
    image: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
