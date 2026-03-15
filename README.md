# Video Streaming Backend

A secure, scalable backend for private video learning platforms. Built with Express.js, TypeScript, Firebase, and Backblaze B2.

## Features

- 🔐 **Firebase Authentication** - Email/password and Google sign-in
- 📚 **Course Management** - Courses → Modules → Lessons hierarchy
- 🎥 **Secure Video Streaming** - Signed URLs with expiration
- 📊 **Progress Tracking** - Resume where you left off
- ☁️ **Backblaze B2 Storage** - Cost-effective S3-compatible storage

## Architecture

```
User → Frontend (Next.js) → Backend (Express) → Backblaze B2 → Video Stream
                                ↓
                           Firebase Firestore
```

## Prerequisites

- Node.js 18+
- Firebase Project with Firestore enabled
- Backblaze B2 Account with a private bucket

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd video-stream-be
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (Build → Firestore → Create Database → Start in test mode)
4. Go to **Project Settings → Service Accounts**
5. Click **Generate new private key**
6. Copy the values for your `.env` file

### 3. Backblaze B2 Setup

1. Go to [Backblaze B2](https://www.backblaze.com/b2)
2. Create a **private bucket** for your videos
3. Go to **App Keys → Add a New Application Key**
4. Configure:
   - **Allow access to Bucket(s)**: Select your bucket
   - **Type of Access**: Read and Write
   - **Allow List All Bucket Names**: ✅ Check this
5. Copy `keyID` and `applicationKey`
6. Note your bucket's **Endpoint** (e.g., `s3.us-west-004.backblazeb2.com`)

### 4. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Server
PORT=3000
NODE_ENV=development

# Firebase (from service account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Backblaze B2
B2_KEY_ID=your-key-id
B2_APPLICATION_KEY=your-application-key
B2_BUCKET_NAME=your-bucket-name
B2_ENDPOINT=https://s3.your-region.backblazeb2.com

# Signed URL expiry (seconds)
SIGNED_URL_EXPIRY_SECONDS=3600
```

### 5. Run the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server runs at `http://localhost:3000`

## Adding Your Content

### 1. Upload Videos to B2

Organize your videos in B2 like:

```
your-bucket/
└── courses/
    └── your-course-name/
        ├── 01.Module-Name/
        │   ├── 01.lesson-one.mp4
        │   ├── 02.lesson-two.mp4
        │   └── ...
        ├── 02.Another-Module/
        │   └── ...
        └── ...
```

### 2. Create Seed Script

Edit `src/scripts/seed.ts` with your course structure:

```typescript
const courseData = {
  title: "Your Course Title",
  description: "Course description here",
  thumbnail: "", // Optional thumbnail URL
  modules: [
    {
      title: "01. Module Name",
      order: 1,
      folderName: "01.Module-Name", // Must match B2 folder name
      lessons: [
        {
          title: "Lesson One",
          fileName: "01.lesson-one.mp4", // Must match B2 file name
          order: 1,
          duration: 600, // Duration in seconds
        },
        // Add more lessons...
      ],
    },
    // Add more modules...
  ],
};

const B2_BASE_PATH = "courses/your-course-name"; // Must match B2 path
```

### 3. Seed the Database

```bash
npm run seed
```

## API Endpoints

### Public

| Method | Endpoint      | Description  |
| ------ | ------------- | ------------ |
| GET    | `/api/health` | Health check |

### Protected (requires Firebase Auth token)

| Method | Endpoint                             | Description                       |
| ------ | ------------------------------------ | --------------------------------- |
| GET    | `/api/courses`                       | List all courses                  |
| GET    | `/api/courses/:id`                   | Get course details                |
| GET    | `/api/courses/:id/content`           | Get course with modules & lessons |
| GET    | `/api/modules/course/:courseId`      | Get modules for a course          |
| GET    | `/api/lessons/module/:moduleId`      | Get lessons for a module          |
| GET    | `/api/video/lesson/:lessonId/stream` | Get signed streaming URL          |
| POST   | `/api/progress`                      | Update watch progress             |
| GET    | `/api/progress`                      | Get user's progress               |

### Authentication

All protected routes require a Firebase ID token:

```
Authorization: Bearer <firebase-id-token>
```

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment variables
│   ├── firebase.ts     # Firebase Admin SDK
│   └── backblaze.ts    # Backblaze B2 S3 client
├── controllers/        # Route handlers
├── middleware/
│   ├── auth.ts         # Firebase auth middleware
│   └── errorHandler.ts # Global error handler
├── routes/             # API routes
├── services/           # Business logic
├── scripts/
│   └── seed.ts         # Database seeder
├── types/              # TypeScript interfaces
└── index.ts            # App entry point
```

## Deployment (Render)

1. Push code to GitHub
2. Connect repo to [Render](https://render.com)
3. Set environment variables in Render dashboard
4. Deploy!

`render.yaml` is included for easy setup.

## Frontend

This backend is designed to work with the companion Next.js frontend. See [video-stream-fe](../video-stream-fe) for setup instructions.

## Troubleshooting

### CORS Errors

- Check `FRONTEND_URL` in `.env`
- Backend allows `localhost:3000`, `localhost:3001`, `localhost:3002` by default

### Firebase Errors

- Enable Firestore API in Google Cloud Console
- Check service account credentials
- Ensure private key newlines are escaped (`\n`)

### Backblaze B2 "Unauthorized" Errors

- Create a new Application Key (not Master Key)
- Ensure key has access to your specific bucket
- Check `Allow List All Bucket Names` is enabled
- Verify `B2_ENDPOINT` matches your bucket's region
