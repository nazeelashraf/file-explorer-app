import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { renderApp, doRightClick, createFolder, dragAndDrop } from './tests/TestUtil';

let container = null;

const elements = [
  'window-container', 
  'window',
  'navigation',
  'directory-header',
  'directory'
];

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
  
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders the app components', () => {
  renderApp(container);

  elements.forEach((element) => {
    const htmlElement = screen.getByTestId(element);
    expect(htmlElement).toBeInTheDocument();
  });
  
});

test('right click outside folder renders context with New folder option', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  
  doRightClick(clickContext);

  const context = screen.getByTestId('context');
  expect(context).toBeInTheDocument();

  const createFolder = screen.getByTestId('context-CREATE');
  expect(createFolder).toBeInTheDocument();

});

test('right click outside window does not show context menu', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('window-container');
  
  doRightClick(clickContext);

  const context = screen.queryByTestId('context');
  expect(context).toBeNull();

});

test('clicking "New folder" context opens new folder popup', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  
  doRightClick(clickContext);

  const createFolder = screen.getByTestId('context-CREATE');
  
  act(() => {
    createFolder.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  });

  const popup = screen.getByTestId('popup');
  const input = screen.getByTestId('input');
  const cancel = screen.getByTestId('cancel');
  const action = screen.getByTestId('action');

  expect(popup).toBeInTheDocument();
  expect(popup).toHaveTextContent(/Create folder/g);
  expect(input).toBeInTheDocument();
  expect(cancel).toBeInTheDocument();
  expect(action).toBeInTheDocument();
  expect(action).toBeDisabled();
});

test('inputs folder name and creates new folder', () => {
  renderApp(container);

  createFolder('Test');

  const folder = screen.getByTestId('folder-Test');
  expect(folder).toBeInTheDocument();
});

test('inputs folder name and hits enter to create new folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  userEvent.type(input, 'TestWithEnter');
  act(() => {
    input.dispatchEvent(new KeyboardEvent("keyup", {bubbles: true, key: 'Enter'}))
  });

  const folder = screen.getByTestId('folder-TestWithEnter');
  expect(folder).toBeInTheDocument();
});

test('opens popup and hits escape to close popup', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  const popup = screen.getByTestId('popup');
  expect(popup).toBeInTheDocument();
  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();

  act(() => {
    input.dispatchEvent(new KeyboardEvent("keyup", {bubbles: true, key: 'Escape'}))
  });
  
  expect(popup).not.toBeInTheDocument();
});

test('inputs existing folder name and cannot create new folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.type(input, 'Test');
  const action = screen.getByTestId('action');
  expect(action).toBeInTheDocument();
  expect(action).toBeEnabled();

  userEvent.click(action);

  const popupError = screen.getByTestId('popup-error');
  expect(popupError).toBeInTheDocument();

});

test('inputs "/" in folder name and cannot create new folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.type(input, 'Test/');
  const action = screen.getByTestId('action');
  const popupError = screen.getByTestId('popup-error');
  expect(popupError).toBeInTheDocument();
  expect(action).toBeInTheDocument();
  expect(action).toBeDisabled();

});

test('inputs "/" in folder name and removes error', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.type(input, 'Test/');
  const action = screen.getByTestId('action');
  const popupError = screen.getByTestId('popup-error');
  expect(action).toBeInTheDocument();
  expect(action).toBeDisabled();
  expect(popupError).toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, 'Test');
  expect(action).toBeEnabled();
  expect(popupError).not.toHaveTextContent();

});

test('right clicks when popup open does not show context', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  
  doRightClick(clickContext);

  const create = screen.getByTestId('context-CREATE');
  userEvent.click(create);

  doRightClick(clickContext);

  const context = screen.queryByTestId('context');
  expect(context).toBeNull();

});

test('closes popup on click of close', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  
  doRightClick(clickContext);

  const createFolder = screen.getByTestId('context-CREATE');
  
  act(() => {
    createFolder.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  });

  const cancel = screen.getByTestId('cancel');
  expect(cancel).toBeEnabled();

  const popup = screen.getByTestId('popup');
  userEvent.click(cancel);

  expect(popup).not.toBeInTheDocument();
  
});

test('right click on folder renders context with multiple options', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test');
  
  doRightClick(clickContext);

  const context = screen.getByTestId('context');
  expect(context).toBeInTheDocument();
  
  const contextItems = [
    'CREATE',
    'DELETE',
    'DUPLICATE',
    'CUT',
    'COPY',
  ];

  contextItems.forEach((item) => {
    const element = screen.getByTestId(`context-${item}`);
    expect(element).toBeInTheDocument();
  });
});

test('duplicates the folder on click of "Duplicate"', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test');
  
  doRightClick(clickContext);

  const context = screen.getByTestId('context');
  expect(context).toBeInTheDocument();
  
  const duplicate = screen.getByTestId('context-DUPLICATE');
  expect(duplicate).toBeInTheDocument();
  userEvent.click(duplicate);

  const folderCopy = screen.getByTestId('folder-Test (copy)');
  expect(folderCopy).toBeInTheDocument();
});

test('clicking "Rename..." context opens rename folder popup', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test');
  
  doRightClick(clickContext);

  const context = screen.getByTestId('context');
  expect(context).toBeInTheDocument();
  
  const rename = screen.getByTestId('context-RENAME');
  expect(rename).toBeInTheDocument();
  userEvent.click(rename);

  const popup = screen.getByTestId('popup');
  expect(popup).toBeInTheDocument();
  expect(popup).toHaveTextContent(/Rename folder/);

  const input = screen.getByTestId('input');
  expect(input).toHaveValue('Test');
});

