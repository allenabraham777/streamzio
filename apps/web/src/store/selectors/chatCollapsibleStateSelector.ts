import { selector } from 'recoil';

import chatCollapsibleState from '../atoms/chatCollapsibleState';

const chatCollapsibleStateSelector = selector({
    key: 'chatCollapsibleStateSelector',
    get: ({ get }) => {
        const status = get(chatCollapsibleState);

        return status.collapsed;
    }
});

export default chatCollapsibleStateSelector;
