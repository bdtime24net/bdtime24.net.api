export interface INews {
    id: string;
    title: string;
    subtitle: string;
    location?: string;
    category?: string;
    description: string;
    content?: string;
    authorId?: string;
    imageUrl?: string;
    link?: string;
    publishDate: Date;
    lastUpdated: Date;
    tags?: string[];
    views?: number;
    likes?: number;
    commentsCount?: number;
}
