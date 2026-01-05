import { ExternalLink, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

type FooterMapCardProps = {
  mapUrl?: string;
};

export default function FooterMapCard({ mapUrl }: FooterMapCardProps) {
  const { t } = useTranslation();

  if (!mapUrl) return null;

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        border border-[var(--footer-border,rgba(255,255,255,.14))]
        bg-[rgba(255,255,255,.03)]
      "
      aria-label={t("Map and directions")}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--footer-border,rgba(255,255,255,.10))]">
        <MapPin size={14} className="text-[var(--footer-accent)]" />
        <p className="text-xs font-semibold text-[var(--footer-heading)]">
          {t("Find us on the map")}
        </p>
      </div>

      {/* Map */}
      <div className="relative w-full h-[240px] bg-black">
        <iframe
          title={t("Clinic location on Google Maps")}
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />

        {/* Overlay action */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute bottom-3 right-3
            inline-flex items-center gap-2
            rounded-full px-3 py-1.5
            text-xs font-semibold
            bg-black/60 backdrop-blur
            text-white
            hover:bg-black/75
            transition
          "
        >
          {t("View on map")}
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
