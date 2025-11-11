# Database Schema for Crime Prevention Tip System

## Overview
This document defines the database schema for storing crime prevention tips submitted through various channels.

## Tables

### 1. Tips Table

Stores all submitted tips from the community.

```sql
CREATE TABLE tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT NOT NULL,
    crime_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
    is_anonymous BOOLEAN DEFAULT FALSE,
    submission_channel VARCHAR(20) NOT NULL CHECK (submission_channel IN ('app', 'sms', 'web', 'phone')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'investigating', 'resolved', 'closed')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    assigned_officer_id UUID,
    FOREIGN KEY (assigned_officer_id) REFERENCES officers(id)
);

CREATE INDEX idx_tips_status ON tips(status);
CREATE INDEX idx_tips_urgency ON tips(urgency);
CREATE INDEX idx_tips_submission_channel ON tips(submission_channel);
CREATE INDEX idx_tips_submitted_at ON tips(submitted_at);
CREATE INDEX idx_tips_crime_type ON tips(crime_type);
```

### 2. Tip Contacts Table

Stores contact information for non-anonymous tips.

```sql
CREATE TABLE tip_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tip_id UUID NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tip_id) REFERENCES tips(id) ON DELETE CASCADE
);

CREATE INDEX idx_tip_contacts_tip_id ON tip_contacts(tip_id);
```

### 3. Tip Attachments Table

Stores file attachments associated with tips (photos, videos, documents).

```sql
CREATE TABLE tip_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tip_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tip_id) REFERENCES tips(id) ON DELETE CASCADE
);

CREATE INDEX idx_tip_attachments_tip_id ON tip_attachments(tip_id);
```

### 4. Officers Table

Stores information about police officers who handle tips.

```sql
CREATE TABLE officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    rank VARCHAR(50),
    department VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_officers_is_active ON officers(is_active);
```

### 5. Tip Updates Table

Tracks all updates and actions taken on tips.

```sql
CREATE TABLE tip_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tip_id UUID NOT NULL,
    officer_id UUID,
    update_type VARCHAR(50) NOT NULL, -- 'status_change', 'assignment', 'comment', 'action'
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tip_id) REFERENCES tips(id) ON DELETE CASCADE,
    FOREIGN KEY (officer_id) REFERENCES officers(id)
);

CREATE INDEX idx_tip_updates_tip_id ON tip_updates(tip_id);
CREATE INDEX idx_tip_updates_created_at ON tip_updates(created_at);
```

### 6. Crime Types Table

Reference table for crime type classifications.

```sql
CREATE TABLE crime_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_am VARCHAR(100), -- Amharic name
    description TEXT,
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO crime_types (code, name_en, name_am, category) VALUES
    ('theft', 'Theft/Burglary', 'ስርቆት', 'property'),
    ('robbery', 'Robbery', 'ዘረፋ', 'violent'),
    ('assault', 'Assault', 'ጥቃት', 'violent'),
    ('drugs', 'Drug-related', 'ከአደንዛዥ እጽ ጋር የተገናኘ', 'drugs'),
    ('vandalism', 'Vandalism', 'የንብረት ውድመት', 'property'),
    ('suspicious_activity', 'Suspicious Activity', 'አጠራጣሪ እንቅስቃሴ', 'prevention'),
    ('fraud', 'Fraud', 'ማጭበርበር', 'financial'),
    ('domestic_violence', 'Domestic Violence', 'የቤተሰብ ውስጥ ብጥብጥ', 'violent'),
    ('traffic', 'Traffic Violation', 'የትራፊክ ጥሰት', 'traffic'),
    ('general', 'General', 'አጠቃላይ', 'general'),
    ('other', 'Other', 'ሌላ', 'other');
```

### 7. Statistics Table

Aggregate statistics for reporting and analysis.

```sql
CREATE TABLE statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    total_tips INTEGER DEFAULT 0,
    tips_by_channel JSONB, -- {"app": 10, "sms": 5, "web": 3, "phone": 2}
    tips_by_urgency JSONB,
    tips_by_status JSONB,
    tips_by_crime_type JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

CREATE INDEX idx_statistics_date ON statistics(date);
```

## MongoDB Alternative Schema

For MongoDB implementation, here's the document structure:

```javascript
// Tips Collection
{
  "_id": ObjectId(),
  "title": "Suspicious activity near school",
  "description": "Detailed description...",
  "crimeType": "suspicious_activity",
  "location": {
    "address": "123 Main Street, Addis Ababa",
    "coordinates": {
      "latitude": 9.0320,
      "longitude": 38.7469
    }
  },
  "urgency": "high",
  "isAnonymous": false,
  "submissionChannel": "app",
  "status": "pending",
  "contactInfo": {
    "name": "John Doe",
    "phone": "+251911234567",
    "email": "john@example.com"
  },
  "attachments": [
    {
      "fileName": "photo1.jpg",
      "fileType": "image/jpeg",
      "fileSize": 1024000,
      "fileUrl": "https://storage.example.com/tips/photo1.jpg",
      "uploadedAt": ISODate("2025-11-11T08:43:00Z")
    }
  ],
  "assignedOfficer": {
    "id": ObjectId(),
    "name": "Officer Smith",
    "badgeNumber": "12345"
  },
  "updates": [
    {
      "updateType": "status_change",
      "previousStatus": "pending",
      "newStatus": "reviewing",
      "comment": "Case under review",
      "officer": {
        "id": ObjectId(),
        "name": "Officer Smith"
      },
      "createdAt": ISODate("2025-11-11T09:00:00Z")
    }
  ],
  "submittedAt": ISODate("2025-11-11T08:43:00Z"),
  "updatedAt": ISODate("2025-11-11T09:00:00Z"),
  "resolvedAt": null
}
```

## Indexes

Recommended indexes for optimal query performance:

```javascript
// MongoDB Indexes
db.tips.createIndex({ "status": 1 })
db.tips.createIndex({ "urgency": 1 })
db.tips.createIndex({ "submissionChannel": 1 })
db.tips.createIndex({ "submittedAt": -1 })
db.tips.createIndex({ "crimeType": 1 })
db.tips.createIndex({ "location.coordinates": "2dsphere" }) // For geo queries
```

## Data Retention Policy

- **Active Tips**: Retained indefinitely while status is not 'closed'
- **Closed Tips**: Retained for 7 years for legal and statistical purposes
- **Anonymous Tips**: Contact information never stored
- **Personal Data**: Automatically anonymized after case closure (configurable)

## Security Considerations

1. **Encryption**: All personal data encrypted at rest
2. **Access Control**: Role-based access control for police officers
3. **Audit Logging**: All data access and modifications logged
4. **Data Minimization**: Only collect necessary information
5. **Anonymization**: Support for fully anonymous submissions

## Backup Strategy

- **Daily backups**: Full database backup every 24 hours
- **Incremental backups**: Every 6 hours
- **Retention**: 30 days of backups maintained
- **Offsite storage**: Backups replicated to secondary location
