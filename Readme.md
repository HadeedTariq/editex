# Editex A Code Editor

Editex is an online code editor designed for JavaScript. With Editex, you can create, edit, and share JavaScript projects effortlessly, all in a collaborative environment. The platform features project management, real-time collaboration, file handling, and more.

## Features

### Authentication Features

- **`POST /auth/register`**  
  Registers a new user to the platform.

- **`POST /auth/login`**  
  Logs in an existing user, returns a JWT token for session management.

- **`POST /auth/logout`**  
  Logs out the user and invalidates the session.

- **`GET /auth`**  
  Fetches the details of the currently logged-in user.

---

### Folder and File Management

- **`POST /folder/createFolder`**  
  Allows the creation of a new folder inside a project.

- **`POST /folder/createFile`**  
  Enables the creation of a new file inside a folder within a project.

- **`POST /folder/saveCode`**  
  Saves or updates code inside a specified file.

- **`GET /folder/:id`**  
  Fetches all the files and folders associated with a particular project.

- **`PATCH /folder/updateFolder/:id`**  
  Updates the folder's details, such as its name or content.

---

### Project Management

- **`POST /project/create`**  
  Creates a new project.

- **`POST /project/mergeRequest`**  
  Submits a request to merge code from contributors to the main project.

- **`GET /project`**  
  Retrieves the list of projects associated with the logged-in user.

- **`GET /project/projectNotifications`**  
  Fetches notifications related to a user's projects.

- **`GET /project/publicProjects`**  
  Retrieves all public projects available on the platform.

- **`GET /project/:id`**  
  Fetches a project by its ID.

- **`PUT /project/:id`**  
  Updates an existing project based on the project ID.

- **`DELETE /project/delete`**  
  Deletes a project by ID.

---

### Share Code and Collaboration

- **`GET /share-code/getAllUsers`**  
  Retrieves a list of all users registered on the platform.

- **`PUT /share-code/setContributors`**  
  Assigns contributors to a project, allowing them to collaborate on code.

- **`GET /share-code/getMyNotifications`**  
  Retrieves notifications related to the user’s shared projects.

- **`PUT /share-code/readNotification`**  
  Marks a specific notification as read.

---

## How It Works

Editex allows users to create, manage, and share JavaScript projects and code through a seamless platform. Users can register, log in, and authenticate using the JWT token system for secure access. Once logged in, users can create and organize folders and files for their projects, save code changes, and manage project details.

Collaboration is facilitated by allowing users to merge code, assign contributors, and stay informed through notifications. The platform supports both private and public projects, enabling users to manage visibility and access.

## Technology Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** NestJS
- **Database:** MongoDb
- **Hosting:** Vercel

## Getting Started

To run the project locally:

1. **Clone the repository:**

   ```bash
   https://github.com/HadeedTariq/editex
   ```

2. **Install dependencies for both client and server:**

   First, navigate into the `server` folder:

   ```bash
   cd server
   npm install
   ```

   Then, navigate into the `client` folder:

   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables:**

   Copy the `.env.dummy` file in both the `client` and `server` folders to `.env` in their respective directories and update the values as needed.

   For **server** (`server/.env`):

   ```bash
   CLIENT_URL=http://your-client-url.com
   DB_URI=your-database-uri #mongodb uri
   PORT=3000
   JWT_SECRET=your-jwt-secret
   ```

   For **client** (`client/.env`):

   ```bash
   VITE_CLOUD_PRESET_NAME="" # Cloudinary preset
   VITE_CLOUD_NAME="" # Cloudinary cloud name
   VITE_BACKEND_URL=http://localhost:3000

   ```

4. **Start the application:**

   To run the server in development mode, navigate to the `server` folder and execute:

   ```bash
   npm run start:dev
   ```

   To run the client in development mode, navigate to the `client` folder and execute:

   ```bash
   npm run dev
   ```

5. **Access the application:**

   Open your browser and visit [http://localhost:5173](http://localhost:5173) for the application.
