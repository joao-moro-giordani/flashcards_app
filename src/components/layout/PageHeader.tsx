import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  titleNode?: React.ReactNode;
  description?: string;
  search?: React.ReactNode;
  actions?: React.ReactNode;
  backTo?: string;
};

const PageHeader: React.FC<Props> = ({
  title,
  titleNode,
  description,
  search,
  actions,
  backTo,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {backTo !== undefined && (
            <button
              onClick={() => {
                if (backTo) navigate(backTo);
                else navigate(-1);
              }}
              className="text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          {titleNode ? (
            titleNode
          ) : (
            <div>
              {title && (
                <h1 className="text-lg font-semibold text-white">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-gray-400 text-xs mt-0.5">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {search}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;