import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Request logger - logs ALL requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('\n========== INCOMING REQUEST ==========');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Origin: ${req.headers.origin || 'No origin'}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('=======================================\n');

  // Log response when it's sent
  const originalSend = res.send;
  res.send = function (body) {
    console.log(`\n>>> Response for ${req.method} ${req.url}: Status ${res.statusCode}`);
    console.log('Response Headers:', JSON.stringify(res.getHeaders(), null, 2));
    return originalSend.call(this, body);
  };

  next();
});

// CORS - must be before routes
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log(`CORS check for origin: ${origin}`);
    // Allow all origins
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Morgan HTTP logger
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (no auth required)
app.get('/api/health', (_req, res) => {
  console.log('Health check endpoint hit');
  res.json({
    success: true,
    message: 'Video Streaming Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Try to load routes with error handling
const loadRoutes = async () => {
  try {
    const routes = await import('./routes');
    app.use('/api', routes.default);
    console.log('✅ Routes loaded successfully');
  } catch (err) {
    console.error('❌ Failed to load routes:', err);
    // Add a fallback route
    app.use('/api', (_req, res) => {
      res.status(500).json({
        success: false,
        error: 'Routes failed to load. Check Firebase credentials.',
      });
    });
  }
};

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  await loadRoutes();

  app.listen(config.port, () => {
    console.log('\n🚀 ================================');
    console.log(`   Server running on port ${config.port}`);
    console.log(`   Environment: ${config.nodeEnv}`);
    console.log(`   Health check: http://localhost:${config.port}/api/health`);
    console.log('================================\n');
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
