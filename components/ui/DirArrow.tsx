/** A "continue" arrow that flips direction under the Arabic RTL layout. */
export function DirArrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}
