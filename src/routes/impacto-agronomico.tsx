import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impacto-agronomico")({
  component: ImpactoAgronomico,
});

function ImpactoAgronomico() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-5xl font-bold text-center pt-20">
        Impacto Agronómico
      </h1>
    </div>
  );
}