import { Link } from '@tanstack/react-router';

export function Brand() {
  return (
    <Link to="/">
      <div className="flex flex-1 gap-4 self-stretch text-2xl font-semibold">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ab71061bd1af4a92a3218264a910c81807d71ad5274bd997572bccd7e886636?apiKey=05796128f6dd44148e772baecec9d384&"
          alt="SuiPass logo"
          className="shrink-0 w-10 aspect-square"
        />
        <div className="flex-1 my-auto">
          <span className="text-white">Sui</span>
          <span className="text-amber-400">Pass</span>
        </div>
      </div>
    </Link>
  );
}
