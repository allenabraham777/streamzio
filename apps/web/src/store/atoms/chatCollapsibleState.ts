import { atom } from 'recoil';

import { ChatVariants } from '@/enums/chatVariants';

const chatCollapsibleState = atom({
    key: 'chatCollapsibleState',
    default: {
        collapsed: false,
        variant: ChatVariants.CHAT
    }
});

export default chatCollapsibleState;
