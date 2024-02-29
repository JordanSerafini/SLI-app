import { useContext } from "react";
import { ThemeContext } from "../../context/theme/themeContext";

import themeLogo from "../../assets/themeLogo.png";

const availableThemes = ['main', 'second', 'third']; 

function ThemeBtn() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        return null;
    }

    const { theme, setTheme } = themeContext;

    const handleTheme = () => {
        const currentIndex = availableThemes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        const nextTheme = availableThemes[nextIndex];
        setTheme(nextTheme);
    }

    return (
        <div onClick={handleTheme} className="">
            <img src={themeLogo} alt="" className="h-8 rounded-full z-50 fixed bottom-20 right-5" />
        </div>
    );
}

export default ThemeBtn;
