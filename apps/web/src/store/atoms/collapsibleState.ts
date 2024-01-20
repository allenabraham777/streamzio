import { atom } from 'recoil';

const collapsibleState = atom({
    key: 'collapsibleState',
    default: false
});

export default collapsibleState;
