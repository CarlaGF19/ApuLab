import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';
import { act } from '@testing-library/react';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
      });
    });
  });

  it('should initialize with no user', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should login user correctly', () => {
    const mockUser = {
      id: '1',
      email: 'teacher@test.com',
      name: 'Teacher Test',
      role: 'docente' as const,
      isDemo: false,
    };

    act(() => {
      useAuthStore.getState().login(mockUser);
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should logout user correctly', () => {
    // First login
    const mockUser = {
      id: '1',
      email: 'teacher@test.com',
      name: 'Teacher Test',
      role: 'docente' as const,
      isDemo: false,
    };

    act(() => {
      useAuthStore.getState().login(mockUser);
    });

    // Then logout
    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
