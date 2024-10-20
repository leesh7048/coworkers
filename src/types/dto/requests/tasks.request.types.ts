export type GetTaskRequest = {
  groupId: number;
  taskListId: number;
  date?: string; // 날짜는 선택적이며, ISO 8601 형식의 문자열
};
