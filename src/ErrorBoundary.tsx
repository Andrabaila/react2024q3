import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  errorLogged: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorLogged: false };
  }

  componentDidCatch(error: Error) {
    const { errorLogged } = this.state;
    if (!errorLogged) {
      console.error(error);
      this.setState({ hasError: true, errorLogged: true });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error">
          <h1>ERROR!!!</h1>
          <button
            type="button"
            className="button-reload"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return children;
  }
}
