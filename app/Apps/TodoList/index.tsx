import {
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
  View,
  Text
} from "react-native";
import TodoItem from "./components/TodoItem";
import React, { useEffect, useState } from "react";
import Spacer from "./components/Spacer";
import useTodoListStorager from "./utils/todoListStorager";
import FloatingAddButton from "./components/FloatingAddButton";
import NewTodo from "./components/NewTodo";
import { createChecklistItem, IChecklistItem } from "./entities/ChecklistItem";
import { toast } from "./utils/toaster";

const TodoList = () => {
  const storager = useTodoListStorager();

  const [mockList, setMockList] = useState<IChecklistItem[]>([]);
  const [showNewItem, setShowNewItem] = useState(false);

  useEffect(() => {
    void onRender();
  }, []);

  const onRender = async () => {
    const todoList = await storager.getTodoList();

    setMockList(todoList);
  };

  const loadTodos = async () => {
    const todoList = await storager.getTodoList();

    setMockList(todoList);
  };

  const saveTodos = async () => {
    await storager.setTodoList(mockList);
  }

  const handleAddItem = async (name: string) => {
    if (!name.length) {
      toast("Please enter a name for the item.");
      return;
    }

    mockList.push(createChecklistItem(name, false));

    await storager.setTodoList(mockList);
    
    await loadTodos();
    setShowNewItem(false);
  };

  const handleDeleteItem = async (id: string) => {
    const removedItem = mockList.find(x => x.id === id);
    if (!removedItem) {
      toast("Item not found.");
      return;
    }

    const index = mockList.indexOf(removedItem);

    mockList.splice(index, 1);

    await storager.setTodoList(mockList);
    await loadTodos();
  }

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <SafeAreaView
        style={{
          marginTop: 25,
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <Text style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          marginLeft: 10,
          color: "#ebc934",
          // textShadowColor: 'black',
          // textShadowOffset: { width: -1, height: 1 },
          // textShadowRadius: 1,
        }}>TODOs</Text>
        <FlatList
          data={mockList}
          renderItem={({ item, index }) => (
            <View style={{ width: "100%", alignItems: "center" }}>
              <TodoItem
                id={item.id}
                key={index}
                item={item.name}
                onDelete={handleDeleteItem}
                onCheck={(checked) => {
                  item.checked = checked;
                  saveTodos();
                }}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <Spacer y={10} />}
          ListFooterComponent={() =>
            showNewItem && (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Spacer y={10} />
                <NewTodo
                  onSave={handleAddItem}
                  onCancel={() => setShowNewItem(false)}
                />
              </View>
            )
          }
        />
      </SafeAreaView>
      {!showNewItem && (
        <FloatingAddButton onPress={() => setShowNewItem(true)} />
      )}
    </>
  );
};

export default TodoList;
