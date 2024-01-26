import { selector } from 'recoil';

import dashboardCollapsibleState from '../atoms/dashboardCollapsibleState';

const dashboardCollapsibleStateSelector = selector({
    key: 'dashboardCollapsibleStateSelector',
    get: ({ get }) => {
        const status = get(dashboardCollapsibleState);

        return status;
    }
});

export default dashboardCollapsibleStateSelector;
