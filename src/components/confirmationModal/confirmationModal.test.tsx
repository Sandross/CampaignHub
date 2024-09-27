import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '.'; 
import { ConfirmationModalProps } from '@/types/index';

describe('ConfirmationModal', () => {
  const defaultProps: ConfirmationModalProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Confirmar exclusão',
    message: 'Tem certeza que deseja excluir este item?',
  };

  const renderComponent = (props = defaultProps) =>
    render(<ConfirmationModal {...props} />);

  it('should render modal with title and message', () => {
    renderComponent();

    const titleElement = screen.getByText('Confirmar exclusão');
    const messageElement = screen.getByText('Tem certeza que deseja excluir este item?');

    expect(titleElement).not.toBeNull();
    expect(messageElement).not.toBeNull();
  });

  it('should call onClose when "Cancelar" button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when "Excluir" button is clicked', () => {
    renderComponent();

    const confirmButton = screen.getByText('Excluir');
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should not render when modal is closed', () => {
    const closedProps = { ...defaultProps, open: false };
    renderComponent(closedProps);

    const titleElement = screen.queryByText('Confirmar exclusão');
    const messageElement = screen.queryByText('Tem certeza que deseja excluir este item?');

    expect(titleElement).toBeNull();
    expect(messageElement).toBeNull();
  });
});
