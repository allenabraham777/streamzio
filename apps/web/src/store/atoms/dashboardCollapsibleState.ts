import { atom } from 'recoil';

const dashboardCollapsibleState = atom({
    key: 'dashboardCollapsibleState',
    default: false
});

export default dashboardCollapsibleState;
