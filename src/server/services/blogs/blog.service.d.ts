export interface ICreateNewBlog {
  creator: string;
  payload: {
    title: string;
    thumbnail: File | null | any;
    keywords: string;
    content: string;
    isPublished: boolean;
    isPremium: boolean;
  };
}

export interface IEditBlog {
  creator: string;
  blogId: string;
  payload: {
    title?: string;
    thumbnail?: File;
    keywords?: string;
    content?: string;
    isPublished: boolean;
    isPremium: boolean;
  };
}

export interface IDelBlog {
  creator: string;
  blogId: string;
}
