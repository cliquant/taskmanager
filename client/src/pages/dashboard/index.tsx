import { useEffect, useState } from "react";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { taskSchema } from "./data/schema";
import Loading from "@/components/Loading";
import { Helmet } from "react-helmet";

type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('/tasks.json');
  const data = await response.json();
  return z.array(taskSchema).parse(data);
}

function DashboardIndex() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setLoading(false);
    }

    loadTasks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Task-Manager | Register</title>
      </Helmet>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}

export default DashboardIndex;
