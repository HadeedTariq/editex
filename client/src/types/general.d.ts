interface ServerError {
  response: {
    data: {
      message: string;
      description?: string;
    };
  };
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface ProjectsType {
  createdAt: Date;
  _id: string;
  name: string;
  public: boolean;
  contributor: [];
  password?: string;
  creator: string;
}

type PublicProjectsTypeCreator = {
  _id: string;
  username: string;
  avatar?: string;
  passion?: string;
};

type PublicProjectsType = {
  _id: string;
  name: string;
  creator: PublicProjectsTypeCreator;
  createdAt: string;
  public: boolean;
};

type ProjectItemType = "file" | "folder";

interface ProjectItemTree {
  _id: string;
  name: string;
  type: ProjectItemType;
  parentId?: string | null;
  projectId: string;
  creatorId: string;
  code?: string | null;
  children: ProjectItemTree[];
}
