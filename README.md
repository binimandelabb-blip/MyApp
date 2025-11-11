# የወንጀል መከላከያ ሲስተም / Community Crime Prevention System

ማህበረስብ አቀፍ የወንጀል መካልከል የሞባይል መተግበሪያ ነዉ

A community-based crime prevention mobile application that enables citizens to submit tips to the police through multiple channels.

## Overview

This system allows community members to help prevent crime by providing tips to the police through various submission channels:

- **📱 Mobile App**: Direct submission through the mobile application
- **🌐 Web Form**: Browser-based form submission
- **💬 SMS**: Text message tips
- **📞 Phone**: Tips recorded through phone calls

## Features

### For Community Members
- ✅ Submit crime tips anonymously or with contact information
- ✅ Multiple submission channels (app, web, SMS, phone)
- ✅ Categorize tips by crime type and urgency
- ✅ Track submitted tips (if not anonymous)
- ✅ Attach photos or videos as evidence
- ✅ Multilingual support (Amharic/English)

### For Police Department
- 🔍 View and manage all submitted tips
- 📊 Dashboard with statistics and analytics
- 🎯 Filter tips by status, urgency, and crime type
- 👮 Assign tips to officers
- ✉️ Receive real-time notifications for critical tips
- 📈 Generate reports and trends

## Project Structure

```
MyApp/
├── backend/              # Node.js/Express API server
│   ├── controllers/      # Request handlers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Main server file
├── frontend/            # React Native mobile app
│   └── src/
│       ├── components/  # UI components
│       ├── services/    # API service layer
│       └── screens/     # App screens
├── docs/                # Documentation
│   ├── API.md          # API documentation
│   └── DATABASE_SCHEMA.md  # Database schema
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB or PostgreSQL (for production)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

### Tip Submission Endpoints

- `POST /api/tips/submit` - Submit tip via app/web
- `POST /api/tips/submit/sms` - Submit tip via SMS
- `POST /api/tips/submit/phone` - Submit tip via phone

### Tip Management Endpoints

- `GET /api/tips` - Get all tips (with filters)
- `GET /api/tips/:id` - Get specific tip
- `PATCH /api/tips/:id/status` - Update tip status
- `GET /api/tips/statistics` - Get statistics

See [API Documentation](docs/API.md) for detailed information.

## Submission Channels

### 1. Mobile App / Web Form

Users can submit tips through the mobile app or web interface with the following information:
- Title (optional)
- Detailed description
- Crime type
- Location
- Urgency level
- Anonymous option
- Contact information (if not anonymous)

### 2. SMS Integration

SMS gateway integration allows users to send tips via text message:
- Send a text message to the designated tip line
- System automatically processes and categorizes the tip
- Response confirmation sent to sender

### 3. Phone Hotline

Police operators can record tips received via phone calls:
- Call recording and transcription
- Operator enters tip details into the system
- Caller can choose to remain anonymous

## Crime Types Supported

- Theft/Burglary (ስርቆት)
- Robbery (ዘረፋ)
- Assault (ጥቃት)
- Drug-related (ከአደንዛዥ እጽ ጋር የተገናኘ)
- Vandalism (የንብረት ውድመት)
- Suspicious Activity (አጠራጣሪ እንቅስቃሴ)
- Fraud (ማጭበርበር)
- Domestic Violence (የቤተሰብ ውስጥ ብጥብጥ)
- Traffic Violation (የትራፊክ ጥሰት)
- General (አጠቃላይ)
- Other (ሌላ)

## Security & Privacy

- 🔒 End-to-end encryption for all submissions
- 🔐 Anonymous submissions fully protected
- 👤 Contact information only shared with authorized personnel
- 📝 Audit logging for all data access
- ✅ GDPR and data protection compliant

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Test API with curl

```bash
# Submit a test tip
curl -X POST http://localhost:3000/api/tips/submit \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test tip",
    "description": "This is a test tip submission",
    "crimeType": "general",
    "location": "Addis Ababa",
    "urgency": "medium",
    "isAnonymous": true,
    "submissionChannel": "app"
  }'

# Get all tips
curl http://localhost:3000/api/tips

# Get statistics
curl http://localhost:3000/api/tips/statistics
```

## Database Schema

The system supports both SQL (PostgreSQL) and NoSQL (MongoDB) databases. See [Database Schema Documentation](docs/DATABASE_SCHEMA.md) for detailed schema information.

## Deployment

### Production Considerations

1. **Environment Variables**: Set all required environment variables
2. **Database**: Configure production database connection
3. **Security**: Enable HTTPS, set proper CORS policies
4. **Monitoring**: Set up logging and monitoring
5. **Backups**: Configure automated database backups

### Deployment Options

- **Cloud Platforms**: AWS, Google Cloud, Azure
- **Container**: Docker/Kubernetes
- **Mobile**: React Native apps for iOS and Android

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License

MIT License - See LICENSE file for details

## Contact

For questions or support:
- Police Hotline: 911
- Email: tips@police.gov.et

## Acknowledgments

Built to support community safety and crime prevention initiatives.
