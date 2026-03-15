import admin from 'firebase-admin';
import { config } from '../config/env';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail,
    }),
  });
}

const db = admin.firestore();

async function checkLessons() {
  const lessons = await db.collection('lessons').limit(5).get();

  console.log('First 5 lessons:\n');
  lessons.docs.forEach((doc) => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`Title: ${data.title}`);
    console.log(`VideoKey: ${data.videoKey}`);
    console.log('---');
  });
}

checkLessons().then(() => process.exit(0));
