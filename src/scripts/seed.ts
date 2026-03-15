import admin from 'firebase-admin';
import { config } from '../config/env';

// Initialize Firebase
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

// Course data based on your B2 bucket structure
const courseData = {
  title: 'Namaste Frontend',
  description: 'Complete Frontend System Design course by Akshay Saini & Chirag. Learn Networking, Communication, Security, Testing, Performance, Database & Caching, Logging & Monitoring, and Accessibility.',
  thumbnail: '',
  modules: [
    {
      title: '01. Networking',
      order: 1,
      folderName: '01.Networking',
      lessons: [
        { title: 'Networking - Akshay & Chirag\'s Experience', fileName: '02.01. Networking - Akshay & Chirag\'s Experience(480P version).mov', order: 1, duration: 600 },
        { title: 'How the web works', fileName: '02.02. How the web works(480P version).mov', order: 2, duration: 900 },
        { title: 'Communication Protocols', fileName: '02.03. Communication Protocols(480P version).mov', order: 3, duration: 1200 },
        { title: 'REST APIs', fileName: '02.04. REST APIs(480P version).mov', order: 4, duration: 1500 },
        { title: 'GraphQL', fileName: '02.05. GraphQL(480P version).mov', order: 5, duration: 1200 },
        { title: 'gRPC - Part 1', fileName: '02.06. gRPC - part 1(480P version).mov', order: 6, duration: 900 },
        { title: 'gRPC - Part 2', fileName: '02.06. gRPC - part 2(480P version).mov', order: 7, duration: 900 },
      ],
    },
    {
      title: '02. Communication',
      order: 2,
      folderName: '02.Communication',
      lessons: [
        { title: 'Communication - Akshay & Chirag\'s Experience', fileName: '04.01. Communication - Akshay & Chirag\'s Experience(1080P version).mov', order: 1, duration: 600 },
        { title: 'Communication Overview', fileName: '04.02. Communication Overview(1080P version).mov', order: 2, duration: 900 },
        { title: 'Short Polling', fileName: '04.03. Short Polling(1080P version).mov', order: 3, duration: 1200 },
        { title: 'Long Polling', fileName: '04.04. Long Polling(1080P version).mov', order: 4, duration: 1200 },
        { title: 'Web Sockets', fileName: '04.05. Web Sockets(1080P version).mov', order: 5, duration: 1500 },
        { title: 'Server Side Events', fileName: '04.06. Server Side Events(1080P version).mov', order: 6, duration: 1200 },
        { title: 'WebHooks', fileName: '04.07. WebHooks(1080P version).mov', order: 7, duration: 900 },
      ],
    },
    {
      title: '03. Security',
      order: 3,
      folderName: '03.Security',
      lessons: [
        { title: 'Security - Akshay & Chirag\'s Experience', fileName: '01.02. Security - Akshay & Chirag\'s Experience(480P version).mov', order: 1, duration: 600 },
        { title: 'Security Overview', fileName: '01.03. Security Overview(480P version).mov', order: 2, duration: 900 },
        { title: 'Cross-site Scripting (XSS)', fileName: '01.04. Cross-site Scripting (XSS)(480P version).mov', order: 3, duration: 1500 },
        { title: 'iFrame Protection', fileName: '01.05. iFrame Protection(480P version).mov', order: 4, duration: 900 },
        { title: 'Security Headers', fileName: '01.06. Security Headers(480P version).mov', order: 5, duration: 1200 },
        { title: 'Client-side Security', fileName: '01.07. Client-side Security(480P version).mov', order: 6, duration: 1200 },
        { title: 'Secure Communication (HTTPS)', fileName: '01.08. Secure Communication (HTTPs)(480P version).mov', order: 7, duration: 900 },
        { title: 'Dependency Security', fileName: '01.09. Dependency Security(480P version).mov', order: 8, duration: 900 },
        { title: 'Compliance & Regulation', fileName: '01.10. Compliance & Regulation(480P version).mov', order: 9, duration: 900 },
        { title: 'Input Validation and Sanitization', fileName: '01.11. Input Validation and Sanitization(480P version).mov', order: 10, duration: 1200 },
        { title: 'Server-Side Request Forgery (SSRF)', fileName: '01.12. Sever-Side Request Forgery (SSRF)(480P version).mov', order: 11, duration: 900 },
        { title: 'Server-side JavaScript Injection', fileName: '01.13. Server-side JavaScript Injection(480P version).mov', order: 12, duration: 900 },
        { title: 'Feature Policy - Permissions-Policy', fileName: '01.14. Feature Policy - Permissions-Policy(480P version).mov', order: 13, duration: 900 },
        { title: 'Subresource Integrity (SRI)', fileName: '01.15. Subresource Integrity (SRI)(480P version).mov', order: 14, duration: 900 },
        { title: 'Cross-Origin Resource Sharing (CORS)', fileName: '01.16. Cross-Origin Resource Sharing (CORS)(480P version).mov', order: 15, duration: 1200 },
        { title: 'Cross-site Request Forgery (CSRF)', fileName: '01.17. Cross-site Request Forgery (CSRF)(480P version).mov', order: 16, duration: 1200 },
      ],
    },
    {
      title: '04. Testing',
      order: 4,
      folderName: '04.Testing',
      lessons: [
        { title: 'Testing - Akshay & Chirag\'s Experience', fileName: '03.01. Testing - Akshay & Chirag\'s Experience(1080P version).mov', order: 1, duration: 600 },
        { title: 'Testing Overview', fileName: '03.02. Testing Overview(1080P version).mov', order: 2, duration: 900 },
        { title: 'Unit & Integration Testing', fileName: '03.03. Unit & Integration Testing(1080P version).mov', order: 3, duration: 1500 },
        { title: 'E2E and Automation Testing', fileName: '03.04. E2E and Automation Testing(1080P version).mov', order: 4, duration: 1500 },
        { title: 'AB Testing', fileName: '03.05. AB Testing(1080P version).mov', order: 5, duration: 1200 },
        { title: 'Performance Testing', fileName: '03.06. Performance Testing(1080P version).mov', order: 6, duration: 1200 },
        { title: 'Test-Driven Development Overview', fileName: '03.07. Test-Driven Development Overview(1080P version).mov', order: 7, duration: 1200 },
        { title: 'Security Testing', fileName: '03.08. Security Testing(1080P version).mov', order: 8, duration: 1200 },
      ],
    },
  ],
};

