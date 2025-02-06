import { Schema } from 'mongoose';
export declare const MergingRequest: import("mongoose").Model<{
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
}> & {
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    code: string;
    isChanged: boolean;
    fileId?: import("mongoose").Types.ObjectId;
    projectId?: import("mongoose").Types.ObjectId;
    user?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
