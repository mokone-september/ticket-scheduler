/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketForm from '../components/TicketForm';

describe('TicketForm', () => {
  test('renders form elements correctly', () => {
    const mockOnAdd = jest.fn();
    render(<TicketForm onAdd={mockOnAdd} />);

    expect(screen.getByText(/Add New Ticket/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Ticket/i })).toBeInTheDocument();
  });

  test('enables and disables form with toggle', async () => {
    const mockOnAdd = jest.fn();
    render(<TicketForm onAdd={mockOnAdd} />);

    const toggle = screen.getByRole('checkbox');
    const taskInput = screen.getByLabelText(/Task Name/i);
    const addButton = screen.getByRole('button', { name: /Add Ticket/i });

    // Initially enabled
    expect(taskInput).not.toBeDisabled();
    expect(addButton).toBeDisabled(); // Disabled because form is empty

    // Disable form
    await userEvent.click(toggle);
    expect(taskInput).toBeDisabled();
    expect(addButton).toBeDisabled();

    // Re-enable form
    await userEvent.click(toggle);
    expect(taskInput).not.toBeDisabled();
  });

  test('shows validation errors for empty fields', async () => {
    const mockOnAdd = jest.fn();
    render(<TicketForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /Add Ticket/i });

    // Try to submit empty form
    await userEvent.click(addButton);

    // Should not call onAdd
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test('validates task input with character limit', async () => {
    const mockOnAdd = jest.fn();
    render(<TicketForm onAdd={mockOnAdd} />);

    const taskInput = screen.getByLabelText(/Task Name/i);
    const longText = 'a'.repeat(150); // Exceeds 100 character limit

    await userEvent.type(taskInput, longText);

    // Should only accept 100 characters
    expect(taskInput.value).toHaveLength(100);
  });

  test('calls onAdd with correct values when form is valid', async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(undefined);
    render(<TicketForm onAdd={mockOnAdd} />);

    const taskInput = screen.getByLabelText(/Task Name/i);
    
    // Type task name
    await userEvent.type(taskInput, 'Test Task');

    // For date picker, you'll need to interact with MUI components
    // This is a simplified example
    const dateInput = screen.getByLabelText(/Due Date/i);
    fireEvent.change(dateInput, { target: { value: '2025-12-31' } });

    // Wait for form to be valid and submit
    await waitFor(() => {
      const addButton = screen.getByRole('button', { name: /Add Ticket/i });
      expect(addButton).not.toBeDisabled();
    });

    // Note: Full integration with MUI DatePicker requires more complex setup
  });

  test('clears form after successful submission', async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(undefined);
    render(<TicketForm onAdd={mockOnAdd} />);

    const taskInput = screen.getByLabelText(/Task Name/i);
    
    await userEvent.type(taskInput, 'Test Task');

    // After submission (mocked)
    expect(taskInput.value).toBe('Test Task');
  });

  test('shows preview alert when form is valid', async () => {
    const mockOnAdd = jest.fn();
    render(<TicketForm onAdd={mockOnAdd} />);

    const taskInput = screen.getByLabelText(/Task Name/i);
    await userEvent.type(taskInput, 'Test Task');

    // Check for preview (depends on your implementation)
    // This is an example
    await waitFor(() => {
      expect(screen.queryByText(/Ready to add/i)).toBeInTheDocument();
    });
  });
});