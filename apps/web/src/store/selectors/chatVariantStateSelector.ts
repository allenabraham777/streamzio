import { selector } from 'recoil';

import chatCollapsibleState from '../atoms/chatCollapsibleState';

const chatVariantStateSelector = selector({
    key: 'chatVariantStateSelector',
    get: ({ get }) => {
        const status = get(chatCollapsibleState);

        return status.variant;
    }
});

export default chatVariantStateSelector;
