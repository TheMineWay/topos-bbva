import { ThemeProvider } from "../../providers/theme/theme.provider";
import { UserProvider } from "../../providers/user/user.provider";
import "../../styles/index.css";
import "../../styles/reset.css";
import "@mantine/core/styles.css";
import "../../i18n/i18n";

type Props = {
	children: React.ReactNode;
};

export const TestEssentials: FC<Props> = ({ children }) => {
	return (
		<UserProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</UserProvider>
	);
};
