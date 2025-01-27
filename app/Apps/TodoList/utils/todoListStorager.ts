import { IChecklistItem } from "../entities/ChecklistItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'todoList';

const useTodoListStorager = () => ({
    getTodoList: async function (): Promise<IChecklistItem[]> {
        const todoList = await AsyncStorage.getItem(key);
        return todoList ? (JSON.parse(todoList) as IChecklistItem[]) : [];
    },
    setTodoList: async function (todoList: IChecklistItem[]) {
        await AsyncStorage.setItem(key, JSON.stringify(todoList));
    }
});

export default useTodoListStorager;