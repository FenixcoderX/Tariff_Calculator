import { FaMoneyBillWave, FaCalendarAlt, FaRegMoneyBillAlt, FaRegCalendarAlt } from 'react-icons/fa';

/**
 * ButtonOption component represents a button with an icon and a name
 *
 * @param name - The name of the button
 * @param  value - The value of the button
 * @param selected - Indicates whether the button is selected
 * @param onClick - The function to be called when the button is clicked
 * @returns The rendered ButtonOption component
 */
const ButtonOption = ({ name, value, selected, onClick }) => {
  let icon = null;
  switch (value) {
    case 'standard':
      icon = <FaRegMoneyBillAlt />;
      break;
    case 'advanced':
      icon = <FaMoneyBillWave />;
      break;
    case 'month':
      icon = <FaRegCalendarAlt />;
      break;
    case 'year':
      icon = <FaCalendarAlt />;
      break;
    default:
      break;
  }
  return (
    <button className={`flex items-center justify-center gap-2.5 border-2   p-2.5 rounded-lg transition-all duration-300 w-40 bg-[#f4f8fc80] hover:bg-blue-50 ${selected ? 'border-blue-500 bg-blue-50 border-solid' : 'border-transparent'}`} onClick={() => onClick(value)}>
      {icon}
      {name}
    </button>
  );
};

export default ButtonOption;
