const useChipController = (color?: string, outlined?: boolean) => {
  switch (color) {
    case "info": {
      return {
        accent: "bg-sky-200",
        className: !outlined
          ? "bg-sky-400 hover:bg-sky-400 text-sky-100"
          : "bg-transparent hover:opacity-80 border-2 border-sky-400 text-sky-400",
      };
    }
    case "success": {
      return {
        accent: "bg-green-200",
        className: !outlined
          ? "bg-green-400 hover:bg-green-400 text-green-100"
          : "bg-transparent hover:opacity-80 border-2 border-green-400 text-green-400",
      };
    }
    case "warning": {
      return {
        accent: "bg-yellow-200",
        className: !outlined
          ? "bg-yellow-400 hover:bg-yellow-400 text-yellow-100"
          : "bg-transparent hover:opacity-80 border-2 border-yellow-400 text-yellow-400",
      };
    }
    case "danger": {
      return {
        accent: "bg-red-200",
        className: !outlined
          ? "bg-red-400 hover:bg-red-400 text-red-100"
          : "bg-transparent hover:opacity-80 border-2 border-red-400 text-red-400",
      };
    }
    default: {
      return {
        accent: "bg-purple-200",
        className: !outlined
          ? !color
            ? "text-purple-100 hover:bg-purple-400 bg-purple-400"
            : `${color}`
          : "bg-transparent hover:opacity-80 border-2 border-purple-400 text-purple-400",
      };
    }
  }
};

export default useChipController;
