# Community Crime Prevention System - API Documentation

## Overview
This API provides endpoints for community members to submit crime prevention tips to the police through multiple channels.

## Base URL
```
http://localhost:3000/api
```

## Submission Channels

The system supports multiple tip submission channels:
- **Mobile App**: Direct submission through the mobile application
- **Web Form**: Web-based form submission
- **SMS**: Text message tips
- **Phone**: Tips recorded through phone calls

## API Endpoints

### 1. Submit Tip (App/Web)

Submit a tip through the mobile app or web interface.

**Endpoint:** `POST /tips/submit`

**Request Body:**
```json
{
  "title": "Suspicious activity near school",
  "description": "Detailed description of the crime or suspicious activity",
  "crimeType": "theft|robbery|assault|drugs|vandalism|suspicious_activity|other",
  "location": "Specific location or address",
  "urgency": "low|medium|high|critical",
  "isAnonymous": true,
  "submissionChannel": "app|web",
  "contactInfo": {
    "name": "John Doe",
    "phone": "+251911234567",
    "email": "john@example.com"
  },
  "attachments": []
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tip submitted successfully",
  "data": {
    "id": "uuid-here",
    "title": "Suspicious activity near school",
    "status": "pending",
    "submittedAt": "2025-11-11T08:43:00.000Z"
  }
}
```

### 2. Submit SMS Tip

Endpoint for SMS gateway integration to receive tips via text message.

**Endpoint:** `POST /tips/submit/sms`

**Request Body:**
```json
{
  "from": "+251911234567",
  "message": "Tip description from SMS",
  "location": "Optional location"
}
```

### 3. Submit Phone Tip

Record tips received through phone calls.

**Endpoint:** `POST /tips/submit/phone`

**Request Body:**
```json
{
  "description": "Tip description from phone call",
  "crimeType": "general",
  "location": "Location mentioned",
  "urgency": "medium",
  "isAnonymous": false,
  "phone": "+251911234567"
}
```

### 4. Get All Tips

Retrieve all submitted tips (for police/admin dashboard).

**Endpoint:** `GET /tips`

**Query Parameters:**
- `status`: Filter by status (pending, reviewing, investigating, resolved, closed)
- `urgency`: Filter by urgency level
- `crimeType`: Filter by crime type

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "uuid",
      "title": "Tip title",
      "description": "Description",
      "status": "pending",
      "urgency": "high",
      "submittedAt": "2025-11-11T08:43:00.000Z"
    }
  ]
}
```

### 5. Get Tip by ID

**Endpoint:** `GET /tips/:id`

### 6. Update Tip Status

Update the status of a tip (for police/admin).

**Endpoint:** `PATCH /tips/:id/status`

**Request Body:**
```json
{
  "status": "pending|reviewing|investigating|resolved|closed"
}
```

### 7. Get Statistics

Get overall statistics about tips.

**Endpoint:** `GET /tips/statistics`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "pending": 20,
    "resolved": 70,
    "byChannel": {
      "app": 50,
      "sms": 20,
      "web": 20,
      "phone": 10
    },
    "byUrgency": {
      "low": 30,
      "medium": 40,
      "high": 25,
      "critical": 5
    }
  }
}
```

## Crime Types

The following crime types are supported:
- `theft` - Theft or burglary
- `robbery` - Robbery
- `assault` - Physical assault
- `drugs` - Drug-related crimes
- `vandalism` - Property damage
- `suspicious_activity` - Suspicious behavior
- `fraud` - Fraud or scams
- `domestic_violence` - Domestic violence
- `traffic` - Traffic violations
- `general` - General crime tip
- `other` - Other crimes

## Urgency Levels

- `low` - Non-urgent tip
- `medium` - Standard urgency
- `high` - High priority
- `critical` - Immediate attention required

## Security & Privacy

- Anonymous tips are fully protected - no contact information is stored
- All tip submissions are encrypted in transit
- Contact information is only shared with authorized police personnel
- Tips are stored securely with access controls

## Integration Examples

### Mobile App Example (JavaScript/React Native)

```javascript
const submitTip = async (tipData) => {
  try {
    const response = await fetch('http://localhost:3000/api/tips/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting tip:', error);
  }
};
```

### SMS Gateway Integration

Configure your SMS gateway to forward received messages to `/tips/submit/sms` endpoint.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`

3. Start the server:
```bash
npm start
```

## Testing

Test the API using curl:

```bash
# Submit a tip
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
