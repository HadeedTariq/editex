import { Schema } from 'mongoose';
export declare const ProjectNotification: import("mongoose").Model<{
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
}> & {
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    message: string;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    sender?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
