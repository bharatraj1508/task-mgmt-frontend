import { Task } from "@/interface/task";

export default function SingleTask({ task }: { task: Task }) {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-gray-500">{task.description}</p>
      </div>
    </div>
  );
}
