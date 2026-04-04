# Frontend Feature Roadmap

## Current State (Done)
- [x] Firebase Google Sign-In with login wall
- [x] Course library grid with skeleton loaders
- [x] Course detail page with module list
- [x] Video player with HTML5 streaming via signed URLs
- [x] Auto-save progress every 15s + on pause/end
- [x] Prev / next lesson navigation with progress dots
- [x] Collapsible module sidebar with active lesson highlight
- [x] TanStack Query caching (course data shared across lesson pages)
- [x] Auth token attached to every API request
- [x] Netlify deployment config

---

## High Value / Quick Wins

### Continue Watching
- Show a "Resume" button on course cards when `lastWatchedSecond > 0`
- Progress bar on course card showing % through the course
- Auto-seek to `lastWatchedSecond` on lesson load (already wired in VideoPlayer, needs UI)
- Requires: `GET /api/progress` to fetch existing progress on page load

### Lesson Completion Checkmarks
- Mark lessons as done in the sidebar when `completed: true`
- Checkmark icon replaces the lesson number once completed
- Requires: `GET /api/progress` + store in TanStack Query cache

### Course Progress %
- Calculate `completedLessons / totalLessons` per course
- Show as a thin progress bar at the bottom of each CourseCard
- Derived entirely from progress data already being tracked

---

## Medium Effort

### Search / Filter
- Client-side filter input on the library page
- Filter courses by title as you type
- No backend changes needed

### Video Keyboard Shortcuts
- `Space` — play / pause
- `←` / `→` — seek ±10s
- `F` — fullscreen
- `M` — mute
- Implement in VideoPlayer.tsx with `keydown` event listener

### Mobile Sidebar Drawer
- Lesson sidebar is desktop-only currently
- Add a slide-in drawer triggered by a bottom bar button on mobile
- Use CSS `translate` + backdrop overlay, no library needed

---

## Bigger Features (Backend Already Supports)

### Upload Flow
- Page to upload a video file → `POST /api/video/upload`
- Backend handles Backblaze B2 upload and returns `videoKey`
- Then create lesson with that `videoKey` via `POST /api/lessons`
- Show upload progress with `XMLHttpRequest` progress events

### Course / Module / Lesson Management (Admin UI)
- Create / edit / delete courses → `POST /PUT /DELETE /api/courses`
- Add modules to a course → `POST /api/modules`
- Add lessons to a module → `POST /api/lessons`
- Simple table or list UI, gated behind an admin role check

---

## Future (Backend Work Required)

### AI Summaries
- Per-lesson transcript + key points summary
- Mentioned in backend context doc as a planned feature
- Would need a transcription pipeline (e.g. Whisper) + storage

### Playlists
- Bookmark lessons across different courses into a custom playlist
- Requires new backend data model

### Adaptive Streaming
- HLS / DASH support for bandwidth-aware playback
- Replace `<video src={signedUrl}>` with hls.js or dash.js
- Requires video transcoding pipeline on the backend

---

---

## Access Control / Whitelist (Not Yet Implemented)

### Decision: Firebase Custom Claims
Use Firebase custom claims `{ approved: true }` as the single source of truth for whitelisting users. Chosen over alternatives because:
- Embedded in the JWT — no extra Firestore read on every API request
- Enforced at the backend layer automatically
- Easy to revoke instantly

### What needs to be built across all three layers:

#### Backend (`video-library-be`) — Enforcement
- In `src/middleware/auth.ts`, after verifying the Firebase token add:
  ```ts
  if (!decodedToken.approved) {
    return res.status(403).json({ success: false, error: "Access not granted" });
  }
  ```
- Add an admin script `src/scripts/approve-user.ts`:
  ```ts
  // Usage: ts-node src/scripts/approve-user.ts user@email.com
  await admin.auth().setCustomUserClaims(uid, { approved: true });
  ```
- Add a revoke script `src/scripts/revoke-user.ts` for removing access

#### Frontend (`video-library-fe`) — UX
- After Google Sign-In in `src/app/login/page.tsx`, force-refresh the token:
  ```ts
  const tokenResult = await user.getIdTokenResult(true); // true = force refresh
  if (!tokenResult.claims.approved) {
    // don't redirect to "/" — show pending screen instead
  }
  ```
- Create `src/app/pending/page.tsx` — "Access Pending" screen shown to signed-in but unapproved users with a sign-out button
- Update `AuthGuard` to check the claim and redirect to `/pending` if not approved

#### Firebase — No code changes needed
- Custom claims are set via Firebase Admin SDK (backend scripts above)
- To manually approve via Firebase Console: not possible — must use Admin SDK script or a future admin UI

### Flow once implemented
```
User signs in with Google
  → Token has approved: true  → redirect to /
  → Token missing approved    → redirect to /pending (Access Pending screen)

API request hits backend
  → Token has approved: true  → continue
  → Token missing approved    → 403 Access not granted
```

### Admin UI (Future)
No admin UI exists yet in either repo. Until then, access is granted by running the backend script manually:
```bash
cd video-library-be
ts-node src/scripts/approve-user.ts user@email.com
```
When an admin UI is built, it should call a protected `POST /api/admin/approve` endpoint that wraps the same Firebase Admin `setCustomUserClaims` call.

---

## Notes
- Progress API: `PATCH /api/progress/:lessonId` — already called on pause/end/15s interval
- All protected routes need `Authorization: Bearer <firebase-id-token>` — handled in `src/lib/api.ts`
- Backend hosted at `https://video-library-be.onrender.com`
- Frontend deployed on Netlify, config in `netlify.toml`
