export default taskListReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      // ..do something
    case "UPDATE_TASK":
      // ..do something
    case "DELETE_TASK":
      const docRef = db.collection('tasklist').doc(user.uid);
      await docRef.update({ tasks: taskList.filter((task, i) => i !== index) });
      return await taskList.filter((task, i) => i !== index);
    case "UPDATE_TASK_LIST":
      // ..do something
    default:
      throw new Error("Unhandled action " + action.type);
  }
}