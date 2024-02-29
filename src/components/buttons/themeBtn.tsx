import { useContext } from "react";
import { ThemeContext } from "../../context/theme/themeContext";

function ThemeBtn() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        return null;
    }

    const { theme, setTheme } = themeContext;

    const handleTheme = () => {
        if (theme === 'main') {
            setTheme('second');
        } else {
            setTheme('main');
        }
        console.log(theme);
    }

    return (
        <div onClick={handleTheme}>themeBtn</div>
    );
}

export default ThemeBtn;
