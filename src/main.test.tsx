import * as ReactDOMClient from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('main.tsx', () => {
  it('renders without crashing', async () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Используем динамический импорт для main.tsx
    await import('./main');

    // Получаем mock-функции из jest.mock
    const { createRoot } = ReactDOMClient;
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    const renderMock = createRoot(rootElement).render;
    expect(renderMock).toHaveBeenCalled();
  });
});
