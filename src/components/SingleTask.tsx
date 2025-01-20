import { Task } from "@/interface/task";
import Link from "next/link";

export default function SingleTask({ task }: { task: Task }) {
  return (
    <Link href={`/task/edit/${task._id}`} className="cursor-default">
      <h3 className="text-lg font-medium hover:underline cursor-pointer">
        {task.title}
      </h3>
      <p className="text-gray-500">{task.description}</p>
    </Link>
  );
}
