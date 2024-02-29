import { useContext } from "react";
import { ThemeContext } from "../../context/theme/themeContext";

const availableThemes = ['main', 'second', 'third']; // Liste des thèmes disponibles

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
        console.log(nextTheme);
    }

    return (
        <div onClick={handleTheme} className="border-1 border-primary p-2 w-fit">themeBtn</div>
    );
}

export default ThemeBtn;