// Base path in B2 bucket
const B2_BASE_PATH = 'courses/namaste-frontend';

async function seed() {
  console.log('🌱 Starting seed...\n');

  try {
    // Create course
    const now = new Date();
    const courseRef = await db.collection('courses').add({
      title: courseData.title,
      description: courseData.description,
      thumbnail: courseData.thumbnail,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`✅ Created course: ${courseData.title} (ID: ${courseRef.id})`);

    // Create modules and lessons
    for (const moduleData of courseData.modules) {
      const moduleRef = await db.collection('modules').add({
        courseId: courseRef.id,
        title: moduleData.title,
        order: moduleData.order,
        createdAt: now,
        updatedAt: now,
      });
      console.log(`  📁 Created module: ${moduleData.title} (ID: ${moduleRef.id})`);

      // Create lessons for this module
      for (const lessonData of moduleData.lessons) {
        const videoKey = `${B2_BASE_PATH}/${moduleData.folderName}/${lessonData.fileName}`;

        const lessonRef = await db.collection('lessons').add({
          moduleId: moduleRef.id,
          title: lessonData.title,
          videoKey: videoKey,
          duration: lessonData.duration,
          order: lessonData.order,
          createdAt: now,
          updatedAt: now,
        });
        console.log(`    📺 Created lesson: ${lessonData.title}`);
        console.log(`       VideoKey: ${videoKey}`);
      }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log(`\nCourse ID: ${courseRef.id}`);
    console.log('You can now access this course in your frontend.');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
