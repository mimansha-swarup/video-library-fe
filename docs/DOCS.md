# Video Streaming Backend - Documentation

## Overview

A private video streaming learning platform backend built with:
- **Express.js** + **TypeScript**
- **Firebase Firestore** for database
- **Firebase Auth** for authentication
- **Backblaze B2** for video storage (S3-compatible)

## Architecture

```
User Device → Frontend (Next.js) → Backend (Express) → Backblaze B2 → Video Stream
```

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment configuration
│   ├── firebase.ts     # Firebase Admin SDK setup
│   └── backblaze.ts    # Backblaze B2 S3 client
├── controllers/
│   ├── courseController.ts
│   ├── moduleController.ts
│   ├── lessonController.ts
│   ├── videoController.ts
│   └── progressController.ts
├── middleware/
│   ├── auth.ts         # Firebase Auth middleware
│   └── errorHandler.ts # Global error handler
├── routes/
│   ├── courseRoutes.ts
│   ├── moduleRoutes.ts
│   ├── lessonRoutes.ts
│   ├── videoRoutes.ts
│   └── progressRoutes.ts
├── services/
│   ├── courseService.ts
│   ├── moduleService.ts
│   ├── lessonService.ts
│   ├── videoService.ts
│   └── progressService.ts
├── types/
│   └── index.ts        # TypeScript interfaces
└── index.ts            # App entry point
```

## Data Models

### Course
```typescript
{
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Module
```typescript
{
  id: string;
  courseId: string;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Lesson
```typescript
{
  id: string;
  moduleId: string;
  title: string;
  videoKey: string;  // Path in Backblaze B2
  duration: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### UserProgress
```typescript
{
  id: string;
  userId: string;
  lessonId: string;
  lastWatchedSecond: number;
  completed: boolean;
  updatedAt: Date;
}
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Courses (Protected)
- `POST /api/courses` - Create a course
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/:id/content` - Get course with all modules and lessons
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Modules (Protected)
- `POST /api/modules` - Create a module
- `GET /api/modules/course/:courseId` - Get modules by course
- `GET /api/modules/:id` - Get module by ID
- `PUT /api/modules/:id` - Update a module
- `DELETE /api/modules/:id` - Delete a module

### Lessons (Protected)
- `POST /api/lessons` - Create a lesson
- `GET /api/lessons/module/:moduleId` - Get lessons by module
- `GET /api/lessons/:id` - Get lesson by ID
- `PUT /api/lessons/:id` - Update a lesson
- `DELETE /api/lessons/:id` - Delete a lesson

### Video (Protected)
- `GET /api/video/stream?videoKey=...` - Get signed streaming URL
- `GET /api/video/lesson/:lessonId/stream` - Get streaming URL by lesson ID
- `POST /api/video/upload` - Upload a video (multipart/form-data)
- `DELETE /api/video/:videoKey` - Delete a video

### Progress (Protected)
- `POST /api/progress` - Update lesson progress
- `GET /api/progress` - Get all user progress
- `GET /api/progress/lesson/:lessonId` - Get progress for specific lesson

## Authentication

All protected routes require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Backblaze B2 Configuration
B2_KEY_ID=your-key-id
B2_APPLICATION_KEY=your-application-key
B2_BUCKET_NAME=your-bucket-name
B2_BUCKET_ID=your-bucket-id
B2_ENDPOINT=https://s3.us-west-000.backblazeb2.com

# Signed URL Configuration
SIGNED_URL_EXPIRY_SECONDS=3600
```

### 3. Firebase Setup

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key
3. Copy the values to your `.env` file

### 4. Backblaze B2 Setup

1. Create a Backblaze B2 account
2. Create a private bucket for videos
3. Create an application key with read/write access
4. Copy the credentials to your `.env` file

### 5. Run the Server

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## Video Upload Flow

1. Frontend sends video file to `POST /api/video/upload`
2. Backend uploads to Backblaze B2
3. Backend returns the `videoKey` (path in B2)
4. When creating a lesson, include the `videoKey`

## Video Streaming Flow

1. Frontend requests `GET /api/video/lesson/:lessonId/stream`
2. Backend generates a signed URL (expires in 1 hour by default)
3. Frontend uses the signed URL to stream directly from Backblaze B2

## Firestore Indexes

Create the following composite indexes in Firebase Console:

1. **modules** collection:
   - `courseId` (Ascending) + `order` (Ascending)

2. **lessons** collection:
   - `moduleId` (Ascending) + `order` (Ascending)

3. **userProgress** collection:
   - `userId` (Ascending) + `lessonId` (Ascending)

## Security Considerations

- All API routes (except health check) require authentication
- Video URLs are signed and expire after configurable time
- Videos are stored in a private Backblaze B2 bucket
- Firebase Auth tokens are verified on every request

## Future Enhancements

- [ ] Progress tracking with continue watching
- [ ] AI-powered video summaries
- [ ] Playlist support
- [ ] Adaptive streaming (HLS/DASH)
- [ ] Video transcoding pipeline
- [ ] Search functionality
- [ ] Admin dashboard
