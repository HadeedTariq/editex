import { Schema } from 'mongoose';
export declare const ProjectItem: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
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
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "file" | "folder";
    name: string;
    projectId: import("mongoose").Types.ObjectId;
    parentId: import("mongoose").Types.ObjectId;
    creatorId: import("mongoose").Types.ObjectId;
    code?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
