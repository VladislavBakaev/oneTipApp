import bgTimer from "react-native-background-timer";

const data = {
  iter: 0,
  values: null,
  next: () => {data.iter++},
}

module.exports = async taskData => {
  data.next()
  console.log(taskData)
}