import Link from "next/link";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        role="button"
        className="border-2 border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 rounded-xl p-2  md:mt-0 hover:bg-slate-100 dark:hover:bg-slate-900 hover:ease-in duration-150"
      >
        <SunIcon className="w-6 h-6 text-yellow-500" />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setTheme("dark")}
        role="button"
        className="border-2  border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 rounded-xl p-2  md:mt-0 hover:bg-slate-100 dark:hover:bg-slate-900 hover:ease-in duration-150"
      >
        <MoonIcon className="w-6 h-6 text-gray-900 " />
      </div>
    );
  }
};

export default DarkModeButton;
