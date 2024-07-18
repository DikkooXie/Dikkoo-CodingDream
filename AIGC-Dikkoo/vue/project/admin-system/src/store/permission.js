import { defineStore } from "pinia";

export const usePermissionStore = defineStore('permission', {
    state: () => {
        const permissionList = {
            admin: [
                '0',
                '1',
                '11',
                '12',
                '13',
                '2',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '291',
                '292',
                '3',
                '31',
                '32',
                '33',
                '34',
                '4',
                '41',
                '42',
                '5',
                '7',
                '6',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
            ],
            user: ['0', '1', '11', '12', '13'],
        };

        const role = localStorage.getItem('role_name') || 'user';

        return {
            role,
            permissionList
        };
    },
    actions: {
        handleSet(val) {
            this.key = val;
        }
    }
});