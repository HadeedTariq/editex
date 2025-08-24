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

interface BlogsType {
  category: string;
  content: string;
  description: string;
  image: string;
  title: string;
  _id: string;
  creator: {
    username: string;
    passion: string;
    _id: string;
  };
}
