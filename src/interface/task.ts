export interface Task {
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "in-progress" | "done";
}
