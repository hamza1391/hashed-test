"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Maximize2, MapPin } from "lucide-react";
import Image from "next/image";
import type { VenueListing } from "@/lib/venues/types";
import { useVenueListingStore } from "@/store/venue-store";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER: [number, number] = [51.5074, -0.1278];

function toLatLng(lat: unknown, lng: unknown): [number, number] | null {
  const nextLat = Number(lat);
  const nextLng = Number(lng);
  if (!Number.isFinite(nextLat) || !Number.isFinite(nextLng)) return null;
  return [nextLat, nextLng];
}

function createPin() {
  return L.divIcon({
    className: "venuze-map-pin",
    html: `<div style="width:28px;height:36px;display:flex;align-items:flex-end;justify-content:center">
      <div style="width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#ff5037;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,.2)">
        <span style="transform:rotate(45deg);color:white;font:700 13px/1 Poppins,sans-serif">V</span>
      </div>
    </div>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
  });
}

function FlyToSelected({ venues }: { venues: VenueListing[] }) {
  const map = useMap();
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const selected =
    venues.find((venue) => venue.id === selectedVenueId) ?? venues[0];
  const lat = selected?.lat;
  const lng = selected?.lng;

  useEffect(() => {
    const position = toLatLng(lat, lng);
    if (!position) return;
    map.flyTo(position, 13, { duration: 0.6 });
  }, [lat, lng, map]);

  return null;
}

function useIsDesktopMap() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return enabled;
}

export default function VenueMap({ venues }: { venues: VenueListing[] }) {
  const showMap = useIsDesktopMap();
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const setSelectedVenueId = useVenueListingStore(
    (state) => state.setSelectedVenueId
  );
  const pin = useMemo(() => createPin(), []);
  const mappableVenues = useMemo(
    () => venues.filter((venue) => toLatLng(venue.lat, venue.lng)),
    [venues]
  );
  const selected =
    mappableVenues.find((venue) => venue.id === selectedVenueId) ??
    mappableVenues[0];
  const center = selected
    ? toLatLng(selected.lat, selected.lng) ?? DEFAULT_CENTER
    : DEFAULT_CENTER;

  if (!showMap || mappableVenues.length === 0) {
    return <div className="h-full min-h-[420px] bg-[#e8e4dc]" />;
  }

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-[#e8e4dc]">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FlyToSelected venues={mappableVenues} />
        {mappableVenues.map((venue) => {
          const position = toLatLng(venue.lat, venue.lng);
          if (!position) return null;
          return (
            <Marker
              key={venue.id}
              position={position}
              icon={pin}
              eventHandlers={{
                click: () => setSelectedVenueId(venue.id),
              }}
            />
          );
        })}
      </MapContainer>

      {selected ? (
        <div className="absolute left-1/2 top-8 z-[2] w-[210px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="relative h-[118px] w-full">
            <Image
              src={selected.images[0]}
              alt={selected.title}
              fill
              sizes="210px"
              className="object-cover"
            />
          </div>
          <div className="px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-black">
              {selected.title}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-brand">
              <MapPin className="size-3 shrink-0" />
              {selected.location}
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Expand map"
        className="absolute right-3 top-3 z-[2] flex size-8 cursor-pointer items-center justify-center rounded-md border border-[#E6E6E6] bg-white text-black shadow-sm"
      >
        <Maximize2 className="size-4" />
      </button>
    </div>
  );
}
