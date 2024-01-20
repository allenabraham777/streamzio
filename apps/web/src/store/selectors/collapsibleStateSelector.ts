import { selector } from 'recoil';

import collapsibleState from '../atoms/collapsibleState';

const collapsibleStateSelector = selector({
    key: 'collapsibleStateSelector',
    get: ({ get }) => {
        const status = get(collapsibleState);

        return status;
    }
});

export default collapsibleStateSelector;
