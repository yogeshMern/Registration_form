export const CROSS_ICON = () => {
  return (
    <button
      tabIndex="-1"
      className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
    >
      <svg
        className="w-4 h-4 mx-2 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
};

export const FORM_IMAGE =
  "https://images.pexels.com/photos/14401392/pexels-photo-14401392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
