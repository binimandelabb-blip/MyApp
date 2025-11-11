import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Crime Watch heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /🚨 Crime Watch/i, level: 1 });
  expect(headingElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Crime Watch/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders action buttons', () => {
  render(<App />);
  const reportButton = screen.getByText(/Report a Crime/i);
  const mapButton = screen.getByText(/View Crime Map/i);
  const listButton = screen.getByText(/All Reports/i);
  
  expect(reportButton).toBeInTheDocument();
  expect(mapButton).toBeInTheDocument();
  expect(listButton).toBeInTheDocument();
});

test('renders statistics', () => {
  render(<App />);
  const totalReports = screen.getAllByText(/Total Reports/i);
  const underInvestigation = screen.getAllByText(/Under Investigation/i);
  const pendingReview = screen.getAllByText(/Pending Review/i);
  
  expect(totalReports.length).toBeGreaterThan(0);
  expect(underInvestigation.length).toBeGreaterThan(0);
  expect(pendingReview.length).toBeGreaterThan(0);
});
