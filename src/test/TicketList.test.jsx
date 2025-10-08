/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketList from '../components/TicketList';
import useTicketStore from '../store/useTicketStore';

// Mock the store
jest.mock('../store/useTicketStore');

describe('TicketList', () => {
  const mockDeleteTicket = jest.fn();
  const mockUpdateTicket = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useTicketStore.mockReturnValue({
      deleteTicket: mockDeleteTicket,
      updateTicket: mockUpdateTicket,
      showNotification: mockShowNotification,
    });
  });

  test('shows empty state when no tickets', () => {
    render(<TicketList tickets={[]} />);

    expect(screen.getByText(/No tickets yet/i)).toBeInTheDocument();
  });

  test('renders list of tickets correctly', () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
      { id: '2', task: 'Task 2', date: '2025-10-20', completed: true },
    ];

    render(<TicketList tickets={tickets} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('shows correct status badges', () => {
    const tickets = [
      { id: '1', task: 'Overdue Task', date: '2025-10-01', completed: false },
      { id: '2', task: 'Today Task', date: '2025-10-08', completed: false },
      { id: '3', task: 'Upcoming Task', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    expect(screen.getByText('Overdue')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  test('enables edit mode when edit button clicked', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    const editButton = screen.getAllByLabelText(/Edit ticket/i)[0];
    await userEvent.click(editButton);

    // Should show input fields
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-10-15')).toBeInTheDocument();
  });

  test('calls updateTicket when save button clicked', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    // Enter edit mode
    const editButton = screen.getAllByLabelText(/Edit ticket/i)[0];
    await userEvent.click(editButton);

    // Change task name
    const taskInput = screen.getByDisplayValue('Task 1');
    await userEvent.clear(taskInput);
    await userEvent.type(taskInput, 'Updated Task');

    // Save
    const saveButton = screen.getByLabelText(/Save changes/i);
    await userEvent.click(saveButton);

    expect(mockUpdateTicket).toHaveBeenCalledWith('1', 'Updated Task', '2025-10-15');
  });

  test('cancels edit mode without saving', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    // Enter edit mode
    const editButton = screen.getAllByLabelText(/Edit ticket/i)[0];
    await userEvent.click(editButton);

    // Change task name
    const taskInput = screen.getByDisplayValue('Task 1');
    await userEvent.clear(taskInput);
    await userEvent.type(taskInput, 'Changed Task');

    // Cancel
    const cancelButton = screen.getByLabelText(/Cancel/i);
    await userEvent.click(cancelButton);

    // Should not update
    expect(mockUpdateTicket).not.toHaveBeenCalled();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  test('shows delete confirmation dialog', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    const deleteButton = screen.getAllByLabelText(/Delete ticket/i)[0];
    await userEvent.click(deleteButton);

    // Should show confirmation dialog
    expect(screen.getByText(/Delete Ticket?/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  test('deletes ticket when confirmed', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    // Click delete
    const deleteButton = screen.getAllByLabelText(/Delete ticket/i)[0];
    await userEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /Delete/i });
    await userEvent.click(confirmButton);

    expect(mockDeleteTicket).toHaveBeenCalledWith('1');
  });

  test('cancels deletion when cancel clicked', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    // Click delete
    const deleteButton = screen.getAllByLabelText(/Delete ticket/i)[0];
    await userEvent.click(deleteButton);

    // Cancel deletion
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    await userEvent.click(cancelButton);

    expect(mockDeleteTicket).not.toHaveBeenCalled();
  });

  test('validates empty task name in edit mode', async () => {
    const tickets = [
      { id: '1', task: 'Task 1', date: '2025-10-15', completed: false },
    ];

    render(<TicketList tickets={tickets} />);

    // Enter edit mode
    const editButton = screen.getAllByLabelText(/Edit ticket/i)[0];
    await userEvent.click(editButton);

    // Clear task name
    const taskInput = screen.getByDisplayValue('Task 1');
    await userEvent.clear(taskInput);

    // Try to save
    const saveButton = screen.getByLabelText(/Save changes/i);
    await userEvent.click(saveButton);

    // Should not update and show error
    expect(mockUpdateTicket).not.toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Task name cannot be empty',
      'error'
    );
  });
});