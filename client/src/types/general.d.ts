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
  projectCode?: {
    _id: string;
    name: string;
    isFolder: boolean;
    code: string;
  };
  creator: string;
}

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
