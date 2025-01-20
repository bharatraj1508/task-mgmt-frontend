"use client";

import SingleTask from "@/components/SingleTask";
import { Task } from "@/interface/task";
import Link from "next/link";
import { addTask, deleteTask, fetchTasks } from "@/services/taskServices";
import { useEffect, useState } from "react";
import { Plus, Check, X, Trash, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const schema = z.object({
  title: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
});

type Inputs = z.infer<typeof schema>;

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createTask, setCreateTask] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newTask = await addTask(data.title, data.description);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setCreateTask(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTask(id);
      console.log(response);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="flex space-x-4 h-screen">
        {/* To Do Column */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">To Do</h2>
          <div className="space-y-4">
            {groupedTasks.todo.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:scale-110 hover:shadow-xl transition-all duration-500 flex items-center justify-between"
              >
                <SingleTask task={task} />

                <div className="flex items-center justify-center gap-2 transition-all duration-300">
                  <Link href={`/task/edit/${task._id}`}>
                    <Pen size={20} />
                  </Link>
                  <button type="button" onClick={() => handleDelete(task._id)}>
                    <Trash size={20} className="text-red-500 cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
            {createTask && (
              <form
                onSubmit={onSubmit}
                className="bg-white p-4 rounded-lg shadow-sm hover:scale-110 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    id="title"
                    autoFocus
                    placeholder="title..."
                    {...register("title")}
                  />
                  {errors.title?.message && (
                    <p className="text-xs text-red-400">
                      {errors.title?.message.toString()}
                    </p>
                  )}
                  <Input
                    type="text"
                    id="description"
                    placeholder="description..."
                    {...register("description")}
                  />
                  {errors.description?.message && (
                    <p className="text-xs text-red-400">
                      {errors.description?.message.toString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="submit"
                    className="bg-transparent p-0 hover:bg-transparent text-green-500 hover:scale-125 transition-all duration-300"
                  >
                    <Check />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCreateTask(false)}
                    className="bg-transparent p-0 hover:bg-transparent text-red-500 hover:scale-125 transition-all duration-300"
                  >
                    <X />
                  </Button>
                </div>
              </form>
            )}
            <div className="flex items-center gap-1">
              <Button
                onClick={() => setCreateTask(true)}
                className="bg-transparent text-neutral-700 py-1 px-2 rounded-full hover:bg-white border border-gray-300"
              >
                <Plus size={20} /> Add task
              </Button>
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <div className="space-y-4">
            {groupedTasks.inProgress.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-500 flex items-center justify-between"
              >
                <SingleTask task={task} />
                <div className="flex items-center justify-center gap-2 transition-all duration-300">
                  <Link href={`/task/edit/${task._id}`}>
                    <Pen size={20} />
                  </Link>
                  <button type="button" onClick={() => handleDelete(task._id)}>
                    <Trash size={20} className="text-red-500 cursor-pointer" />
                  </button>
                </div>
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
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-500 flex items-center justify-between"
              >
                <SingleTask task={task} />
                <div className="flex items-center justify-center gap-2 transition-all duration-300">
                  <Link href={`/task/edit/${task._id}`}>
                    <Pen size={20} />
                  </Link>
                  <button type="button" onClick={() => handleDelete(task._id)}>
                    <Trash size={20} className="text-red-500 cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
