import { render, screen } from '@testing-library/react';
import Loading from '../loading';

test('renders CircularProgress component', () => {
  render(<Loading />); 
  const progressElement = screen.getByRole('progressbar');
  expect(progressElement).toBeTruthy;
});
