import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../features/ErrorBoundary';

jest.mock('../../widgets', () => ({
  FallbackUI: () => <div>Fallback UI</div>,
}));

describe('ErrorBoundary', () => {
  it('renders child components correctly when there is no error', () => {
    const TestComponent = () => <div>Child Component</div>;

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders FallbackUI when there is an error', () => {
    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Fallback UI')).toBeInTheDocument();
  });
});