test('inputs existing folder name and cannot rename', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test (copy)');
  doRightClick(clickContext);

  const rename = screen.getByTestId('context-RENAME');
  userEvent.click(rename);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.clear(input);
  userEvent.type(input, 'Test');
  const action = screen.getByTestId('action');
  expect(action).toBeInTheDocument();
  expect(action).toBeEnabled();

  userEvent.click(action);

  const popupError = screen.getByTestId('popup-error');
  expect(popupError).toBeInTheDocument();
});

test('inputs same folder name and exits', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test (copy)');
  doRightClick(clickContext);

  const rename = screen.getByTestId('context-RENAME');
  userEvent.click(rename);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.clear(input);
  userEvent.type(input, 'Test (copy)');
  const action = screen.getByTestId('action');
  expect(action).toBeInTheDocument();
  expect(action).toBeEnabled();

  userEvent.click(action);

  expect(clickContext).toBeInTheDocument();
  const popup = screen.queryByTestId('popup');
  expect(popup).toBeNull();
});

test('inputs new folder name and renames folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test (copy)');
  doRightClick(clickContext);

  const rename = screen.getByTestId('context-RENAME');
  userEvent.click(rename);

  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();
  
  userEvent.clear(input);
  userEvent.type(input, 'Test123');
  const action = screen.getByTestId('action');
  expect(action).toBeInTheDocument();
  expect(action).toBeEnabled();

  userEvent.click(action);

  const renamedFolder = screen.getByTestId('folder-Test123');
  expect(renamedFolder).toBeInTheDocument();
});

test('clicks "Copy" context and copies the folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test123');
  doRightClick(clickContext);

  const copy = screen.getByTestId('context-COPY');
  userEvent.click(copy);

  const dirClickContext = screen.getByTestId('directory');
  doRightClick(dirClickContext);

  const paste = screen.getByTestId('context-PASTE');
  expect(paste).toBeInTheDocument();

});

test('pastes the copied folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test123');
  doRightClick(clickContext);

  const copy = screen.getByTestId('context-COPY');
  userEvent.click(copy);

  const dirClickContext = screen.getByTestId('directory');
  doRightClick(dirClickContext);

  const paste = screen.getByTestId('context-PASTE');
  userEvent.click(paste);

  const pastedFolder = screen.getByTestId('folder-Test123 (copy)');
  expect(pastedFolder).toBeInTheDocument();

});

test('clicks "Cut" context and cuts the folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test123');
  doRightClick(clickContext);

  const copy = screen.getByTestId('context-CUT');
  userEvent.click(copy);

  const dirClickContext = screen.getByTestId('directory');
  doRightClick(dirClickContext);

  const paste = screen.getByTestId('context-PASTE');
  expect(paste).toBeInTheDocument();

  expect(clickContext).not.toBeInTheDocument();

});

test('pastes the cut folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test123 (copy)');
  doRightClick(clickContext);

  const copy = screen.getByTestId('context-CUT');
  userEvent.click(copy);

  const dirClickContext = screen.getByTestId('directory');
  doRightClick(dirClickContext);

  const paste = screen.getByTestId('context-PASTE');
  userEvent.click(paste);

  const pastedFolder = screen.getByTestId('folder-Test123 (copy)');
  expect(pastedFolder).toBeInTheDocument();

});

test('clicks "Delete" context and deletes the folder', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('folder-Test123 (copy)');
  doRightClick(clickContext);

  const deleteContext = screen.getByTestId('context-DELETE');
  userEvent.click(deleteContext);

  expect(clickContext).not.toBeInTheDocument();

});

test('clicks folder and opens it', () => {
  renderApp(container);

  const folder = screen.getByTestId('folder-Test');
  userEvent.click(folder);

  const breadcrumb = screen.getByTestId('breadcrumb-Test');
  expect(breadcrumb).toBeInTheDocument();

});

test('navigates to breadcrumb path on click of breadcrumb', () => {
  renderApp(container);

  const breadcrumb = screen.getByTestId('breadcrumb-Music');
  userEvent.click(breadcrumb);

  const folder = screen.getByTestId('folder-Test');
  expect(folder).toBeInTheDocument();

});

test('drags a folder and reorders on drop', () => {
  renderApp(container);

  const dragFolder = screen.getByTestId('folder-Test');
  const dropFolder = screen.getByTestId('folder-Linkin Park');
  
  dragAndDrop(dragFolder, dropFolder);

  expect(dragFolder).toBeInTheDocument();
  expect(dropFolder).toBeInTheDocument();
  
});

test('drags a folder and does nothing when dropped on itself', () => {
  renderApp(container);

  const dragFolder = screen.getByTestId('folder-Test');

  dragAndDrop(dragFolder, dragFolder);

  expect(dragFolder).toBeInTheDocument();
  
});

test('opens popup and cannot drag folders', () => {
  renderApp(container);

  const clickContext = screen.getByTestId('directory');
  
  doRightClick(clickContext);

  const createFolder = screen.getByTestId('context-CREATE');
  
  act(() => {
    createFolder.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  });

  const popup = screen.getByTestId('popup');
  expect(popup).toBeInTheDocument();

  const dragFolder = screen.getByTestId('folder-Test');
  const dropFolder = screen.getByTestId('folder-Linkin Park');

  dragAndDrop(dragFolder, dropFolder);

  expect(popup).toBeInTheDocument();
  expect(dragFolder).toBeInTheDocument();
  expect(dropFolder).toBeInTheDocument();
});

test('navigates to other directories', () => {
  renderApp(container);

  const nav = screen.getByTestId('nav-Movies');
  userEvent.click(nav);

  const breadcrumb = screen.getByTestId('breadcrumb-Movies');
  expect(breadcrumb).toBeInTheDocument();

});