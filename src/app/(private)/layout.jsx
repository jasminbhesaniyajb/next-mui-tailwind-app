import Header from "@/components/header";
import { Container } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <div className="py-4 bg-[var(--color-surface)] h-[calc(100vh-70px)] overflow-y-auto">
      <Container
        // maxWidth="xl"
      >
        {children}
      </Container>
      </div>
    </>
  );
}
