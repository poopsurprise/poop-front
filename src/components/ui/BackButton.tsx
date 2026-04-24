import { ASSETS } from '../../constants/assets';

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      id="btn-back"
      onClick={onClick}
      className="mx-auto flex items-center justify-center w-12 h-12 mt-2 transition-transform active:scale-90"
    >
      <img src={ASSETS.backButton} alt="Back" className="w-10 h-10 object-contain" />
    </button>
  );
}
