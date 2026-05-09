export default function Header({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="sticky top-0 z-40 bg-zinc-950/90 py-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-sm text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        {action && action}
      </div>
    </div>
  );
}