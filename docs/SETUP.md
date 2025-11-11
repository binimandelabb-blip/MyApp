# Setup Guide

## Quick Start

### Prerequisites

Before setting up the Crime Prevention System, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **Git**
- A code editor (VS Code recommended)

Optional for production:
- **MongoDB** or **PostgreSQL**
- **SMS Gateway API credentials** (e.g., Twilio, Nexmo)
- **Email service** (e.g., SendGrid, AWS SES)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/binimandelabb-blip/MyApp.git
cd MyApp
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

#### Environment Configuration

Edit the `.env` file with your settings:

```env
PORT=3000
NODE_ENV=development

# Database configuration (optional for development)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crime_prevention
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# SMS Gateway configuration (optional)
SMS_API_KEY=your_sms_api_key
SMS_API_SECRET=your_sms_api_secret
SMS_SENDER_ID=CrimeTips

# Police contact information
POLICE_HOTLINE=911
POLICE_EMAIL=tips@police.gov.et

# Security
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key

# CORS allowed origins
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:8081
```

#### Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Verification

### Test the Backend API

```bash
# Health check
curl http://localhost:3000/health

# Expected response: {"status":"OK","message":"Crime Prevention API is running"}
```

### Test Tip Submission

```bash
curl -X POST http://localhost:3000/api/tips/submit \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Test tip submission",
    "crimeType": "general",
    "location": "Test Location",
    "urgency": "medium",
    "isAnonymous": true,
    "submissionChannel": "app"
  }'
```

## Database Setup (Production)

### PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE crime_prevention;
CREATE USER crime_app WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE crime_prevention TO crime_app;
\q

# Run database migrations (create schema)
cd backend
psql -U crime_app -d crime_prevention -f docs/schema.sql
```

### MongoDB Setup

```bash
# Install MongoDB
# Follow instructions at https://www.mongodb.com/docs/manual/installation/

# Start MongoDB
sudo systemctl start mongod

# Create database and user
mongosh
use crime_prevention
db.createUser({
  user: "crime_app",
  pwd: "your_password",
  roles: [{ role: "readWrite", db: "crime_prevention" }]
})
```

## SMS Gateway Integration

### Twilio Setup

1. Sign up at https://www.twilio.com
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Configure webhook URL in Twilio dashboard:
   - Point to: `https://your-domain.com/api/tips/submit/sms`
   - Method: POST

5. Add to `.env`:
```env
SMS_GATEWAY=twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

## Deployment

### Docker Deployment

```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Cloud Deployment (AWS)

1. **Setup EC2 Instance**
   - Launch Ubuntu 20.04 LTS instance
   - Configure security group (ports 80, 443, 3000)
   - Install Node.js and dependencies

2. **Deploy Backend**
```bash
# Install PM2 for process management
npm install -g pm2

# Start application
cd backend
pm2 start server.js --name crime-api

# Setup startup script
pm2 startup
pm2 save
```

3. **Setup Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] Submit anonymous tip
- [ ] Submit tip with contact info
- [ ] Submit tip via different channels
- [ ] Retrieve all tips
- [ ] Filter tips by status/urgency
- [ ] Update tip status
- [ ] View statistics

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check if database is running
sudo systemctl status postgresql
# or
sudo systemctl status mongod

# Check connection
psql -U crime_app -d crime_prevention
# or
mongosh --username crime_app --password
```

### Module Not Found Errors

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Next Steps

1. Configure SMS gateway for production
2. Set up email notifications
3. Configure database backups
4. Set up monitoring and logging
5. Configure HTTPS/SSL certificates
6. Set up CI/CD pipeline

## Support

For issues or questions:
- Check the [API Documentation](API.md)
- Review [Database Schema](DATABASE_SCHEMA.md)
- Contact: tips@police.gov.et
