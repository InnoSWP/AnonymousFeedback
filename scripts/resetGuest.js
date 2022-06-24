const resetButton = document.getElementById('reset-button');

import { confirm } from "./confirmForm";

export const resetEvent = () => {
    resetButton.addEventListener('click', (event) => {
        event.stopPropagation(); // to avoid exiting the form
        confirm();
    })
}