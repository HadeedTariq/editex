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
  reader: [];
  contributor: [];
  password?: string;
}
