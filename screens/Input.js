import { Button, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EnterTodo from "./enterTodo";
import { addTodo } from "../store/reducer";

const Input = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const dispatch = useDispatch();

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  const handleAddTodo = (enteredGoalText) => {
    dispatch(addTodo(enteredGoalText));
    endAddGoalHandler();
  };

  return (
    <View>
      <Button
        title="Add New To-do"
        color="#a065ec"
        onPress={startAddGoalHandler}
      />
      <EnterTodo
        visible={modalIsVisible}
        onAddTodo={handleAddTodo}
        onCancel={endAddGoalHandler}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
