import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GitUsersDisplay from "./containers/gitUsersDisplay/container";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#afa",
    },
    text: {
      primary:'#fff',
      secondary: '#eee'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Container maxWidth="sm">
          <Box sx={{ height: "100vh", padding: "1rem" }}>
            <Box
              sx={{
                bgcolor: "rgba(50,50,50,.9)",
                borderRadius: "1rem",
                height: "100%",
                p: "1rem",
                border: "1px solid #444",
              }}
            >
              <GitUsersDisplay />
            </Box>
          </Box>
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
