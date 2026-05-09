export default function ScreenContainer({
  children,
}) {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-24">
      {children}
    </div>
  );
}