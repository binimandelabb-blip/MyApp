const Tip = require('../models/Tip');

describe('Tip Model', () => {
  test('should create a valid tip', () => {
    const tipData = {
      title: 'Test Tip',
      description: 'This is a test tip with sufficient description',
      crimeType: 'theft',
      location: 'Addis Ababa',
      urgency: 'medium',
      isAnonymous: true,
      submissionChannel: 'app'
    };

    const tip = new Tip(tipData);
    
    expect(tip.id).toBeDefined();
    expect(tip.title).toBe('Test Tip');
    expect(tip.description).toBe('This is a test tip with sufficient description');
    expect(tip.status).toBe('pending');
    expect(tip.isAnonymous).toBe(true);
  });

  test('should validate required fields', () => {
    const invalidTip = new Tip({
      description: 'Short',
      crimeType: '',
      location: '',
      urgency: 'invalid',
      submissionChannel: 'invalid'
    });

    const errors = invalidTip.validate();
    
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain('Description must be at least 10 characters');
    expect(errors).toContain('Crime type is required');
    expect(errors).toContain('Location is required');
  });

  test('should not store contact info for anonymous tips', () => {
    const tipData = {
      title: 'Anonymous Tip',
      description: 'This is an anonymous tip submission',
      crimeType: 'general',
      location: 'Somewhere',
      urgency: 'low',
      isAnonymous: true,
      submissionChannel: 'app',
      contactInfo: {
        name: 'Should not be stored',
        phone: '123456'
      }
    };

    const tip = new Tip(tipData);
    
    expect(tip.contactInfo).toBeNull();
  });

  test('should store contact info for non-anonymous tips', () => {
    const contactInfo = {
      name: 'John Doe',
      phone: '+251911234567'
    };

    const tipData = {
      title: 'Non-anonymous Tip',
      description: 'This is a non-anonymous tip',
      crimeType: 'general',
      location: 'Somewhere',
      urgency: 'low',
      isAnonymous: false,
      submissionChannel: 'app',
      contactInfo: contactInfo
    };

    const tip = new Tip(tipData);
    
    expect(tip.contactInfo).toEqual(contactInfo);
  });

  test('should convert to JSON properly', () => {
    const tipData = {
      title: 'Test Tip',
      description: 'Test description for JSON conversion',
      crimeType: 'general',
      location: 'Test Location',
      urgency: 'medium',
      isAnonymous: false,
      submissionChannel: 'web'
    };

    const tip = new Tip(tipData);
    const json = tip.toJSON();
    
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('status');
    expect(json).toHaveProperty('submittedAt');
    expect(json.status).toBe('pending');
  });
});
