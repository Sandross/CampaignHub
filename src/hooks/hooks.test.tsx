import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { useDebounce } from '.';

const TestComponent: React.FC<{ value: string; delay: number }> = ({ value, delay }) => {
  const debouncedValue = useDebounce(value, delay);

  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

describe('useDebounce Hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('deve retornar o valor inicial corretamente', () => {
    render(<TestComponent value="Inicial" delay={500} />);

    const debouncedValue = screen.getByTestId('debounced-value');
    expect(debouncedValue.textContent).toBe('Inicial');
  });

  it('deve atualizar o valor debounced após o delay', () => {
    const { rerender } = render(<TestComponent value="Inicial" delay={500} />);

    const debouncedValue = screen.getByTestId('debounced-value');
    expect(debouncedValue.textContent).toBe('Inicial');

    rerender(<TestComponent value="Atualizado" delay={500} />);

    expect(debouncedValue.textContent).toBe('Inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(debouncedValue.textContent).toBe('Atualizado');
  });

  it('deve limpar o timeout ao desmontar o componente', () => {
    const { unmount, rerender } = render(<TestComponent value="Inicial" delay={500} />);

    rerender(<TestComponent value="Atualizado" delay={500} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

  });

  it('deve atualizar o valor debounced corretamente com múltiplas mudanças rápidas', () => {
    const { rerender } = render(<TestComponent value="Inicial" delay={500} />);

    const debouncedValue = screen.getByTestId('debounced-value');
    expect(debouncedValue.textContent).toBe('Inicial');

    rerender(<TestComponent value="Primeira Mudança" delay={500} />);
    rerender(<TestComponent value="Segunda Mudança" delay={500} />);
    rerender(<TestComponent value="Terceira Mudança" delay={500} />);

    expect(debouncedValue.textContent).toBe('Inicial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(debouncedValue.textContent).toBe('Terceira Mudança');
  });
});
