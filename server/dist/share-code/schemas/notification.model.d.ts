import { Schema } from 'mongoose';
export declare const Notification: import("mongoose").Model<{
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}> & {
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    message: string;
    isWatch: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
    reciever?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
