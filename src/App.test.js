import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { calculateAmount } from './App';

// CRA's Jest can't resolve react-router v7's package exports.
jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }), { virtual: true });

test('scales nutrients from the base grams to the eaten grams', () => {
  expect(calculateAmount('700', '350', '500')).toBeCloseTo(1000);
  expect(calculateAmount('12,5', '100', '50')).toBeCloseTo(6.25);
  expect(calculateAmount('10', '0', '50')).toBe(0);
});

test('base grams default to 100 and results update', () => {
  render(<App />);
  expect(screen.getByLabelText(/Values are per/)).toHaveValue('100');

  userEvent.type(screen.getByLabelText(/eating/), '500');
  userEvent.clear(screen.getByLabelText(/Values are per/));
  userEvent.type(screen.getByLabelText(/Values are per/), '350');
  userEvent.type(screen.getByLabelText(/Energy per/), '700');

  expect(screen.getByTestId('energy-result')).toHaveTextContent(/1,?000\s*kcal/);
});
