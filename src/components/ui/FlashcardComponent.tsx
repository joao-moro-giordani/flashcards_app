import { useState } from "react";

type Props = {
  front: string;
  back: string;
  loading?: boolean;
};

export const FlashcardComponent: React.FC<Props> = ({
  front,
  back,
  loading = false,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-xl h-48 perspective cursor-pointer relative">
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 rounded-xl overflow-hidden z-20">
          <div className="absolute inset-0 bg-gray-900" />

          <div className="absolute inset-0 shimmer-diagonal" />
        </div>
      )}

      <div
        onClick={() => !loading && setFlipped((prev) => !prev)}
        className={`
          relative w-full h-full
          transition-transform duration-500
          [transform-style:preserve-3d]
          ${flipped ? "rotate-y-180" : ""}
          ${loading ? "opacity-40 pointer-events-none" : ""}
        `}
      >
        {/* FRONT */}
        <div
          className="
            absolute w-full h-full
            bg-gray-900 border border-gray-700
            rounded-xl
            flex items-center justify-center
            px-6 text-center
            text-white text-lg font-medium
            [backface-visibility:hidden]
          "
        >
          {front}
        </div>

        {/* BACK */}
        <div
          className="
            absolute w-full h-full
            bg-gray-800 border border-gray-700
            rounded-xl
            flex items-center justify-center
            px-6 text-center
            text-white text-lg font-medium
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          {back}
        </div>
      </div>
    </div>
  );
};