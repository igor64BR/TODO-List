import uuid from 'react-native-uuid';

export interface IChecklistItem {
    id: string;
    name: string;
    checked: boolean;
}

export const createChecklistItem = (name: string, checked: boolean): IChecklistItem => ({
  id: uuid.v4(),
  name,
  checked,
});