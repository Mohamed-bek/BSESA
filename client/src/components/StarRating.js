import { RiStarHalfSFill, RiStarLine, RiStarSFill } from "react-icons/ri";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center mb-4 text-[1.5rem]">
      {Array.from({ length: fullStars }, (_, i) => (
        <RiStarSFill key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <RiStarHalfSFill className="text-yellow-500" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <RiStarLine
          key={`empty-${i}`}
          className="text-gray-300 text-[1.3rem]"
        />
      ))}
      <span className="pl-2 text-[1.3rem]">{rating}</span>
    </div>
  );
};

export default StarRating;
