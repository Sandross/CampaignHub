import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './';

const ErrorThrowingComponent: React.FC = () => {
    throw new Error('Test error');
  };

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Componente Filho</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeTruthy();
    expect(screen.getByText('Componente Filho')).toBeTruthy();
  });

  it('should catch errors and display fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Sorry.. there was an error')).toBeTruthy();
  });

  it('should log errors to the console', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });
});
