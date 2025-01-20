export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "in-progress" | "done";
}
