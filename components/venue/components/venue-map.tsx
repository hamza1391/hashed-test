"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Maximize2, MapPin } from "lucide-react";
import Image from "next/image";
import type { VenueListing } from "@/lib/data/useVenueListingData";
import { useVenueListingStore } from "@/store/venue-store";
import "leaflet/dist/leaflet.css";

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
  const selected = venues.find((venue) => venue.id === selectedVenueId) ?? venues[0];

  useEffect(() => {
    if (!selected) return;
    map.flyTo([selected.lat, selected.lng], 13, { duration: 0.6 });
  }, [map, selected]);

  return null;
}

export default function VenueMap({ venues }: { venues: VenueListing[] }) {
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const setSelectedVenueId = useVenueListingStore(
    (state) => state.setSelectedVenueId
  );
  const pin = useMemo(() => createPin(), []);
  const selected =
    venues.find((venue) => venue.id === selectedVenueId) ?? venues[0];
  const center: [number, number] = selected
    ? [selected.lat, selected.lng]
    : [51.5074, -0.1278];

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
        <FlyToSelected venues={venues} />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.lat, venue.lng]}
            icon={pin}
            eventHandlers={{
              click: () => setSelectedVenueId(venue.id),
            }}
          />
        ))}
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
