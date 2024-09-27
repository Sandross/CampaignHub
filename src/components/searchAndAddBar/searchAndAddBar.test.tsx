import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchAndAddBar from '.';
describe('SearchAndAddBar', () => {
  const mockOnAddClick = jest.fn();

  const TestComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    return (
      <SearchAndAddBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={mockOnAddClick}
      />
    );
  };

  const renderComponent = () => render(<TestComponent />);

  it('should render search input and add button', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(searchInput).toBeTruthy();

    const addButton = screen.getByText('Nova');
    expect(addButton).toBeTruthy();
  });

  it('should update the input value when typing', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Teste' } });

    expect(searchInput.value).toBe('Teste');
  });

  it('should call onAddClick when "Nova" button is clicked', () => {
    renderComponent();

    const addButton = screen.getByText('Nova');
    fireEvent.click(addButton);

    expect(mockOnAddClick).toHaveBeenCalledTimes(1);
  });
});
