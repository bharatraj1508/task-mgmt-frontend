"use client";

import { Task } from "@/interface/task";
import { fetchSingleTask, updateTask } from "@/services/taskServices";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "title must be at least 3 characters long!" }),

  description: z.string().min(1, { message: "description is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function EditTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [msg, setMsg] = useState<String>();

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchData = async () => {
      try {
        const response = await fetchSingleTask(id);
        setTask(response);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  const onSubmit = handleSubmit(async (formData) => {
    if (!id || Array.isArray(id)) return;

    try {
      const updatedTask = await updateTask(
        id,
        formData.title,
        formData.description
      );
      setMsg("Task updated successfully!");
      setTask(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setMsg("Error updating task. Please try again.");
    }
  });

  return (
    <div className="flex justify-center mt-6">
      <form className="flex flex-col gap-8 justify-center" onSubmit={onSubmit}>
        {msg && <p className="text-green-500">{msg}</p>}
        <h1 className="text-base lg:text-xl font-semibold">Edit your task</h1>
        <div className="flex flex-col gap-4 w-full">
          <span className="text-xs text-gray-400 font-medium">
            Task Information
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              {...register("title")}
              className="p-2 border border-gray-200 shadow-sm rounded-md text-sm w-full"
              defaultValue={task.title}
              placeholder="title"
            />
            {errors?.title && (
              <p className="text-xs text-red-400">{errors.title.toString()}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <input
              type="text"
              {...register("description")}
              className="p-2 border border-gray-200 shadow-sm rounded-md text-sm w-full"
              defaultValue={task.description}
              placeholder="description"
            />
            {errors?.title && (
              <p className="text-xs text-red-400">{errors.title.toString()}</p>
            )}
          </div>
        </div>

        <button className="bg-blue-400 text-white p-2 rounded-md">
          Update Task
        </button>
      </form>
    </div>
  );
}
