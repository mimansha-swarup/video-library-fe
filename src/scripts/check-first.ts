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

async function check() {
  // Find the first module (Networking)
  const modules = await db.collection('modules').where('order', '==', 1).get();

  if (modules.empty) {
    console.log('No module with order 1 found');
    return;
  }

  const moduleDoc = modules.docs[0];
  console.log('Module ID:', moduleDoc.id);
  console.log('Module Title:', moduleDoc.data().title);

  // Find first lesson for this module
  const lessons = await db.collection('lessons')
    .where('moduleId', '==', moduleDoc.id)
    .where('order', '==', 1)
    .get();

  if (lessons.empty) {
    console.log('No lesson with order 1 found in this module');

    // List all lessons for this module
    const allLessons = await db.collection('lessons')
      .where('moduleId', '==', moduleDoc.id)
      .get();

    console.log('\nAll lessons in this module:');
    allLessons.docs.forEach(doc => {
      console.log(`  Order ${doc.data().order}: ${doc.data().title}`);
      console.log(`  VideoKey: ${doc.data().videoKey}`);
    });
    return;
  }

  const lesson = lessons.docs[0];
  console.log('\nFirst Lesson ID:', lesson.id);
  console.log('Lesson Title:', lesson.data().title);
  console.log('VideoKey:', lesson.data().videoKey);
}

check().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
