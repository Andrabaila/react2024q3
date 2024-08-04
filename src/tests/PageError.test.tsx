import { render } from '@testing-library/react';
import PageError from '../app/error/page';

describe('PageError', () => {
  it('throws an intentional error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<PageError />)).toThrow('Intentional error for testing');

    consoleErrorSpy.mockRestore();
  });
});
