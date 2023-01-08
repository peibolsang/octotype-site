import Link from "next/link"
import {useTheme} from "next-themes";
import{SunIcon ,MoonIcon} from "@heroicons/react/solid";
import {useState, useEffect} from "react";

const DarkModeButton = () => {

  const [mounted, setMounted] = useState(false);
  useEffect(() =>{setMounted(true);},[])

  const {systemTheme , theme, setTheme} = useTheme ();

    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme ;

    if(currentTheme ==="dark"){
        return (
            <div className="border-2 dark:border-slate-500 border-slate-800 rounded-xl p-2 mt-5 md:mt-0">
              <SunIcon className="w-6 h-6 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
             </div>
        )
    }
    else {
        return (
            <div className="border-2 dark:border-gray-200 border-slate-500 rounded-xl p-2 mt-5 md:mt-0">
              <MoonIcon className="w-6 h-6 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
            </div>
        )
    }
}

export default DarkModeButton

