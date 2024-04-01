import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../store/reducer";

const TodoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodo());
    }
  }, [dispatch, status]);

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={style.goalsContainer}>
      <FlatList
        data={todos}
        renderItem={(todoItem) => {
          return (
            <TodoItem
              text={todoItem.item.text}
              id={itemData.item.id}
              onDeleteItem={handleDeleteTodo}
            />
          );
        }}
      />
    </View>
  );
};

export default TodoListScreen;
const style = StyleSheet.create({
  goalsContainer: {
    flex: 5,
  },
});
