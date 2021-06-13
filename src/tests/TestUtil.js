import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

export const renderApp = (container) => {
    act(() => {
        render(<App />, container);
    });
}

export const doRightClick = (clickContext) => {
    act(() => {
        clickContext.dispatchEvent(new MouseEvent("contextmenu", {bubbles: true}));
    });
}

export const createFolder = (folderName) => {
    const clickContext = screen.getByTestId('directory');
  
    doRightClick(clickContext);

    const createFolder = screen.getByTestId('context-CREATE');
    
    act(() => {
        createFolder.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    const input = screen.getByTestId('input');

    userEvent.type(input, folderName);

    const action = screen.getByTestId('action');
    expect(action).toBeEnabled();

    userEvent.click(action);
}


/* 
    All the code below this comment was taken from 
    https://github.com/testing-library/user-event/issues/440
    posted by ipap360

    Simulates a mouse drag event
*/
const fireMouseEvent = (
    type,
    elem,
    centerX,
    centerY
  ) => {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(
        type,
        true,
        true,
        window,
        1,
        1,
        1,
        centerX,
        centerY,
        false,
        false,
        false,
        false,
        0,
        elem
    );
    
    return elem.dispatchEvent(evt);
};

export const dragAndDrop = (elemDrag, elemDrop) => {
    act(() => {
        // calculate positions
        let pos = elemDrag.getBoundingClientRect();
        const center1X = Math.floor((pos.left + pos.right) / 2);
        const center1Y = Math.floor((pos.top + pos.bottom) / 2);

        pos = elemDrop.getBoundingClientRect();
        const center2X = Math.floor((pos.left + pos.right) / 2);
        const center2Y = Math.floor((pos.top + pos.bottom) / 2);

        // mouse over dragged element and mousedown
        fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
        fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
        fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
        fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

        // start dragging process over to drop target
        const dragStarted = fireMouseEvent(
            'dragstart',
            elemDrag,
            center1X,
            center1Y
        );

        fireMouseEvent('drag', elemDrag, center1X, center1Y);
        fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
        fireMouseEvent('drag', elemDrag, center2X, center2Y);
        fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

        // trigger dragging process on top of drop target
        fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
        fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
        fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
        fireMouseEvent('dragover', elemDrop, center2X, center2Y);

        // release dragged element on top of drop target
        fireMouseEvent('drop', elemDrop, center2X, center2Y);
        fireMouseEvent('dragend', elemDrag, center2X, center2Y);
        fireMouseEvent('mouseup', elemDrag, center2X, center2Y);
    });
};