import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CampaignActions from './index';

describe('CampaignActions component', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  const defaultProps = {
    isEditing: false,
    onSave,
    onCancel,
    onEdit,
    onDelete,
    disableSave: false,
  };

  it('renders Edit and Delete icons when not editing', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByTestId('EditIcon')).toBeTruthy();
    expect(screen.getByTestId('DeleteIcon')).toBeTruthy();
  });

  it('renders Save and Cancel icons when editing', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} isEditing={true} />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByTestId('save-button')).toBeTruthy();
    expect(screen.getByTestId('CloseIcon')).toBeTruthy();
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} />
          </tr>
        </tbody>
      </table>
    );

    const editButton = screen.getByTestId('EditIcon').closest('button');
    fireEvent.click(editButton!);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} />
          </tr>
        </tbody>
      </table>
    );

    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');
    fireEvent.click(deleteButton!);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when Save button is clicked', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} isEditing={true} />
          </tr>
        </tbody>
      </table>
    );

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CampaignActions {...defaultProps} isEditing={true} />
          </tr>
        </tbody>
      </table>
    );

    const cancelButton = screen.getByTestId('CloseIcon').closest('button');
    fireEvent.click(cancelButton!);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
