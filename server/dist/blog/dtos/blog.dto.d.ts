declare enum BlogCategory {
    dsa = "dsa",
    general = "general",
    cp = "cp",
    dp = "dp"
}
export declare class CreateBlogDto {
    title: string;
    description: string;
    content: string;
    category: BlogCategory;
    image: string;
}
export {};
