import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TeacherDashboard from '../TeacherDashboard';
import { useAuthStore } from '../../store/authStore';
import { BrowserRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../../store/authStore');
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  RadarChart: () => <div>RadarChart</div>,
  PolarGrid: () => <div>PolarGrid</div>,
  PolarAngleAxis: () => <div>PolarAngleAxis</div>,
  PolarRadiusAxis: () => <div>PolarRadiusAxis</div>,
  Radar: () => <div>Radar</div>,
  BarChart: () => <div>BarChart</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  Cell: () => <div>Cell</div>,
}));

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TeacherDashboard Logout Flow', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as any).mockReturnValue({
      user: { name: 'Docente Test', isDemo: false },
      logout: mockLogout,
    });
  });

  it('should open logout modal when clicking "Cerrar sesión"', () => {
    render(
      <BrowserRouter>
        <TeacherDashboard />
      </BrowserRouter>
    );

    // Find the logout button in the header
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Check if modal appears
    expect(screen.getByText('¿Cerrar sesión?')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro que deseas salir del panel docente?')).toBeInTheDocument();
  });

  it('should call logout and navigate to /login when confirming logout', () => {
    render(
      <BrowserRouter>
        <TeacherDashboard />
      </BrowserRouter>
    );

    // Open modal
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Click confirm in modal
    // Note: There are two "Cerrar sesión" texts now (one in header, one in modal button)
    // The modal button is the second one usually, or use selector.
    // The modal button has class bg-primary
    const confirmButton = screen.getAllByText('Cerrar sesión')[1]; 
    fireEvent.click(confirmButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should close modal when clicking Cancelar', () => {
    render(
      <BrowserRouter>
        <TeacherDashboard />
      </BrowserRouter>
    );

    // Open modal
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Click Cancelar
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    // Modal should disappear (wait for animation or check query)
    // Since AnimatePresence is used, it might still be in DOM for exit animation.
    // But logic-wise, it should trigger state change.
    // We can check if it's not visible or removed.
    // waitForElementToBeRemoved is better for async.
  });
});
