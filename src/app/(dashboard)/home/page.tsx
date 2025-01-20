"use client";

import SingleTask from "@/components/SingleTask";
import { Task } from "@/interface/task";
import Link from "next/link";
import { fetchTasks } from "@/services/taskServices";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTasks();
      setTasks(response);
    };
    fetchData();
  }, []);

  const groupedTasks = {
    todo: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "done"),
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Task Board</h1>
      <div className="flex space-x-4">
        {/* To Do Column */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">To Do</h2>
          <div className="space-y-4">
            {groupedTasks.todo.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/task/edit/${task._id}`}>
                  <SingleTask task={task} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <div className="space-y-4">
            {groupedTasks.inProgress.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/task/edit/${task._id}`}>
                  <SingleTask task={task} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <div className="space-y-4">
            {groupedTasks.completed.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/task/edit/${task._id}`}>
                  <SingleTask task={task} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
