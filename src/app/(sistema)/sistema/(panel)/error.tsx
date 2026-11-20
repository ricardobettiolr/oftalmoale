"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-rose-200 bg-rose-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-rose-800">Algo salió mal</h2>
      <p className="mt-2 text-sm text-rose-700">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800">
        Reintentar
      </button>
    </div>
  );
}
