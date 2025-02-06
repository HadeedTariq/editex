import { Schema } from 'mongoose';
export declare const Item: import("mongoose").Model<{
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    name: string;
    items: import("mongoose").Types.DocumentArray<{
        name?: string;
        code?: string;
        isFolder?: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }> & {
        name?: string;
        code?: string;
        isFolder?: boolean;
    }>;
    isFolder: boolean;
    projectId?: import("mongoose").Types.ObjectId;
    code?: string;
    creator?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
