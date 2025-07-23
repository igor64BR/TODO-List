'use client';

import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./page.module.css";

type TodoItemProps = {
  title: string;
  completed: boolean;
}

type ItemProps = TodoItemProps & {
  index: number;
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function Home() {
  const [list, setList] = useState<TodoItemProps[]>([
    {
      completed: false,
      title: "teste"
    },
    {
      completed: true,
      title: "teste"
    }
  ]);
  const [newItem, setNewItem] = useState<string>("");

  const onItemChange = (index: number) => {
    setList(prev => prev.map((item, i) => i === index
      ? { ...item, completed: !item.completed }
      : item));
  }

  const onItemDelete = (index: number) => {
    setList(prev => [...prev.filter((_, i) => i !== index)]);
  }

  const onSave = () => {
    if (!newItem.length) {
      return;
    }
    setList(prev => [...prev, { completed: false, title: newItem }]);

    setNewItem('');
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  }

  return (
    <div className={styles.todoListContainer}>
      <div>
        <header>
          <h1>Todo List</h1>
        </header>
        <div className={styles.itemList}>
          {list.map((x, index) => (
            <Item
              key={index}
              {...x}
              index={index}
              onChange={onItemChange}
              onDelete={onItemDelete}
            />
          ))}
        </div>
        <form className={styles.todoListForm} onSubmit={onFormSubmit}>
          <input type="text" value={newItem} onChange={(event) => setNewItem(event.target.value)} />
          <button type="button" onClick={onSave} className={styles.addButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

const Item = ({ index, title, completed = false, onChange, onDelete }: ItemProps) => {
  return (
    <div className={styles.item}>
      <div>
        <input
          type="checkbox"
          id={"item-" + index}
          name={"item-" + index}
          onChange={() => onChange(index)}
          checked={completed}
        />
        <label htmlFor={"item-" + index}>
          <div className={styles.checkbox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <span>{title}</span>
        </label>
      </div>
      <button type="button" onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}