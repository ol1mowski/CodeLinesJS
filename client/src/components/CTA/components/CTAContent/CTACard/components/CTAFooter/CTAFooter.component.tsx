interface CTAFooterProps {
  note?: string;
  features?: string[];
}

export const CTAFooter = ({ note, features }: CTAFooterProps) => {
  if (!note && !features) return null;

  return (
    <div className="space-y-4">
      {note && (
        <p className="text-sm opacity-70 pt-4 text-center">
          {note}
        </p>
      )}

      {features && (
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {features.map((feature, index) => (
            <span
              key={index}
              className="text-sm opacity-80 bg-black/20 px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}; 